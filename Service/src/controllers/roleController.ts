import type { Request, Response } from "express";
import { RoleService } from "../services/roleService.js";

const roleService = new RoleService();

export class RoleController {
  async createRole(req: Request, res: Response) {
    try {
      const { roleName } = req.body;

      const role = await roleService.createRole(roleName);

      res.status(201).json({
        success: true,
        message: "Role created successfully",
        data: role,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await roleService.getAllRoles();

      res.status(200).json({
        success: true,
        data: roles,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteRole(req: Request, res: Response) {
    try {
      const roleId = Number(req.params.id);
      await roleService.deleteRole(roleId);

      res.status(200).json({
        success: true,
        message: "Role deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
