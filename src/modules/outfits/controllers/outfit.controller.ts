import { Request, Response, NextFunction } from 'express';
import { outfitService } from '../services/outfit.service';
import { sendSuccess, sendCreated } from '../../../utils/response.util';
import { createOutfitSchema } from '../dto/create-outfit.dto';
import { updateOutfitSchema } from '../dto/update-outfit.dto';

export class OutfitController {
  async createOutfit(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const validated = createOutfitSchema.parse(req.body);

      const outfit = await outfitService.createOutfit(userId, validated);
      
      return sendCreated(res, outfit, 'Outfit created successfully');
    } catch (error) {
      next(error);
    }
  }

  async getOutfits(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { occasion, season, isFavorite } = req.query;

      const outfits = await outfitService.getOutfits(userId, {
        occasion: occasion as string,
        season: season as string,
        isFavorite: isFavorite === 'true',
      });
      
      return sendSuccess(res, outfits, 'Outfits retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getOutfit(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { id } = req.params;

      const outfit = await outfitService.getOutfitById(userId, id);
      
      return sendSuccess(res, outfit, 'Outfit retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateOutfit(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { id } = req.params;
      const validated = updateOutfitSchema.parse(req.body);

      const outfit = await outfitService.updateOutfit(userId, id, validated);
      
      return sendSuccess(res, outfit, 'Outfit updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteOutfit(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { id } = req.params;

      const result = await outfitService.deleteOutfit(userId, id);
      
      return sendSuccess(res, result, 'Outfit deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const outfitController = new OutfitController();
