import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepositorie.js";
import { RoleRepository } from "../repositories/roleRepositorie.js";
import { UserRoleRepository } from "../repositories/userRoleRepositorie.js";
import { UploadService } from "./uploadService.js";
import { env } from "../config/env.js";
import { redisClient } from "../config/redis.js";

interface JwtPayload {
  id: number;
}

export class AuthService {

  constructor(
    private userRepo: UserRepository,
    private roleRepo: RoleRepository,
    private userRoleRepo: UserRoleRepository,
    private uploadService: UploadService
  ) { }

  async register(
    data: { name: string; email: string; password: string },
    file?: Express.Multer.File,
  ) {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepo.createUser({
      ...data,
      password: hashedPassword,
    });

    const role = await this.roleRepo.findByName("user");
    if (!role) {
      throw new Error("Default role not found");
    }
    await this.userRoleRepo.assignRole(user.id, role.id);

    if (file) {
      await this.uploadService.saveProfilePicture(file, user.id);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profilePicture: file ? `uploads/profile/${file.filename}` : null,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmailWithRoles(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const accessToken = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id: user.id }, env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    user.refreshToken = refreshToken;
    await user.save();

    const roles = user.Roles?.map((role: any) => role.roleName) || [];

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        roles,
      },
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(oldRefreshToken: string) {
    if (!oldRefreshToken) {
      throw new Error("No refresh token");
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(oldRefreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;
    } catch (err) {
      throw new Error("Invalid refresh token");
    }

    const user = await this.userRepo.findByIdWithToken(decoded.id);
    if (!user || user.refreshToken !== oldRefreshToken) {
      throw new Error("Unauthorized");
    }

    const userWithRoles = await this.userRepo.findByEmailWithRoles(user.email);

    const newAccessToken = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const newRefreshToken = jwt.sign({ id: user.id }, env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    user.refreshToken = newRefreshToken;
    user.save();

    await redisClient.del(`user:${user.id}`);

    return {
      accessToken: newAccessToken, refreshToken: newRefreshToken, user: {
        id: userWithRoles?.id,
        name: userWithRoles?.name,
        email: userWithRoles?.email,
        profilePicture: userWithRoles?.profilePicture,
        roles: userWithRoles?.Roles?.map((role: any) => role.roleName) || []
      }
    };
  }

  async logout(userId: number) {
    await this.userRepo.clearRefreshToken(userId);
    await redisClient.del(`user:${userId}`);
  }
}