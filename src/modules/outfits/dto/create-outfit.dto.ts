import { z } from 'zod';

export const createOutfitSchema = z.object({
  name: z.string().min(1),
  occasion: z.string().optional(),
  season: z.string().optional(),
  itemIds: z.array(z.string()).min(1, 'At least one item is required'),
  notes: z.string().optional(),
});

export type CreateOutfitDTO = z.infer<typeof createOutfitSchema>;
