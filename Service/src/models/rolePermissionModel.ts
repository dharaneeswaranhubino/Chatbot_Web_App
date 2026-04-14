import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database.js";

interface RolePermissionAttributes {
  id: number;
  roleId: number;
  permissionId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RolePermissionCreationAttributes
  extends Optional<RolePermissionAttributes, "id"> {}

export class RolePermission
  extends Model<RolePermissionAttributes, RolePermissionCreationAttributes>
  implements RolePermissionAttributes
{
  declare id: number;
  declare roleId: number;
  declare permissionId: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

RolePermission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "RolePermission",
    tableName: "RolePermissions",
    timestamps: true,
  }
);