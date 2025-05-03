import { ISubscriptionEntity } from '../entities/subscription.entity';
import { subscriptionRepository } from '../repositories/subscription.repository';

export const subscriptionService = {
    createSubscription: async (data: ISubscriptionEntity): Promise<ISubscriptionEntity> => {
        return await subscriptionRepository.create(data);
    },

    getSubscriptions: async (): Promise<ISubscriptionEntity[]> => {
        return await subscriptionRepository.findAll();
    },

    getSubscriptionById: async (id: string): Promise<ISubscriptionEntity | null> => {
        return await subscriptionRepository.findById(id);
    },

    getSubscriptionsByUserId: async (userId: string): Promise<ISubscriptionEntity | null> => {
        return await subscriptionRepository.findByUserId(userId);
    },

    updateSubscription: async (
        id: string,
        data: Partial<ISubscriptionEntity>
    ): Promise<ISubscriptionEntity> => {
        const existing = await subscriptionRepository.findById(id);
        if (!existing) throw new Error('Assinatura não encontrada.');

        return await subscriptionRepository.update(id, data);
    },

    deleteSubscription: subscriptionRepository.delete,
    count: subscriptionRepository.count
};
