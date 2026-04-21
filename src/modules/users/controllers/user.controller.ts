import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { sendSuccess } from '../../../utils/response.util';
import { updateUserSchema } from '../dto/update-user.dto';

export class UserController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const user = await userService.getUserById(userId);
      
      return sendSuccess(res, user, 'User profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const validated = updateUserSchema.parse(req.body);
      const user = await userService.updateUser(userId, validated);
      
      return sendSuccess(res, user, 'User profile updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const result = await userService.deleteUser(userId);
      
      return sendSuccess(res, result, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const stats = await userService.getUserStats(userId);
      
      return sendSuccess(res, stats, 'User stats retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
