import { Router } from 'express';
import { frequencyController } from '../controllers/frequency.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

//@ts-ignore
router.use(authenticateToken);

//@ts-ignore
router.post('/', frequencyController.create);
//@ts-ignore
router.get('/', frequencyController.findAll);
//@ts-ignore
router.get('/count/', frequencyController.count);
//@ts-ignore
router.get('/count/:userId', frequencyController.countByUser);
//@ts-ignore
router.get('/user/:userId', frequencyController.findByUserId);
//@ts-ignore
router.get('/:id', frequencyController.findOne);
//@ts-ignore
router.delete('/:id', frequencyController.remove);

export default router;
