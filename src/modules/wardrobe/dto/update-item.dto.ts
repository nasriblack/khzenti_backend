import { z } from 'zod';

export const updateItemSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  color: z.string().optional(),
  brand: z.string().optional(),
  size: z.string().optional(),
  season: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export type UpdateItemDTO = z.infer<typeof updateItemSchema>;
