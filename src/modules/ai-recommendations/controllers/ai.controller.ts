import { Request, Response, NextFunction } from 'express';
import { aiService } from '../services/ai.service';
import { sendSuccess } from '../../../utils/response.util';
import { recommendationSchema } from '../dto/recommendation.dto';

export class AIController {
  async getRecommendations(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const validated = recommendationSchema.parse(req.body);

      const recommendations = await aiService.generateRecommendations(userId, validated);
      
      return sendSuccess(res, recommendations, 'Recommendations generated successfully');
    } catch (error) {
      next(error);
    }
  }

  async analyzeOutfit(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { itemIds } = req.body;

      if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'itemIds array is required',
        });
      }

      const analysis = await aiService.analyzeOutfit(userId, itemIds);
      
      return sendSuccess(res, analysis, 'Outfit analyzed successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const aiController = new AIController();
