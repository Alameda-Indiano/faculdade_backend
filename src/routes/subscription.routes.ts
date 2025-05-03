import { Router } from 'express';
import { subscriptionController } from '../controllers/subscription.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

//@ts-ignore
router.use(authenticateToken);

//@ts-ignore
router.post('/', subscriptionController.create);
//@ts-ignore
router.get('/', subscriptionController.findAll);
//@ts-ignore
router.get('/count/', subscriptionController.count)
//@ts-ignore
router.get('/user/:userId', subscriptionController.findByUserId);
//@ts-ignore
router.get('/:id', subscriptionController.findOne);
//@ts-ignore
router.put('/:id', subscriptionController.update);
//@ts-ignore
router.delete('/:id', subscriptionController.remove);

export default router;
