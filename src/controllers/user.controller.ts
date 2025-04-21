import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export const userController = {
	async create(req: Request, res: Response) {
		try {
			const user = await userService.createUser(req.body);
			return res.status(201).json({
				success: true,
				message: 'Usuário criado com sucesso.',
				data: user,
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

	async findAll(req: Request, res: Response) {
		try {
			const users = await userService.getUsers();
			return res.json({
				success: true,
				message: 'Usuários encontrados com sucesso.',
				data: users,
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

	async findOne(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const user = await userService.getUserById(id);

			if (!user) {
				return res.status(404).json({
					success: false,
					message: 'Usuário não encontrado.',
				});
			}

			return res.json({
				success: true,
				message: 'Usuário encontrado com sucesso.',
				data: user,
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

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const user = await userService.updateUser(id, req.body);

			return res.json({
				success: true,
				message: 'Usuário atualizado com sucesso.',
				data: user,
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

	async remove(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await userService.deleteUser(id);
			return res.status(200).json({
				success: true,
				message: 'Usuário removido com sucesso.',
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
