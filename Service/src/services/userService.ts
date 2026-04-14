import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/userRepositorie.js";
import { RoleRepository } from "../repositories/roleRepositorie.js";
import { UserRoleRepository } from "../repositories/userRoleRepositorie.js";
import { PermissionRepository } from "../repositories/permissionRepository.js";
import { ChatMessageRepository } from "../repositories/chatMessageRepository.js";
import { redisClient } from "../config/redis.js";

export class UserService {
  private userRepo: UserRepository;
  private roleRepo: RoleRepository;
  private userRoleRepo: UserRoleRepository;
  private permissionRepo: PermissionRepository;
  private chatMessageRepo: ChatMessageRepository;

  constructor(
    userRepo: UserRepository,
    roleRepo: RoleRepository,
    userRoleRepo: UserRoleRepository,
    permissionRepo: PermissionRepository,
    chatMessageRepo: ChatMessageRepository
  ) {
    this.userRepo = userRepo;
    this.roleRepo = roleRepo;
    this.userRoleRepo = userRoleRepo;
    this.permissionRepo = permissionRepo;
    this.chatMessageRepo = chatMessageRepo;
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const existing = await this.userRepo.findByEmail(data.email);

    if (existing) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await this.userRepo.createUser({
      ...data,
      password: hashedPassword,
    });
  }

  async assignRole(userId: number, roleName: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    const role = await this.roleRepo.findByName(roleName);
    if (!role) throw new Error("Role not found");

    return await this.userRoleRepo.assignRole(user.id, role.id);
  }

  async removeRole(userId: number, roleName: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    const role = await this.roleRepo.findByName(roleName);
    if (!role) throw new Error("Role not found");

    await this.userRoleRepo.removeRole(userId, role.id);

    await redisClient.del(`user:${userId}`);
    await redisClient.del(`permissions:${userId}`);

    return { userId, roleName };
  }

  async getAllUsers() {
    const users = await this.userRepo.findAll();
    const structuredUsers = users.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      role: user.Roles?.map((r: any) => r.roleName) || []
    }));
    return structuredUsers;
  }

  async getDashboardSummary() {
    const [users, roles, permission, totalChatSession] = await Promise.all([
      this.userRepo.findAll(),
      this.roleRepo.findAll(),
      this.permissionRepo.findAll(),
      this.chatMessageRepo.getTotalUniqueUsersWhoChatted()
    ]);

    const structuredUsers = users.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      role: user.Roles?.map((r: any) => r.roleName) || []
    }));

    return { 
      totalUser: users.length, 
      totalRole: roles.length, 
      totalPermission: permission.length, 
      totalChatSession,
      recentUser: structuredUsers.slice(-5).reverse() 
    };
  }

  async updateUser(userId: number, updateData: { name?: string, email?: string, password?: string }) {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await this.userRepo.findByEmail(updateData.email);
      if (existingUser && existingUser.id !== userId) {
        throw new Error("Email already in use");
      }
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await this.userRepo.update(userId, updateData);

    await redisClient.del(`user:${userId}`);
    await redisClient.del(`permissions:${userId}`);

    return updatedUser;
  }

  async deleteUser(targetUserId: number) {
    const user = await this.userRepo.findById(targetUserId);
    if (!user) throw new Error("User not found");
    await this.userRepo.deleteById(targetUserId);
  }
}