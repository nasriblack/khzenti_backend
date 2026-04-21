import { Router } from 'express';
import { outfitController } from './controllers/outfit.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post('/', outfitController.createOutfit.bind(outfitController));
router.get('/', outfitController.getOutfits.bind(outfitController));
router.get('/:id', outfitController.getOutfit.bind(outfitController));
router.put('/:id', outfitController.updateOutfit.bind(outfitController));
router.delete('/:id', outfitController.deleteOutfit.bind(outfitController));

export default router;
