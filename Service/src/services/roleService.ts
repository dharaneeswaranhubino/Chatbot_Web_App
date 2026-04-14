import { RoleRepository } from "../repositories/roleRepositorie.js";
import { UserRoleRepository } from "../repositories/userRoleRepositorie.js";
import { RolePermissionRepository } from "../repositories/rolePermissionRepository.js";

const roleRepo = new RoleRepository();
const userRoleRepo = new UserRoleRepository();
const rolePermissionRepo = new RolePermissionRepository();

export class RoleService {

  async createRole(roleName: string) {
    const existing = await roleRepo.findByName(roleName);

    if (existing) {
      throw new Error("Role already exists");
    }

    return await roleRepo.createRole(roleName);
  }

  async getAllRoles() {
    return await roleRepo.findAll();
  }

  async deleteRole(roleId: number) {
    const role = await roleRepo.findById(roleId);
    if (!role) {
      throw new Error("Role not found");
    }

    if (role.roleName === "admin") {
      throw new Error("Cannot delete admin role");
    }

    const usersWithRole = await userRoleRepo.findUsersByRoleId(roleId);
    if (usersWithRole.length > 0) {
      throw new Error(`Cannot delete role because it is assigned to ${usersWithRole.length} user(s)`);
    }

    await rolePermissionRepo.removeAllPermissionsFromRole(roleId);
    await roleRepo.deleteById(roleId);

    return { success: true };
  }
}