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
	async getAttendanceReport(user_id?: string, class_id?: string) {
		const where: any = {};

		if (user_id) where.user_id = user_id;

		if (class_id) {
			where.user = {
				classes: {
					some: {
						classe_id: class_id,
					},
				},
			};
		}

		const result = await statusRepository.getAttendanceReport(where);

		const items = result.map((entry) => ({
			user_name: entry.user.name,
			date: entry.created_at.toISOString().split('T')[0],
		}));

		const categories = [...new Set(items.map(i => i.date))].sort();
		const total = items.length;

		return {
			typeGraphic: 'line',
			categories,
			attendance: {
				title: 'Frequência de Alunos',
				total,
				items,
			},
		};
	},
	async getFinancialManagementReport(user_id?: string) {
		const result = await statusRepository.getFinancialManagement(user_id);
		return result;
	},
	async bmiProgressReport(user_id: string) {
		if (!user_id) throw new Error('User ID é obrigatório.');

		const result = await statusRepository.getBmiProgress(user_id);

		const items = result.map(({ created_at, ...entry }) => ({
			...entry,
			date: created_at.toISOString().split('T')[0],
		}));

		const categories = [...new Set(items.map((entry) => entry.date))];

		const total = items.reduce((sum, entry) => sum + entry.bmi, 0);

		return {
			typeGraphic: 'line',
			categories,
			bmi: {
				title: 'Índice de Massa Corporal',
				total,
				items,
			}
		};
	}

};
