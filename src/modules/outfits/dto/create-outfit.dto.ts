import { z } from "zod";
import { Style } from "../../../../generated/prisma";

export enum Occasion {
  WORK = "WORK",
  CASUAL = "CASUAL",
  DATE = "DATE",
  WEDDING = "WEDDING",
  SPORT = "SPORT",
  PARTY = "PARTY",
  FORMAL = "FORMAL",
}

export const createOutfitSchema = z.object({
  name: z.string().min(1),
  occasion: z.nativeEnum(Occasion).optional(),
  itemIds: z.array(z.string()).min(1, "At least one item is required"),
  // notes: z.string().optional(),
});

export type CreateOutfitDTO = z.infer<typeof createOutfitSchema>;
