import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./authMiddelware.js";
import { UserRole } from "../models/userRoleModel.js";
import { Role } from "../models/roleModel.js";
import { RolePermission } from "../models/rolePermissionModel.js";
import { Permission } from "../models/permissionModel.js";
import { redisClient } from "../config/redis.js";

export const permissionMiddleware = (requiredPermission: string) =>
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const cacheKey = `permissions:${userId}`;
      const cached = await redisClient.get(cacheKey);

      let userPermissions: string[] = [];

      if (cached) {
        userPermissions = JSON.parse(cached);
      } else {
        const userRoles = await UserRole.findAll({
          where: { userId },
          include: [
            {
              model: Role,
              include: [
                {
                  model: RolePermission,
                  include: [
                    {
                      model: Permission,
                      required: false,
                    },
                  ],
                },
              ],
            },
          ],
        });

        userPermissions = userRoles.flatMap((userRole: any) => {
          const rolePermissions = userRole.Role?.RolePermissions ?? [];
          return rolePermissions
            .map((rp: any) => rp.Permission?.name)
            .filter(Boolean);
        });

        await redisClient.setEx(cacheKey, 300, JSON.stringify(userPermissions));
      }
      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required permission: ${requiredPermission}`,
        });
      }

      next();
    } catch (err) {
      console.error("permissionMiddleware error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  };
