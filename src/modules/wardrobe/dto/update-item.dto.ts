import { z } from "zod";
import { Category, Season } from "./create-item.dto";

export const updateItemSchema = z.object({
  category: z.nativeEnum(Category),
  colors: z.array(z.string()),
  season: z.nativeEnum(Season).optional(),
  brand: z.string().optional(),
  notes: z.string().optional(),
  styleTags: z.array(z.string()).optional(),
});
export type UpdateItemDTO = z.infer<typeof updateItemSchema>;
