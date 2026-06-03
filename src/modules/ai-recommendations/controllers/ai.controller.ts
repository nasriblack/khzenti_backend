import { Request, Response, NextFunction } from "express";
import { aiService } from "../services/ai.service";
import { sendError, sendSuccess } from "../../../utils/response.util";
import { recommendationSchema } from "../dto/recommendation.dto";
import { prisma } from "../../../config/database";
import { AppErrorClass } from "../../../middleware/error.middleware";

export class AIController {
  async getRecommendations(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const validated = recommendationSchema.parse(req.body);

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          outfitGenerationsUsed: true,
          maxOutfitGenerations: true,
        },
      });

      if (
        user?.outfitGenerationsUsed &&
        user?.maxOutfitGenerations &&
        user?.outfitGenerationsUsed >= user?.maxOutfitGenerations
      ) {
        throw new AppErrorClass(
          "You have reached your outfit generation limit.",
          "404",
        );
      }

      const recommendations = await aiService.generateRecommendations(
        userId,
        validated,
      );

      return sendSuccess(
        res,
        recommendations,
        "Recommendations generated successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  async getTodayWeather(req: Request, res: Response, next: NextFunction) {
    const todayWeather = await aiService.getTodayWeather(req.user!.userId);

    return sendSuccess(res, todayWeather, "Request generated successfully");
  }

  // async analyzeOutfit(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const userId = req.user!.userId;
  //     const { itemIds } = req.body;

  //     if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
  //       return res.status(400).json({
  //         success: false,
  //         error: 'itemIds array is required',
  //       });
  //     }

  //     const analysis = await aiService.analyzeOutfit(userId, itemIds);

  //     return sendSuccess(res, analysis, 'Outfit analyzed successfully');
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

export const aiController = new AIController();
