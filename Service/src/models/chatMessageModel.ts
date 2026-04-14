import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database.js";

interface ChatMessageAttributes {
  id: number;
  userId: number;
  sender: "user" | "bot";
  message: string;
  createdAt?: Date;
}

interface ChatMessageCreationAttributes
  extends Optional<ChatMessageAttributes, "id"> {}

export class ChatMessage
  extends Model<ChatMessageAttributes, ChatMessageCreationAttributes>
  implements ChatMessageAttributes
{
  declare id: number;
  declare userId: number;
  declare sender: "user" | "bot";
  declare message: string;

  declare readonly createdAt: Date;
}

ChatMessage.init(
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
    sender: {
      type: DataTypes.ENUM("user", "bot"),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ChatMessage",
    tableName: "ChatMessages",
    timestamps: true,
    updatedAt: false,
  }
);