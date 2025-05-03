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

    
};
