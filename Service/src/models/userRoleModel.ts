import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database.js";
import type { Role } from "./roleModel.js";

interface UserRoleAttributes {
  id: number;
  userId: number;
  roleId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserRoleCreationAttributes
  extends Optional<UserRoleAttributes, "id"> {}

export class UserRole
  extends Model<UserRoleAttributes, UserRoleCreationAttributes>
  implements UserRoleAttributes {
  declare id: number;
  declare userId: number;
  declare roleId: number;
  declare role?: Role;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserRole",
    tableName: "UserRoles",
    timestamps: true,
  }
);