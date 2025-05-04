import { Router } from 'express';
import { statusController } from '../controllers/status.controller';

const router = Router();

//@ts-ignore
// router.use(authenticateToken);

//@ts-ignore
router.get('/count', statusController.count);
//@ts-ignore
router.get('/student-attendance', statusController.studentAttendance);
//@ts-ignore
router.get('/financial-management', statusController.financialManagement);
//@ts-ignore
router.get('/bmi-progress', statusController.bmiProgress);

export default router;
