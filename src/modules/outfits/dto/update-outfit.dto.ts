import { z } from 'zod';

export const updateOutfitSchema = z.object({
  name: z.string().min(1).optional(),
  occasion: z.string().optional(),
  season: z.string().optional(),
  itemIds: z.array(z.string()).optional(),
  notes: z.string().optional(),
  isFavorite: z.boolean().optional(),
});

export type UpdateOutfitDTO = z.infer<typeof updateOutfitSchema>;
