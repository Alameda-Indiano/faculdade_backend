import { IStatusCountEntity } from '../entities/status.entity';
import { statusRepository } from '../repositories/status.repository';

export const statusService = {
    count: async (auth: string): Promise<IStatusCountEntity> => {
        const [frequency, classe, subscription, user] = await Promise.all([
            statusRepository.count('frequencies', auth),
            statusRepository.count('classe', auth),
            statusRepository.count('subscriptions', auth),
            statusRepository.count('users', auth),
        ]);

        return {
            classe,
            frequency,
            subscription,
            user
        }
    },

};
