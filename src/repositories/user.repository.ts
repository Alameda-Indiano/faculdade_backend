import { prisma } from '../config/prisma';
import { IUserEntity } from '../entities/user.entity';

export const userRepository = {
	create: (data: IUserEntity) => prisma.user.create({ data }),
	findAll: () => prisma.user.findMany(),
	findById: (id: string) => prisma.user.findUnique({ where: { id } }),
	findByEmail: (email: string) =>
		prisma.user.findUnique({ where: { email } }),
	update: (id: string, data: Partial<IUserEntity>) =>
		prisma.user.update({ where: { id }, data }),
	delete: (id: string) => prisma.user.delete({ where: { id } }),
};
