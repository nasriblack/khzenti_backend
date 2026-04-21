import { Router } from 'express';
import { wardrobeController } from './controllers/wardrobe.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { uploadSingle } from '../../middleware/upload.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post('/', uploadSingle('image'), wardrobeController.createItem.bind(wardrobeController));
router.get('/', wardrobeController.getItems.bind(wardrobeController));
router.get('/:id', wardrobeController.getItem.bind(wardrobeController));
router.put('/:id', wardrobeController.updateItem.bind(wardrobeController));
router.delete('/:id', wardrobeController.deleteItem.bind(wardrobeController));

export default router;
