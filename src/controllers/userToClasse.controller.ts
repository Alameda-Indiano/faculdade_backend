import { Request, Response } from 'express';
import { userToClasseService } from '../services/userToClasse.service';

export const userToClasseController = {
	async create(req: Request, res: Response) {
		try {
			const mapping = await userToClasseService.createMapping(req.body);
			return res.status(201).json({ success: true, message: 'Vínculo criado com sucesso.', data: mapping });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ success: false, message: error.message });
			}
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},

	async findAll(req: Request, res: Response) {
		try {
			const mappings = await userToClasseService.getMappings();
			return res.json({ success: true, message: 'Vínculos encontrados com sucesso.', data: mappings });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ success: false, message: error.message });
			}
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},

	async findByUser(req: Request, res: Response) {
		try {
			const { user_id } = req.params;
			const mappings = await userToClasseService.getMappingsByUser(user_id);
			return res.json({ success: true, message: 'Vínculos de usuário encontrados com sucesso.', data: mappings });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ success: false, message: error.message });
			}
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},

	async findByClasse(req: Request, res: Response) {
		try {
			const { classe_id } = req.params;
			const mappings = await userToClasseService.getMappingsByClasse(classe_id);
			return res.json({ success: true, message: 'Vínculos de classe encontrados com sucesso.', data: mappings });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ success: false, message: error.message });
			}
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},

	async remove(req: Request, res: Response) {
		try {
			const { user_id, classe_id } = req.params;
			await userToClasseService.removeMapping(user_id, classe_id);
			return res.status(200).json({ success: true, message: 'Vínculo removido com sucesso.' });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ success: false, message: error.message });
			}
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},
};
