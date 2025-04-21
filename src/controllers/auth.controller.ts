import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const authController = {
	async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const { user, token } = await authService.authenticate(email, password);

			return res.status(200).json({
				success: true,
				message: 'Autenticação realizada com sucesso.',
				data: { user, token },
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
	}
};
