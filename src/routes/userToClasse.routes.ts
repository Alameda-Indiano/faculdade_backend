import { Router } from 'express';
import { userToClasseController } from '../controllers/userToClasse.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

//@ts-ignore
router.use(authenticateToken);

// Mapping routes
//@ts-ignore
router.post('/', userToClasseController.create);
//@ts-ignore
router.get('/', userToClasseController.findAll);
//@ts-ignore
router.get('/user/:user_id', userToClasseController.findByUser);
//@ts-ignore
router.get('/classe/:classe_id', userToClasseController.findByClasse);
//@ts-ignore
router.delete('/:user_id/:classe_id', userToClasseController.remove);

export default router;
