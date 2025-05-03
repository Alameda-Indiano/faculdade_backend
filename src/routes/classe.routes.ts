import { Router } from 'express';
import { classeController } from '../controllers/classe.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

//@ts-ignore
router.use(authenticateToken);

// Classe routes
//@ts-ignore
router.post('/', classeController.create);
//@ts-ignore
router.get('/', classeController.findAll);
//@ts-ignore
router.get('/count', classeController.count)
//@ts-ignore
router.get('/:id', classeController.findOne);
//@ts-ignore
router.put('/:id', classeController.update);
//@ts-ignore
router.delete('/:id', classeController.remove);

export default router;
