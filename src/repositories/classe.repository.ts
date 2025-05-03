import { prisma } from '../config/prisma';
import { IClasseEntity } from '../entities/classe.entity';

export const classeRepository = {
	create: (data: IClasseEntity) => prisma.classe.create({ data }),
	findAll: () => prisma.classe.findMany(),
	findById: (id: string) => prisma.classe.findUnique({ where: { id } }),
	update: (id: string, data: Partial<IClasseEntity>) =>
		prisma.classe.update({ where: { id }, data }),
	delete: (id: string) => prisma.classe.delete({ where: { id } }),
	count: () => prisma.classe.count()
};
