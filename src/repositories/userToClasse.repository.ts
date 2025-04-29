import { prisma } from '../config/prisma';
import { IUserToClasseEntity } from '../entities/userToClasse.entity';

export const userToClasseRepository = {
	create: (data: IUserToClasseEntity) => prisma.userToClasse.create({ data }),
	findAll: () => prisma.userToClasse.findMany(),
	findByUserId: (user_id: string) =>
		prisma.userToClasse.findMany({ where: { user_id } }),
	findByClasseId: (classe_id: string) =>
		prisma.userToClasse.findMany({ where: { classe_id } }),
	delete: (user_id: string, classe_id: string) =>
		prisma.userToClasse.delete({
			where: { user_id_classe_id: { user_id, classe_id } },
		}),
};
