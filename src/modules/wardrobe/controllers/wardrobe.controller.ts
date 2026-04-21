import { Request, Response, NextFunction } from 'express';
import { wardrobeService } from '../services/wardrobe.service';
import { sendSuccess, sendCreated } from '../../../utils/response.util';
import { createItemSchema } from '../dto/create-item.dto';
import { updateItemSchema } from '../dto/update-item.dto';

export class WardrobeController {
  async createItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const validated = createItemSchema.parse(req.body);
      const imageBuffer = req.file?.buffer;

      const item = await wardrobeService.createItem(userId, validated, imageBuffer);
      
      return sendCreated(res, item, 'Wardrobe item created successfully');
    } catch (error) {
      next(error);
    }
  }

  async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { category, color, season } = req.query;

      const items = await wardrobeService.getItems(userId, {
        category: category as string,
        color: color as string,
        season: season as string,
      });
      
      return sendSuccess(res, items, 'Wardrobe items retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { id } = req.params;

      const item = await wardrobeService.getItemById(userId, id);
      
      return sendSuccess(res, item, 'Wardrobe item retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { id } = req.params;
      const validated = updateItemSchema.parse(req.body);

      const item = await wardrobeService.updateItem(userId, id, validated);
      
      return sendSuccess(res, item, 'Wardrobe item updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { id } = req.params;

      const result = await wardrobeService.deleteItem(userId, id);
      
      return sendSuccess(res, result, 'Wardrobe item deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const wardrobeController = new WardrobeController();
