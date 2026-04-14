import { UserRole } from "../models/userRoleModel.js";
import { User } from "../models/userModel.js";

export class UserRoleRepository {

  async assignRole(userId: number, roleId: number) {
    return await UserRole.create({
      userId,
      roleId,
    });
  }

  async removeRole(userId: number, roleId: number) {
    return await UserRole.destroy({
      where: { userId, roleId },
    });
  }

  async removeAllRoles(userId: number) {
    return await UserRole.destroy({
      where: { userId }
    });
  }

  async findUserRoles(userId: number) {
    return await UserRole.findAll({
      where: { userId },
    });
  }

  async findUsersByRoleId(roleId: number) {
    return await UserRole.findAll({
      where: { roleId },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"]
        }
      ]
    });
  }
}