import { prisma } from '../config/prisma';
import { IPaymentHistoryEntity } from '../entities/payment-history.entity';

export const paymentHistoryRepository = {
    create: (data: IPaymentHistoryEntity) => prisma.payment_History.create({ data }),
    findAll: async () => await prisma.payment_History.findMany({
        include: {
          subscription: {
            include: {
              user: {
                select: { name: true }
              }
            }
          }
        }
      }),
    findById: (id: string) => prisma.payment_History.findUnique({ where: { id }, include: {
      subscription: {
        include: {
          user: {
            select: { name: true }
          }
        }
      }
    }  }),
    findBySubscriptionId: (subscription_id: string) => 
        prisma.payment_History.findMany({ where: { subscription_id } }),
    findByUserId: async (user_id: string) => {
      const subscription = await prisma.subscription.findUnique({
        where: { user_id },
        include: { 
          payment_History: true
        } 
      });

      if (!subscription) {
          throw new Error('Usuário não tem uma assinatura.');
      }

      return subscription.payment_History;
    },
    update: (id: string, data: Partial<IPaymentHistoryEntity>) =>
        prisma.payment_History.update({ where: { id }, data }),
    delete: (id: string) => prisma.payment_History.delete({ where: { id } }),
};
