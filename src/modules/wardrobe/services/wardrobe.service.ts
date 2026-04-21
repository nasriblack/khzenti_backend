import { prisma } from '../../../config/database';
import { CreateItemDTO } from '../dto/create-item.dto';
import { UpdateItemDTO } from '../dto/update-item.dto';
import { AppErrorClass } from '../../../middleware/error.middleware';
import { processImage } from '../../../utils/image.util';
import { uploadToCloudinary, deleteFromCloudinary } from '../../../config/cloudinary';

export class WardrobeService {
  async createItem(userId: string, data: CreateItemDTO, imageBuffer?: Buffer) {
    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    if (imageBuffer) {
      const processedImage = await processImage(imageBuffer);
      const uploaded = await uploadToCloudinary(processedImage, `khzenti/wardrobe/${userId}`);
      imageUrl = uploaded.url;
      imagePublicId = uploaded.publicId;
    }

    const item = await prisma.wardrobeItem.create({
      data: {
        ...data,
        userId,
        imageUrl,
        imagePublicId,
        season: data.season || [],
        tags: data.tags || [],
      },
    });

    return item;
  }

  async getItems(userId: string, filters?: { category?: string; color?: string; season?: string }) {
    const where: any = { userId };

    if (filters?.category) {
      where.category = filters.category;
    }

    if (filters?.color) {
      where.color = filters.color;
    }

    if (filters?.season) {
      where.season = { has: filters.season };
    }

    const items = await prisma.wardrobeItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return items;
  }

  async getItemById(userId: string, itemId: string) {
    const item = await prisma.wardrobeItem.findFirst({
      where: { id: itemId, userId },
    });

    if (!item) {
      throw new AppErrorClass('Wardrobe item not found', 404);
    }

    return item;
  }

  async updateItem(userId: string, itemId: string, data: UpdateItemDTO) {
    const item = await this.getItemById(userId, itemId);

    const updated = await prisma.wardrobeItem.update({
      where: { id: itemId },
      data: {
        ...data,
        season: data.season || item.season,
        tags: data.tags || item.tags,
      },
    });

    return updated;
  }

  async deleteItem(userId: string, itemId: string) {
    const item = await this.getItemById(userId, itemId);

    if (item.imagePublicId) {
      await deleteFromCloudinary(item.imagePublicId);
    }

    await prisma.wardrobeItem.delete({
      where: { id: itemId },
    });

    return { message: 'Item deleted successfully' };
  }
}

export const wardrobeService = new WardrobeService();
