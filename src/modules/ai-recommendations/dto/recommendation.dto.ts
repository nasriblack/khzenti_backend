import { z } from 'zod';

export const recommendationSchema = z.object({
  occasion: z.string().optional(),
  weather: z.string().optional(),
  season: z.string().optional(),
  preferences: z.object({
    colors: z.array(z.string()).optional(),
    styles: z.array(z.string()).optional(),
  }).optional(),
});

export type RecommendationDTO = z.infer<typeof recommendationSchema>;
