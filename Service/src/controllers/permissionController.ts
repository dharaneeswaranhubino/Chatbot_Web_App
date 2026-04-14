import type { Request, Response } from "express";
import { PermissionService } from "../services/permissionService.js";

const permissionService = new PermissionService();

export class PermissionController {

  async getAllPermissions(req: Request, res: Response) {
    try {
      const permissions = await permissionService.getAllPermissions();
      res.status(200).json({
        success: true,
        data: permissions,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getRolePermissions(req: Request, res: Response) {
    try {
      const roleId = Number(req.params.roleId);
      const permissions = await permissionService.getRolePermissions(roleId);
      res.status(200).json({
        success: true,
        data: permissions,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async assignPermission(req: Request, res: Response) {
    try {
      const { roleId, permissionName } = req.body;
      await permissionService.assignPermissionToRole(roleId, permissionName);
      res.status(200).json({
        success: true,
        message: `Permission "${permissionName}" assigned to role ${roleId} successfully`,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async removePermission(req: Request, res: Response) {
    try {
      const { roleId, permissionName } = req.body;
      await permissionService.removePermissionFromRole(roleId, permissionName);
      res.status(200).json({
        success: true,
        message: `Permission "${permissionName}" removed from role successfully`,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}