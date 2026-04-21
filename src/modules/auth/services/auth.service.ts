import { prisma } from '../../../config/database';
import { hashPassword, comparePassword } from '../../../utils/password.util';
import { generateTokenPair } from '../../../utils/jwt.util';
import { RegisterDTO } from '../dto/register.dto';
import { LoginDTO } from '../dto/login.dto';
import { AppErrorClass } from '../../../middleware/error.middleware';

export class AuthService {
  async register(data: RegisterDTO) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppErrorClass('User with this email already exists', 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    // Generate tokens
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
    });

    return {
      user,
      ...tokens,
    };
  }

  async login(data: LoginDTO) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppErrorClass('Invalid credentials', 401);
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new AppErrorClass('Invalid credentials', 401);
    }

    // Generate tokens
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    // In a real app, you'd verify the refresh token from database
    // For now, we'll just generate new tokens
    const { verifyRefreshToken, generateTokenPair } = require('../../../utils/jwt.util');
    
    const payload = verifyRefreshToken(refreshToken);
    const tokens = generateTokenPair(payload);

    return tokens;
  }
}

export const authService = new AuthService();
