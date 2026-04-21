import { prisma } from '../../../config/database';
import { generateAIResponse } from '../../../config/openrouter';
import { RecommendationDTO } from '../dto/recommendation.dto';
import { AppErrorClass } from '../../../middleware/error.middleware';

export class AIService {
  async generateRecommendations(userId: string, params: RecommendationDTO) {
    // Get user's wardrobe items
    const wardrobeItems = await prisma.wardrobeItem.findMany({
      where: { userId },
    });

    if (wardrobeItems.length === 0) {
      throw new AppErrorClass('No wardrobe items found. Please add items to your wardrobe first.', 400);
    }

    // Build context for AI
    const wardrobeContext = wardrobeItems.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      color: item.color,
      season: item.season,
      tags: item.tags,
    }));

    // Create prompt
    const systemPrompt = `You are a fashion AI assistant specialized in Tunisian and Middle Eastern fashion. 
    You help women create stylish, culturally appropriate outfits from their wardrobe.
    Consider modesty, local fashion trends, and seasonal weather in Tunisia.`;

    const userPrompt = `Based on the following wardrobe items:
${JSON.stringify(wardrobeContext, null, 2)}

Create 3 outfit recommendations for:
- Occasion: ${params.occasion || 'casual'}
- Weather: ${params.weather || 'moderate'}
- Season: ${params.season || 'current'}
${params.preferences?.colors ? `- Preferred colors: ${params.preferences.colors.join(', ')}` : ''}
${params.preferences?.styles ? `- Preferred styles: ${params.preferences.styles.join(', ')}` : ''}

For each outfit, provide:
1. A creative name
2. Which wardrobe item IDs to combine
3. Why this combination works
4. Styling tips specific to Tunisian culture

Return the response as a JSON array with this structure:
[{
  "name": "outfit name",
  "itemIds": ["id1", "id2", "id3"],
  "reason": "why this works",
  "stylingTips": "tips for wearing this outfit"
}]`;

    try {
      const aiResponse = await generateAIResponse({
        systemPrompt,
        userPrompt,
        temperature: 0.8,
        maxTokens: 2000,
      });

      // Parse AI response
      const recommendations = JSON.parse(aiResponse);

      return {
        recommendations,
        context: {
          occasion: params.occasion,
          weather: params.weather,
          season: params.season,
        },
      };
    } catch (error) {
      console.error('AI recommendation error:', error);
      throw new AppErrorClass('Failed to generate recommendations. Please try again.', 500);
    }
  }

  async analyzeOutfit(userId: string, itemIds: string[]) {
    // Verify items belong to user
    const items = await prisma.wardrobeItem.findMany({
      where: {
        id: { in: itemIds },
        userId,
      },
    });

    if (items.length !== itemIds.length) {
      throw new AppErrorClass('One or more items not found', 404);
    }

    const itemsContext = items.map((item) => ({
      name: item.name,
      category: item.category,
      color: item.color,
    }));

    const systemPrompt = `You are a fashion AI assistant specialized in analyzing outfit combinations for Tunisian women.`;

    const userPrompt = `Analyze this outfit combination:
${JSON.stringify(itemsContext, null, 2)}

Provide:
1. Overall score (1-10)
2. Color harmony analysis
3. Style coherence
4. Cultural appropriateness for Tunisia
5. Suggestions for improvement

Return as JSON:
{
  "score": 8,
  "colorHarmony": "analysis",
  "styleCoherence": "analysis",
  "culturalFit": "analysis",
  "suggestions": ["suggestion1", "suggestion2"]
}`;

    try {
      const aiResponse = await generateAIResponse({
        systemPrompt,
        userPrompt,
        temperature: 0.7,
      });

      return JSON.parse(aiResponse);
    } catch (error) {
      throw new AppErrorClass('Failed to analyze outfit', 500);
    }
  }
}

export const aiService = new AIService();
