import { Request, Response } from 'express';
import { bodyMeasurementService } from '../services/bodyMeasurement.service';

export const bodyMeasurementController = {
	async create(req: Request, res: Response) {
		try {
			const entry = await bodyMeasurementService.createBodyMeasurement(req.body);
			return res.status(201).json({ success: true, message: 'Medição criada com sucesso.', data: entry });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ success: false, message: error.message });
			}
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},

	async findAll(req: Request, res: Response) {
		try {
			const entries = await bodyMeasurementService.getBodyMeasurements();
			return res.json({ success: true, message: 'Medições encontradas com sucesso.', data: entries });
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
			const entry = await bodyMeasurementService.getBodyMeasurementById(id);
			if (!entry) {
				return res.status(404).json({ success: false, message: 'Medição não encontrada.' });
			}
			return res.json({ success: true, message: 'Medição encontrada com sucesso.', data: entry });
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
			const entries = await bodyMeasurementService.getBodyMeasurementsByUser(user_id);
			return res.json({ success: true, message: 'Medições do usuário encontradas com sucesso.', data: entries });
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
			const updated = await bodyMeasurementService.updateBodyMeasurement(id, req.body);
			return res.json({ success: true, message: 'Medição atualizada com sucesso.', data: updated });
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
			await bodyMeasurementService.deleteBodyMeasurement(id);
			return res.status(200).json({ success: true, message: 'Medição removida com sucesso.' });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ success: false, message: error.message });
			}
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},
};
