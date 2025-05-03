import { prisma } from '../config/prisma';
import { IBodyMeasurementEntity } from '../entities/bodyMeasurement.entity';

export const bodyMeasurementRepository = {
	create: (data: IBodyMeasurementEntity) => prisma.bodyMeasurement.create({ data }),
	findAll: () => prisma.bodyMeasurement.findMany({
		include: {
			user: true
		}
	}),
	findById: (id: string) => prisma.bodyMeasurement.findUnique({ where: { id } }),
	findByUserId: (user_id: string) => prisma.bodyMeasurement.findMany({ where: { user_id } }),
	update: (id: string, data: Partial<IBodyMeasurementEntity>) => prisma.bodyMeasurement.update({ where: { id }, data }),
	delete: (id: string) => prisma.bodyMeasurement.delete({ where: { id } }),
};
