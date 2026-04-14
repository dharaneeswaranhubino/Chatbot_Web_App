import { Permission } from "../models/permissionModel.js";
import { RolePermission } from "../models/rolePermissionModel.js";
import { Role } from "../models/roleModel.js";

export class PermissionRepository {

  async findAll() {
    return await Permission.findAll();
  }

  async findByName(name: string) {
    return await Permission.findOne({ where: { name } });
  }

  async findById(id: number) {
    return await Permission.findByPk(id);
  }

  async findPermissionsByRoleId(roleId: number) {
    return await RolePermission.findAll({
      where: { roleId },
      include: [{ model: Permission, attributes: ["id", "name", "description"] }],
    });
  }

  async assignPermissionToRole(roleId: number, permissionId: number) {
    return await RolePermission.create({ roleId, permissionId });
  }

  async removePermissionFromRole(roleId: number, permissionId: number) {
    return await RolePermission.destroy({ where: { roleId, permissionId } });
  }
}