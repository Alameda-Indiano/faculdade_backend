import { prisma } from '../config/prisma';
import { IUserEntity } from '../entities/user.entity';

export const userRepository = {
	create: (data: Omit<IUserEntity, 'classes' | 'body_measurements'>) => prisma.user.create({ data }),
	findAll: () => prisma.user.findMany(),
	findById: (id: string) => prisma.user.findUnique({ where: { id } }),
	findByEmail: (email: string) =>
		prisma.user.findUnique({ where: { email } }),
	update: (id: string, data: Partial<IUserEntity>) =>
		prisma.user.update({
			where: { id }, data: {
				...data,
				classes: {
					connect: data.classes?.map((classe) => ({
						user_id_classe_id: {
							classe_id: classe.id!,
							user_id: id
						}
					}))
				},
				body_measurements: {
					connect: data.body_measurements?.map((measurement) => ({ id: measurement.id }))
				}
			}
		}),
	delete: (id: string) => prisma.user.delete({ where: { id } }),
};
