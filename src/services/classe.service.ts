import { IClasseEntity, IClassePublic } from '../entities/classe.entity';
import { classeRepository } from '../repositories/classe.repository';

export const classeService = {
	createClasse: async (data: IClasseEntity): Promise<IClassePublic> => {
		const newClasse = await classeRepository.create(data);
		return newClasse;
	},

	getClasses: async (): Promise<IClassePublic[]> => {
		const classes = await classeRepository.findAll();
		return classes;
	},

	getClasseById: async (id: string): Promise<IClassePublic | null> => {
		const classe = await classeRepository.findById(id);
		return classe;
	},

	updateClasse: async (id: string, data: Partial<IClasseEntity>): Promise<IClassePublic> => {
		const existing = await classeRepository.findById(id);
		if (!existing) throw new Error('Classe não encontrada.');
		const updated = await classeRepository.update(id, data);
		return updated;
	},

	deleteClasse: async (id: string): Promise<void> => {
		await classeRepository.delete(id);
	},
	count: classeRepository.count
};
