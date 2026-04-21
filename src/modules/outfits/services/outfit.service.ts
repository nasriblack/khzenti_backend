import { prisma } from '../../../config/database';
import { CreateOutfitDTO } from '../dto/create-outfit.dto';
import { UpdateOutfitDTO } from '../dto/update-outfit.dto';
import { AppErrorClass } from '../../../middleware/error.middleware';

export class OutfitService {
  async createOutfit(userId: string, data: CreateOutfitDTO) {
    // Verify all items belong to user
    const items = await prisma.wardrobeItem.findMany({
      where: {
        id: { in: data.itemIds },
        userId,
      },
    });

    if (items.length !== data.itemIds.length) {
      throw new AppErrorClass('One or more items not found', 404);
    }

    const outfit = await prisma.outfit.create({
      data: {
        name: data.name,
        occasion: data.occasion,
        season: data.season,
        notes: data.notes,
        userId,
        items: {
          connect: data.itemIds.map((id) => ({ id })),
        },
      },
      include: {
        items: true,
      },
    });

    return outfit;
  }

  async getOutfits(userId: string, filters?: { occasion?: string; season?: string; isFavorite?: boolean }) {
    const where: any = { userId };

    if (filters?.occasion) {
      where.occasion = filters.occasion;
    }

    if (filters?.season) {
      where.season = filters.season;
    }

    if (filters?.isFavorite !== undefined) {
      where.isFavorite = filters.isFavorite;
    }

    const outfits = await prisma.outfit.findMany({
      where,
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return outfits;
  }

  async getOutfitById(userId: string, outfitId: string) {
    const outfit = await prisma.outfit.findFirst({
      where: { id: outfitId, userId },
      include: {
        items: true,
      },
    });

    if (!outfit) {
      throw new AppErrorClass('Outfit not found', 404);
    }

    return outfit;
  }

  async updateOutfit(userId: string, outfitId: string, data: UpdateOutfitDTO) {
    await this.getOutfitById(userId, outfitId);

    const updateData: any = {
      name: data.name,
      occasion: data.occasion,
      season: data.season,
      notes: data.notes,
      isFavorite: data.isFavorite,
    };

    if (data.itemIds) {
      updateData.items = {
        set: data.itemIds.map((id) => ({ id })),
      };
    }

    const outfit = await prisma.outfit.update({
      where: { id: outfitId },
      data: updateData,
      include: {
        items: true,
      },
    });

    return outfit;
  }

  async deleteOutfit(userId: string, outfitId: string) {
    await this.getOutfitById(userId, outfitId);

    await prisma.outfit.delete({
      where: { id: outfitId },
    });

    return { message: 'Outfit deleted successfully' };
  }
}

export const outfitService = new OutfitService();
