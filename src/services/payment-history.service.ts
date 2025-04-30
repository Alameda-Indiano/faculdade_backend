import { IPaymentHistoryEntity } from '../entities/payment-history.entity';
import { paymentHistoryRepository } from '../repositories/payment-history.repository';

export const paymentHistoryService = {
    createPaymentHistory: async (data: IPaymentHistoryEntity): Promise<IPaymentHistoryEntity> => {
        return await paymentHistoryRepository.create(data);
    },

    getPaymentHistories: async (): Promise<IPaymentHistoryEntity[]> => {
        return await paymentHistoryRepository.findAll();
    },

    getPaymentHistoryById: async (id: string): Promise<IPaymentHistoryEntity | null> => {
        return await paymentHistoryRepository.findById(id);
    },

    getPaymentHistoriesBySubscriptionId: async (subscriptionId: string): Promise<IPaymentHistoryEntity[]> => {
        return await paymentHistoryRepository.findBySubscriptionId(subscriptionId);
    },

    updatePaymentHistory: async (
        id: string,
        data: Partial<IPaymentHistoryEntity>
    ): Promise<IPaymentHistoryEntity> => {
        const existing = await paymentHistoryRepository.findById(id);
        if (!existing) throw new Error('Histórico de pagamento não encontrado.');

        return await paymentHistoryRepository.update(id, data);
    },

    deletePaymentHistory: paymentHistoryRepository.delete,
};
