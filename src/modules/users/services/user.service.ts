import { prisma } from "../../../config/database";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { AppErrorClass } from "../../../middleware/error.middleware";
import { ServiceResult, WhitelistDTO } from "../../../types";
import { normalizeEmail } from "../../../utils/validator";
import { normalizeIp } from "../../../utils/ipHelper";

export class UserService {
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        isPremium: true,
        isActive: true,
        age: true,
        location: true,
        outfitGenerationsUsed: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppErrorClass("User not found", "404");
    }

    return user;
  }

  async updateUser(userId: string, data: UpdateUserDTO) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
      },
      select: {
        id: true,
        email: true,
        name: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async addToWhitelist(
    email: string,
    ipAddress: string,
    userAgent?: string,
  ): Promise<ServiceResult<WhitelistDTO>> {
    try {
      const normalizedEmail = normalizeEmail(email);
      const normalizedIp = normalizeIp(ipAddress);

      // Check if IP has already submitted an email
      const existingIpEntry = await prisma.whitelist.findFirst({
        where: { ipAddress: normalizedIp },
      });

      if (existingIpEntry) {
        return {
          success: false,
          error: "This IP address has already submitted an email",
          statusCode: 403,
        };
      }

      // Check if email already exists (will be caught by unique constraint, but check explicitly)
      const existingEmail = await prisma.whitelist.findUnique({
        where: { email: normalizedEmail },
      });

      if (existingEmail) {
        return {
          success: false,
          error: "Email already registered in whitelist",
          statusCode: 409,
        };
      }

      // Create whitelist entry
      const whitelistEntry = await prisma.whitelist.create({
        data: {
          email: normalizedEmail,
          ipAddress: normalizedIp,
          userAgent: userAgent || null,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      return {
        success: true,
        data: whitelistEntry,
        statusCode: 201,
      };
    } catch (error: any) {
      // Handle Prisma unique constraint error
      if (error.code === "P2002") {
        return {
          success: false,
          error: "Email already registered in whitelist",
          statusCode: 409,
        };
      }

      // Log unexpected errors
      console.error("WhitelistService Error:", error);

      return {
        success: false,
        error: "Failed to add email to whitelist",
        statusCode: 500,
      };
    }
  }

  async deleteUser(userId: string) {
    await prisma.user.delete({
      where: { id: userId },
    });

    return { message: "User deleted successfully" };
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
