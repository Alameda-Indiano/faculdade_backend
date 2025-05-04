import { Router } from 'express';
import { paymentHistoryController } from '../controllers/payment-history.controller';

const router = Router();

//@ts-ignore
// router.use(authenticateToken);

//@ts-ignore
router.post('/', paymentHistoryController.create);
//@ts-ignore
router.get('/', paymentHistoryController.findAll);
//@ts-ignore
router.get('/subscription/:subscriptionId', paymentHistoryController.findBySubscriptionId);
//@ts-ignore
router.get('/:id', paymentHistoryController.findOne);
//@ts-ignore
router.put('/:id', paymentHistoryController.update);
//@ts-ignore
router.delete('/:id', paymentHistoryController.remove);

export default router;
