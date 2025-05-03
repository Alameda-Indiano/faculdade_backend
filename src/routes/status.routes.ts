import { Router } from 'express';
import { statusController } from '../controllers/status.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

//@ts-ignore
router.use(authenticateToken);

//@ts-ignore
router.get('/count', statusController.count);

export default router;