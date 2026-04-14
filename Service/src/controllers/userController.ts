import type { Request, Response } from "express";
import { userService } from "../container/userContainer.js";

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async assignRole(req: Request, res: Response) {
    try {
      const { userId, roleName } = req.body;

      await userService.assignRole(userId, roleName);

      res.status(200).json({
        success: true,
        message: "Role assigned successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async removeRole(req: Request, res: Response) {
    try {
      const { userId, roleName } = req.body;
      await userService.removeRole(userId, roleName);

      res.status(200).json({
        success: true,
        message: "Role removed successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getDashboardSummary(req: Request, res: Response) {
    try {
      const data = await userService.getDashboardSummary();
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const updateData = req.body;
      const updatedUser = await userService.updateUser(userId, updateData);

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const targetUserId = Number(req.params.id);
      await userService.deleteUser(targetUserId);
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      res.status(403).json({
        success: false,
        message: error.message,
      });
    }
  }
}