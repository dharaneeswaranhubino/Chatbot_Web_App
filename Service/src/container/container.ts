import { AuthService } from "../services/authService.js";
import { UserRepository } from "../repositories/userRepositorie.js";
import { RoleRepository } from "../repositories/roleRepositorie.js";
import { UserRoleRepository } from "../repositories/userRoleRepositorie.js";
import { UploadService } from "../services/uploadService.js";

const userRepo = new UserRepository();
const roleRepo = new RoleRepository();
const userRoleRepo = new UserRoleRepository();
const uploadService = new UploadService();

export const authService = new AuthService(
    userRepo,
    roleRepo,
    userRoleRepo,
    uploadService
)