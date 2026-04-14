import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database.js";

interface PermissionAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, "id"> { }

export class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes {
  declare id: number;
  declare name: string;
  declare description: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "Permissions",
    timestamps: true,
  }
);