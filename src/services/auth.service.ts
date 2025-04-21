import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserPublic } from '../entities/user.entity';
import { userRepository } from '../repositories/user.repository';

export const authService = {
	async authenticate(email: string, password: string): Promise<{ user: IUserPublic; token: string }> {
		const user = await userRepository.findByEmail(email);
		if (!user) throw new Error('Usuário não encontrado.');

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) throw new Error('Senha inválida.');

		const { password: _, ...userWithoutPassword } = user;

		//@ts-ignore
		const token = jwt.sign({ user: userWithoutPassword }, process.env.JWT_SECRET as string, {
			expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
		});

		return { user: userWithoutPassword, token };
	}
};
