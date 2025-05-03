import { prisma } from '../config/prisma';
import { IFrequencyEntity } from '../entities/frequency.entity';

export const frequencyRepository = {
    create: (data: IFrequencyEntity) => prisma.frequency.create({ data }),
    findAll: () => prisma.frequency.findMany({
        include: {
          user: true
        }
    }),
    findById: (id: string) => prisma.frequency.findUnique({ where: { id } }),
    findByUserId: (user_id: string) => 
        prisma.frequency.findMany({ where: { user_id } }),
    delete: (id: string) => prisma.frequency.delete({ where: { id } }),
    count: (userId?: string) =>
    prisma.frequency.count({
        where: {
        ...(userId && { user_id: userId })
        }
    })
      
};
