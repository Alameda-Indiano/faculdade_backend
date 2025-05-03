import { IFrequencyEntity } from '../entities/frequency.entity';
import { frequencyRepository } from '../repositories/frequency.repository';

export const frequencyService = {
    createFrequency: async (data: IFrequencyEntity): Promise<IFrequencyEntity> => {
        return await frequencyRepository.create(data);
    },

    getFrequencies: async (): Promise<IFrequencyEntity[]> => {
        return await frequencyRepository.findAll();
    },

    getFrequencyById: async (id: string): Promise<IFrequencyEntity | null> => {
        return await frequencyRepository.findById(id);
    },

    getFrequenciesByUserId: async (userId: string): Promise<IFrequencyEntity[]> => {
        return await frequencyRepository.findByUserId(userId);
    },

    deleteFrequency: frequencyRepository.delete,
    count: async (userId?: string): Promise<number> => {
        return await frequencyRepository.count(userId);
    },
};
