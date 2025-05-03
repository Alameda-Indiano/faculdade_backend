import bcrypt from 'bcrypt';
import { IUserEntity, IUserPublic } from '../entities/user.entity';
import { userRepository } from '../repositories/user.repository';

const SALT_ROUNDS = 10;

export const userService = {
	createUser: async (data: IUserEntity): Promise<IUserPublic> => {
		const existing = await userRepository.findByEmail(data.email!);
		if (existing) {
			throw new Error('Email já cadastrado.');
		}

		const hashedPassword = await bcrypt.hash(data.password!, SALT_ROUNDS);

		const newUser = await userRepository.create({
			...data,
			password: hashedPassword,
		});

		const { password, ...userWithoutPassword } = newUser;
		//@ts-ignore
		return userWithoutPassword;
	},

	getUsers: async (): Promise<IUserPublic[]> => {
		const users = await userRepository.findAll();
		//@ts-ignore
		return users.map(({ password, ...rest }) => rest);
	},

	getUserById: async (id: string): Promise<IUserPublic | null> => {
		const user = await userRepository.findById(id);
		if (!user) return null;

		const { password, ...userWithoutPassword } = user;
		//@ts-ignore
		return userWithoutPassword;
	},

	updateUser: async (
		id: string,
		data: Partial<IUserEntity>
	): Promise<IUserPublic> => {
		const existing = await userRepository.findById(id);
		if (!existing) throw new Error('Usuário não encontrado.');

		if (data.email && data.email !== existing.email) {
			const emailTaken = await userRepository.findByEmail(data.email);
			if (emailTaken) {
				throw new Error('Email já cadastrado por outro usuário.');
			}
		}

		let password = data.password;
		if (password) {
			password = await bcrypt.hash(password, SALT_ROUNDS);
		}

		const updated = await userRepository.update(id, {
			...data,
			password,
		});

		const { password: _, ...userWithoutPassword } = updated;
		return userWithoutPassword;
	},

	deleteUser: userRepository.delete,
	count: userRepository.count
};
