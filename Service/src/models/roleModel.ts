import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database.js";

interface RoleAttributes {
  id: number;
  roleName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> { }

export class Role extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes {
  declare id: number;
  declare roleName: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "Roles",
    timestamps: true,
  }
);