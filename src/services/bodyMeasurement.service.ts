import { IBodyMeasurementEntity, IBodyMeasurementPublic } from '../entities/bodyMeasurement.entity';
import { bodyMeasurementRepository } from '../repositories/bodyMeasurement.repository';

export const bodyMeasurementService = {
	createBodyMeasurement: async (data: IBodyMeasurementEntity): Promise<IBodyMeasurementPublic> => {
		const entry = await bodyMeasurementRepository.create(data);
		return entry;
	},

	getBodyMeasurements: async (): Promise<IBodyMeasurementPublic[]> => {
		const entries = await bodyMeasurementRepository.findAll();
		return entries;
	},

	getBodyMeasurementById: async (id: string): Promise<IBodyMeasurementPublic | null> => {
		const entry = await bodyMeasurementRepository.findById(id);
		return entry;
	},

	getBodyMeasurementsByUser: async (user_id: string): Promise<IBodyMeasurementPublic[]> => {
		const entries = await bodyMeasurementRepository.findByUserId(user_id);
		return entries;
	},

	updateBodyMeasurement: async (id: string, data: Partial<IBodyMeasurementEntity>): Promise<IBodyMeasurementPublic> => {
		const existing = await bodyMeasurementRepository.findById(id);
		if (!existing) throw new Error('Medição não encontrada.');
		const updated = await bodyMeasurementRepository.update(id, data);
		return updated;
	},

	deleteBodyMeasurement: async (id: string): Promise<void> => {
		await bodyMeasurementRepository.delete(id);
	},
};
