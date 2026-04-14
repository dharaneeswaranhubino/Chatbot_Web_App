import { PermissionRepository } from "../repositories/permissionRepository.js";
import { RoleRepository } from "../repositories/roleRepositorie.js";

const permissionRepo = new PermissionRepository();
const roleRepo = new RoleRepository();

export class PermissionService {

  async getAllPermissions() {
    return await permissionRepo.findAll();
  }

  async getRolePermissions(roleId: number) {
    const role = await roleRepo.findById(roleId);
    if (!role) throw new Error("Role not found");

    return await permissionRepo.findPermissionsByRoleId(roleId);
  }

  async assignPermissionToRole(roleId: number, permissionName: string) {
    const role = await roleRepo.findById(roleId);
    if (!role) throw new Error("Role not found");

    const permission = await permissionRepo.findByName(permissionName);
    if (!permission) throw new Error("Permission not found");

    const existing = await permissionRepo.findPermissionsByRoleId(roleId);
    const alreadyAssigned = existing.some(
      (rp: any) => rp.Permission?.name === permissionName
    );
    if (alreadyAssigned) throw new Error("Permission already assigned to this role");

    return await permissionRepo.assignPermissionToRole(role.id, permission.id);
  }

  async removePermissionFromRole(roleId: number, permissionName: string) {
    const role = await roleRepo.findById(roleId);
    if (!role) throw new Error("Role not found");

    const permission = await permissionRepo.findByName(permissionName);
    if (!permission) throw new Error("Permission not found");

    return await permissionRepo.removePermissionFromRole(role.id, permission.id);
  }
}