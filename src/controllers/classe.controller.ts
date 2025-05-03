import { Request, Response } from 'express';
import { classeService } from '../services/classe.service';

export const classeController = {
	async create(req: Request, res: Response) {
		try {
			const classe = await classeService.createClasse(req.body);
			return res.status(201).json({
				success: true,
				message: 'Classe criada com sucesso.',
				data: classe,
			});
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ success: false, message: error.message });
			}
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},

	async findAll(req: Request, res: Response) {
		try {
			const classes = await classeService.getClasses();
			return res.json({ success: true, message: 'Classes encontradas com sucesso.', data: classes });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ success: false, message: error.message });
			}
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},

	async findOne(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const classe = await classeService.getClasseById(id);
			if (!classe) {
				return res.status(404).json({ success: false, message: 'Classe não encontrada.' });
			}
			return res.json({ success: true, message: 'Classe encontrada com sucesso.', data: classe });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ success: false, message: error.message });
			}
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const classe = await classeService.updateClasse(id, req.body);
			return res.json({ success: true, message: 'Classe atualizada com sucesso.', data: classe });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ success: false, message: error.message });
			}
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},

	async remove(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await classeService.deleteClasse(id);
			return res.status(200).json({ success: true, message: 'Classe removida com sucesso.' });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ success: false, message: error.message });
			}
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},
	async count(req: Request, res: Response) {
		try {
			const count = await classeService.count();
			return res.status(200).json({
				success: true,
				message: 'Total de turmas obtidas com sucesso.',
				data: count
			});
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({
					success: false,
					message: error.message,
				});
			}
			return res.status(500).json({
				success: false,
				message: 'Erro interno do servidor.',
			});
		}
	},
};
