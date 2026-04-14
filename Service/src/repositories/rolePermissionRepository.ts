import { RolePermission } from "../models/rolePermissionModel.js";

export class RolePermissionRepository {
  
  async removeAllPermissionsFromRole(roleId: number) {
    return await RolePermission.destroy({
      where: { roleId }
    });
  }
  
  async findPermissionsByRoleId(roleId: number) {
    return await RolePermission.findAll({
      where: { roleId }
    });
  }
}