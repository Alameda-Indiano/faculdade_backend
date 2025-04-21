import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

//@ts-ignore
router.use(authenticateToken);

//@ts-ignore
router.post('/', userController.create);
//@ts-ignore
router.get('/', userController.findAll);
//@ts-ignore
router.put('/:id', userController.update);
//@ts-ignore
router.get('/:id', userController.findOne);
//@ts-ignore
router.delete('/:id', userController.remove);

export default router;