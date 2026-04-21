import { z } from 'zod';

export const createItemSchema = z.object({
  name: z.string().min(1),
  category: z.string(),
  subcategory: z.string().optional(),
  color: z.string(),
  brand: z.string().optional(),
  size: z.string().optional(),
  season: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export type CreateItemDTO = z.infer<typeof createItemSchema>;
