import { prisma } from '../config/prisma';
import { ISubscriptionEntity } from '../entities/subscription.entity';

export const subscriptionRepository = {
    create: (data: ISubscriptionEntity) => prisma.subscription.create({ data }),
    findAll: () => prisma.subscription.findMany({
        include: {
          user: true
        }
    }),
    findById: (id: string) => prisma.subscription.findUnique({ where: { id } }),
    findByUserId: (user_id: string) => prisma.subscription.findFirst({
        where: { user_id }
    }),
    update: (id: string, data: Partial<ISubscriptionEntity>) =>
        prisma.subscription.update({ where: { id }, data }),
    delete: (id: string) => prisma.subscription.delete({ where: { id } }),
    count: () => prisma.subscription.count({
        where: {
            status: {
                equals: "Ativo"
            }
        }
    })
};
