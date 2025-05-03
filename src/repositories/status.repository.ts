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
};
