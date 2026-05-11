import { z } from "zod";

export enum Season {
  SUMMER = "SUMMER",
  WINTER = "WINTER",
  SPRING = "SPRING",
  FALL = "FALL",
}

export enum Category {
  TOPS = "TOPS",
  BOTTOMS = "BOTTOMS",
  SHOES = "SHOES",
  JACKETS = "JACKETS",
  ACCESSORIES = "ACCESSORIES",
}

export const createItemSchema = z.object({
  category: z.nativeEnum(Category),
  colors: z.array(z.string()),
  season: z.nativeEnum(Season).optional(),
  brand: z.string().optional(),
  notes: z.string().optional(),
  styleTags: z.array(z.string()).optional(),
});

export type CreateItemDTO = z.infer<typeof createItemSchema>;
