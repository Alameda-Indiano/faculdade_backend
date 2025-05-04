import { prisma } from '../config/prisma';
export type Entity = 'frequencies' | 'classe' | 'subscriptions' | 'users';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export const statusRepository = {
	count: async (entity: Entity, auth: string): Promise<number> => {
		const res = await fetch(`${API_BASE}/${entity}/count`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': auth
			},
		});

		if (!res.ok) {
			throw new Error(`Erro ao buscar count de ${entity}: ${res.statusText}`);
		}

		const json = await res.json() as { success: boolean, message: string, data: number };
		return json.data;
	},
	getAttendanceReport: async (where: any) => {
		return await prisma.frequency.findMany({
			where,
			select: {
				created_at: true,
				user: {
					select: {
						name: true,
					}
				}
			},
			orderBy: {
				created_at: 'asc',
			},
		});
	},
	async getFinancialManagement(user_id?: string) {
		const where: any = {};
		if (user_id) where.subscription = { user_id };

		const payments = await prisma.payment_History.findMany({
			where,
			orderBy: { created_at: 'asc' },
			select: {
				cost: true,
				created_at: true
			}
		});

		const items = payments.map((p) => ({
			cost: p.cost,
			date: p.created_at.toISOString().split('T')[0],
		}));

		const categories = [...new Set(items.map(i => i.date))].sort();
		const total = items.reduce((sum, i) => sum + i.cost, 0);

		return {
			typeGraphic: 'line',
			categories,
			financial: {
				title: 'Gestão Financeira',
				total,
				items
			}
		};
	},
	getBmiProgress: async (user_id: string) => {
		return await prisma.bodyMeasurement.findMany({
			where: { user_id },
			orderBy: { created_at: 'asc' },
			select: {
				bmi: true,
				weight: true,
				created_at: true
			}
		});
	}
};	
