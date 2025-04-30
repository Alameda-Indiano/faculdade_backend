import { Request, Response } from 'express';
import { paymentHistoryService } from '../services/payment-history.service';

export const paymentHistoryController = {
    async create(req: Request, res: Response) {
        try {
            const paymentHistory = await paymentHistoryService.createPaymentHistory(req.body);
            return res.status(201).json({
                success: true,
                message: 'Histórico de pagamento criado com sucesso.',
                data: paymentHistory,
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
            const paymentHistories = await paymentHistoryService.getPaymentHistories();
            return res.json({
                success: true,
                message: 'Históricos de pagamento encontrados com sucesso.',
                data: paymentHistories,
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
            const paymentHistory = await paymentHistoryService.getPaymentHistoryById(id);
            
            if (!paymentHistory) {
                return res.status(404).json({
                    success: false,
                    message: 'Histórico de pagamento não encontrado.',
                });
            }

            return res.json({
                success: true,
                message: 'Histórico de pagamento encontrado com sucesso.',
                data: paymentHistory,
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

    async findBySubscriptionId(req: Request, res: Response) {
        try {
            const { subscriptionId } = req.params;
            const paymentHistories = await paymentHistoryService.getPaymentHistoriesBySubscriptionId(subscriptionId);
            
            return res.json({
                success: true,
                message: 'Históricos de pagamento da assinatura encontrados com sucesso.',
                data: paymentHistories,
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
            const paymentHistory = await paymentHistoryService.updatePaymentHistory(id, req.body);
            return res.json({
                success: true,
                message: 'Histórico de pagamento atualizado com sucesso.',
                data: paymentHistory,
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
            await paymentHistoryService.deletePaymentHistory(id);
            return res.json({
                success: true,
                message: 'Histórico de pagamento removido com sucesso.',
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
