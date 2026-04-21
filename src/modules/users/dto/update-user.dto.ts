import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  profileImage: z.string().url().optional(),
  preferences: z.object({
    favoriteColors: z.array(z.string()).optional(),
    stylePreferences: z.array(z.string()).optional(),
    sizes: z.record(z.string()).optional(),
  }).optional(),
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
