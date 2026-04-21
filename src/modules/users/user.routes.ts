import { Router } from 'express';
import { userController } from './controllers/user.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/profile', userController.getProfile.bind(userController));
router.put('/profile', userController.updateProfile.bind(userController));
router.delete('/profile', userController.deleteProfile.bind(userController));
router.get('/stats', userController.getStats.bind(userController));

export default router;
