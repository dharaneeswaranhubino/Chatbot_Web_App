import { json } from "sequelize";
import { redisClient } from "../config/redis.js";
import { User } from "../models/userModel.js";
import { Role } from "../models/roleModel.js";
import { email } from "zod/v4";

export class UserRepository {
  async createUser(data: { name: string; email: string; password: string }) {
    return await User.create(data);
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: { email },
      attributes: ["id", "name", "email", "password", "refreshToken"],
    });
  }

  async findByEmailWithRoles(email: string) {
    return await User.findOne({
      where: { email },
      attributes: ["id", "name", "email", "password", "refreshToken"],
      include: [
        {
          model: Role,
          attributes: ["roleName"],
          through: { attributes: [] },
        },
      ],
    });
  }

  async findById(id: number) {
    const cacheKey = `user:${id}`;

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email"],
    });

    if (user) {
      await redisClient.setEx(cacheKey, 300, JSON.stringify(user));
    }

    return user;
  }



  async clearRefreshToken(userId: number) {
    const user = await User.findByPk(userId);

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    return user;
  }

  async findAll() {
    return await User.findAll({
      attributes: ["id", "name", "email", "createdAt"],
      include: [
        {
          model: Role,
          attributes: ["id", "roleName"],
          through: { attributes: [] }
        }
      ],
      order: [["createdAt", "ASC"]]
    });
  }

  async findByIdWithToken(id: number) {
    return await User.findByPk(id, {
      attributes: ["id", "name", "email", "refreshToken"],
    });
  }

  async update(id: number, data: Partial<{ name: string, email: string, password: string }>) {
    const user = await User.findByPk(id, {
      include: [{
        model: Role,
        attributes: ["roleName"],
        through: { attributes: [] }
      }]
    });

    if (!user) {
      throw new Error("User not found");
    }

    await user.update(data);
    await redisClient.del(`user:${id}`);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.Roles?.map((r: any) => r.roleName) || []
    };
  }

  async deleteById(id: number) {
    await redisClient.del(`user:${id}`);
    return await User.destroy({ where: { id } });
  }
}
