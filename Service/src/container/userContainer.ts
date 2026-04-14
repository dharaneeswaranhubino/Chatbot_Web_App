import { UserService } from "../services/userService.js";
import { UserRepository } from "../repositories/userRepositorie.js";
import { RoleRepository } from "../repositories/roleRepositorie.js";
import { UserRoleRepository } from "../repositories/userRoleRepositorie.js";
import { PermissionRepository } from "../repositories/permissionRepository.js";
import { ChatMessageRepository } from "../repositories/chatMessageRepository.js";

const userRepo = new UserRepository();
const roleRepo = new RoleRepository();
const userRoleRepo = new UserRoleRepository();
const permissionRepo = new PermissionRepository();
const chatMessageRepo = new ChatMessageRepository();

export const userService = new UserService(
  userRepo,
  roleRepo,
  userRoleRepo,
  permissionRepo,
  chatMessageRepo
);