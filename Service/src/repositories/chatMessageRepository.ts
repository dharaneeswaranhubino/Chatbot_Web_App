import { ChatMessage } from "../models/chatMessageModel.js";
import { Op } from "sequelize";

export class ChatMessageRepository {
  async saveMessage(userId: number, sender: "user" | "bot", message: string) {
    return await ChatMessage.create({
      userId,
      sender,
      message,
    });
  }

  async getMessagesByUser(
    userId: number,
    limit: number = 50,
    offset: number = 0,
  ) {
    return await ChatMessage.findAndCountAll({
      where: { userId },
      order: [["createdAt", "ASC"]],
      limit,
      offset,
    });
  }

  // async searchMessages(userId: number, query: string) {
  //   const cleanQuery = query.trim();

  //   if (cleanQuery.length < 2) {
  //     return [];
  //   }

  //   return await ChatMessage.findAll({
  //     where: {
  //       userId,
  //       message: {
  //         [Op.like]: `%${cleanQuery}%`
  //       }
  //     },
  //     order: [["createdAt", "DESC"]],
  //     limit: 100
  //   });
  // }
  async searchMessages(userId: number, query: string) {
    const cleanQuery = query.trim();
    if (cleanQuery.length < 2) return [];

    const matched = await ChatMessage.findAll({
      where: {
        userId,
        message: { [Op.like]: `%${cleanQuery}%` },
      },
      order: [["createdAt", "ASC"]],
      limit: 100,
    });

    if (matched.length === 0) return [];

    // For each matched user message, fetch the next bot message after it
    const userMatches = matched.filter((m) => m.sender === "user");

    const botReplies = await Promise.all(
      userMatches.map((userMsg) =>
        ChatMessage.findOne({
          where: {
            userId,
            sender: "bot",
            createdAt: { [Op.gt]: userMsg.createdAt },
          },
          order: [["createdAt", "ASC"]],
        }),
      ),
    );

    const validBotReplies = botReplies.filter(Boolean);
    const allMessages = [...matched, ...validBotReplies].filter(
      (m): m is ChatMessage => m !== null,
    );

    const unique = Array.from(
      new Map(allMessages.map((m) => [m.id, m])).values(),
    );

    unique.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    return unique;
  }

  async getTotalMessageCount(userId: number) {
    return await ChatMessage.count({
      where: { userId },
    });
  }

  async getTotalUniqueUsersWhoChatted() {
    return await ChatMessage.count({
      distinct: true,
      col: "userId",
      where: { sender: "user" },
    });
  }

  //for userDashboard
  async getMessagesByDateRange(userId: number, startDate: Date, endDate: Date) {
    return await ChatMessage.findAll({
      where: {
        userId,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [["createdAt", "ASC"]],
    });
  }

  async getRecentMessages(userId: number, limit: number = 10) {
    return await ChatMessage.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit,
    });
  }

  async getWeeklyActivity(userId: number) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const messages = await ChatMessage.findAll({
      where: {
        userId,
        createdAt: {
          [Op.gte]: sevenDaysAgo,
        },
      },
      attributes: ["createdAt", "sender"],
      order: [["createdAt", "ASC"]],
    });

    return messages;
  }
}
