import { Request, Response } from 'express';
import { statusService } from '../services/status.service';

export const statusController = {
	async count(req: Request, res: Response) {
		try {
			const count = await statusService.count(!!req.headers.authorization ? req?.headers?.authorization : '');
			return res.status(201).json({
				success: true,
				message: 'Total de registro obtido com sucesso.',
				data: count,
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
	async studentAttendance(req: Request, res: Response) {
		try {
			const { user_id, class_id } = req.query;

			const report = await statusService.getAttendanceReport(
				user_id as string,
				class_id as string
			);

			return res.json({
				success: true,
				message: 'Relatório de frequência gerado com sucesso.',
				data: report,
			});
		} catch (error) {
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},
	async financialManagement(req: Request, res: Response) {
		try {
			const { user_id } = req.query;

			const report = await statusService.getFinancialManagementReport(user_id as string);

			return res.json({
				success: true,
				message: 'Relatório financeiro gerado com sucesso.',
				data: report,
			});
		} catch (error) {
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	},
	async bmiProgress(req: Request, res: Response) {
		try {
			const { user_id } = req.query;

			if (!user_id)
				return res.status(400).json({
					success: false,
					message: 'Parâmetro user_id é obrigatório.',
				});

			const report = await statusService.bmiProgressReport(user_id as string);

			return res.json({
				success: true,
				message: 'Relatório de IMC gerado com sucesso.',
				data: report,
			});
		} catch (error) {
			return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
		}
	}

};
