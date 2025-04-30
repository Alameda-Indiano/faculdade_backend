import { Router } from 'express';
import { bodyMeasurementController } from '../controllers/bodyMeasurement.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

//@ts-ignore
router.use(authenticateToken);

// BodyMeasurement routes
//@ts-ignore
router.post('/', bodyMeasurementController.create);
//@ts-ignore
router.get('/', bodyMeasurementController.findAll);
//@ts-ignore
router.get('/:id', bodyMeasurementController.findOne);
//@ts-ignore
router.get('/user/:user_id', bodyMeasurementController.findByUser);
//@ts-ignore
router.put('/:id', bodyMeasurementController.update);
//@ts-ignore
router.delete('/:id', bodyMeasurementController.remove);

export default router;
