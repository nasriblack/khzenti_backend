import { prisma } from '../../../config/database';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { AppErrorClass } from '../../../middleware/error.middleware';

export class UserService {
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        preferences: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppErrorClass('User not found', 404);
    }

    return user;
  }

  async updateUser(userId: string, data: UpdateUserDTO) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        preferences: data.preferences as any,
      },
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        preferences: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async deleteUser(userId: string) {
    await prisma.user.delete({
      where: { id: userId },
    });

    return { message: 'User deleted successfully' };
  }

  async getUserStats(userId: string) {
    const [wardrobeCount, outfitCount] = await Promise.all([
      prisma.wardrobeItem.count({ where: { userId } }),
      prisma.outfit.count({ where: { userId } }),
    ]);

    return {
      wardrobeItems: wardrobeCount,
      outfits: outfitCount,
    };
  }
}

export const userService = new UserService();
