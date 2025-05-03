import { Request, Response } from 'express';
import { frequencyService } from '../services/frequency.service';

export const frequencyController = {
    async create(req: Request, res: Response) {
        try {
            const frequency = await frequencyService.createFrequency(req.body);
            return res.status(201).json({
                success: true,
                message: 'Frequência registrada com sucesso.',
                data: frequency,
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
            const frequencies = await frequencyService.getFrequencies();
            return res.json({
                success: true,
                message: 'Frequências encontradas com sucesso.',
                data: frequencies,
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
            const frequency = await frequencyService.getFrequencyById(id);
            
            if (!frequency) {
                return res.status(404).json({
                    success: false,
                    message: 'Frequência não encontrada.',
                });
            }

            return res.json({
                success: true,
                message: 'Frequência encontrada com sucesso.',
                data: frequency,
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
            const frequencies = await frequencyService.getFrequenciesByUserId(userId);
            
            return res.json({
                success: true,
                message: 'Frequências do usuário encontradas com sucesso.',
                data: frequencies,
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
            await frequencyService.deleteFrequency(id);
            return res.json({
                success: true,
                message: 'Frequência removida com sucesso.',
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
			const count = await frequencyService.count();
			return res.status(200).json({
				success: true,
				message: 'Total de frequências obtidas com sucesso.',
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
    async countByUser(req: Request, res: Response) {
		try {
            const { id } = req.params;
			const count = await frequencyService.count(id);
			return res.status(200).json({
				success: true,
				message: 'Total de frequências do usuário obtidas com sucesso.',
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
