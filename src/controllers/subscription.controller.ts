import { Request, Response } from 'express';
import { subscriptionService } from '../services/subscription.service';

export const subscriptionController = {
    async create(req: Request, res: Response) {
        try {
            const subscription = await subscriptionService.createSubscription(req.body);
            return res.status(201).json({
                success: true,
                message: 'Assinatura criada com sucesso.',
                data: subscription,
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
            const subscriptions = await subscriptionService.getSubscriptions();
            return res.json({
                success: true,
                message: 'Assinaturas encontradas com sucesso.',
                data: subscriptions,
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
            const subscription = await subscriptionService.getSubscriptionById(id);
            
            if (!subscription) {
                return res.status(404).json({
                    success: false,
                    message: 'Assinatura não encontrada.',
                });
            }

            return res.json({
                success: true,
                message: 'Assinatura encontrada com sucesso.',
                data: subscription,
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

    async findByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const subscriptions = await subscriptionService.getSubscriptionsByUserId(userId);
            
            return res.json({
                success: true,
                message: 'Assinaturas do usuário encontradas com sucesso.',
                data: subscriptions,
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
            const subscription = await subscriptionService.updateSubscription(id, req.body);
            return res.json({
                success: true,
                message: 'Assinatura atualizada com sucesso.',
                data: subscription,
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
            await subscriptionService.deleteSubscription(id);
            return res.json({
                success: true,
                message: 'Assinatura removida com sucesso.',
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
    async count(req: Request, res: Response) {
		try {
			const count = await subscriptionService.count();
			return res.status(200).json({
				success: true,
				message: 'Total de assinaturas obtidas com sucesso.',
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
