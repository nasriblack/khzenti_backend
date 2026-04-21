import { Router } from 'express';
import { aiController } from './controllers/ai.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post('/recommendations', aiController.getRecommendations.bind(aiController));
router.post('/analyze', aiController.analyzeOutfit.bind(aiController));

export default router;
