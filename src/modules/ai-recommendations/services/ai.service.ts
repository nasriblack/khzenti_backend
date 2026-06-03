import { prisma } from "../../../config/database";
import { generateAIResponse } from "../../../config/openrouter";
import { RecommendationDTO } from "../dto/recommendation.dto";
import { AppErrorClass } from "../../../middleware/error.middleware";
import GetCurrentWeather, { WeatherData } from "./weather.service";
import { buildWeatherContext } from "./weatherHelper";
import { Season } from "../../wardrobe/dto/create-item.dto";
import { userService } from "../../users/services/user.service";

export class AIService {
  async getTodayWeather(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        location: true,
      },
    });
    const weather_api = await GetCurrentWeather(user?.location ?? "Tunis");

    return weather_api;
  }
  async generateRecommendations(userId: string, params: RecommendationDTO) {
    // 1. Weather (single DB + API call)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { location: true, outfitGenerationsUsed: true },
    });

    await userService.updateUser(userId, {
      outfitGenerationsUsed: (user?.outfitGenerationsUsed ?? 0) + 1,
    });

    const rawWeather = (await GetCurrentWeather(
      user?.location ?? "Tunis",
    )) as WeatherData;
    const weather = buildWeatherContext(rawWeather);

    const wardrobeItems = await prisma.wardrobeItem.findMany({
      where: {
        userId,
        season: { in: [weather.season, Season.ALL] },
      },
      select: {
        id: true,
        colors: true,
        category: true,
        styleTags: true,
        notes: true,

        // season is intentionally excluded — it's already filtered, no need to send it to the AI
      },
    });

    if (wardrobeItems.length === 0) {
      throw new AppErrorClass(
        "No wardrobe items found. Please add items to your wardrobe first.",
        "400",
      );
    }

    if (wardrobeItems.length < 3) {
      return {
        success: false,
        message:
          "You don't have enough items to generate , be sure that u have more then 3 items on your wardrobe !",
        weather: weather.summary,
      };
    }

    // 3. Build prompts
    const colorPref = params.preferences?.colors?.join(", ");
    const stylePref = params.preferences?.styles?.join(", ");

    const systemPrompt =
      "You are a fashion stylist for Tunisian women. " +
      "Create modest, stylish outfits that respect local culture and current weather. " +
      "Reply ONLY with a valid JSON array — no markdown, no extra text.";

    const userPrompt =
      `Weather: ${weather.summary}\n` +
      `Occasion: ${params.occasion ?? "casual"}\n` +
      (colorPref ? `Preferred colors: ${colorPref}\n` : "") +
      (stylePref ? `Preferred styles: ${stylePref}\n` : "") +
      `\nWardrobe:\n${JSON.stringify(wardrobeItems)}\n` +
      `\nReturn 1 outfit as a JSON array:\n` +
      `[{"name":"...","itemIds":["id1","id2"],"reason":"...","stylingTips":"..."}]`;

    // Build context for AI

    try {
      const aiResponse = await generateAIResponse(
        [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        "openai/gpt-3.5-turbo",
      );

      // Parse AI response
      const recommendations = JSON.parse(aiResponse);

      return {
        recommendations,
        context: {
          occasion: params.occasion,
          weather: params.weather,
        },
      };
    } catch (error) {
      console.error("AI recommendation error:", error);
      throw new AppErrorClass(
        "Failed to generate recommendations. Please try again.",
        "500",
      );
    }
  }

  //   async analyzeOutfit(userId: string, itemIds: string[]) {
  //     // Verify items belong to user
  //     const items = await prisma.wardrobeItem.findMany({
  //       where: {
  //         id: { in: itemIds },
  //         userId,
  //       },
  //     });

  //     if (items.length !== itemIds.length) {
  //       throw new AppErrorClass("One or more items not found", 404);
  //     }

  //     const itemsContext = items.map((item) => ({
  //       name: item.name,
  //       category: item.category,
  //       color: item.color,
  //     }));

  //     const systemPrompt = `You are a fashion AI assistant specialized in analyzing outfit combinations for Tunisian women.`;

  //     const userPrompt = `Analyze this outfit combination:
  // ${JSON.stringify(itemsContext, null, 2)}

  // Provide:
  // 1. Overall score (1-10)
  // 2. Color harmony analysis
  // 3. Style coherence
  // 4. Cultural appropriateness for Tunisia
  // 5. Suggestions for improvement

  // Return as JSON:
  // {
  //   "score": 8,
  //   "colorHarmony": "analysis",
  //   "styleCoherence": "analysis",
  //   "culturalFit": "analysis",
  //   "suggestions": ["suggestion1", "suggestion2"]
  // }`;

  //     try {
  //       const aiResponse = await generateAIResponse({
  //         systemPrompt,
  //         userPrompt,
  //         temperature: 0.7,
  //       });

  //       return JSON.parse(aiResponse);
  //     } catch (error) {
  //       throw new AppErrorClass("Failed to analyze outfit", 500);
  //     }
  //   }
}

export const aiService = new AIService();
