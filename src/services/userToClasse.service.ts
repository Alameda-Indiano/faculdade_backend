import { IUserToClasseEntity, IUserToClassePublic } from '../entities/userToClasse.entity';
import { userToClasseRepository } from '../repositories/userToClasse.repository';

export const userToClasseService = {
	createMapping: async (data: IUserToClasseEntity): Promise<IUserToClassePublic> => {
		const mapping = await userToClasseRepository.create(data);
		return mapping;
	},

	getMappings: async (): Promise<IUserToClassePublic[]> => {
		const mappings = await userToClasseRepository.findAll();
		return mappings;
	},

	getMappingsByUser: async (user_id: string): Promise<IUserToClassePublic[]> => {
		const mappings = await userToClasseRepository.findByUserId(user_id);
		return mappings;
	},

	getMappingsByClasse: async (classe_id: string): Promise<IUserToClassePublic[]> => {
		const mappings = await userToClasseRepository.findByClasseId(classe_id);
		return mappings;
	},

	removeMapping: async (user_id: string, classe_id: string): Promise<void> => {
		await userToClasseRepository.delete(user_id, classe_id);
	},
};
