import { ChatMessageRepository } from "../repositories/chatMessageRepository.js";
import {
  chatbotRules,
  defaultResponses,
  type Rule,
} from "../ChatRuleData/chatbotRules.js";

export class ChatbotService {
  private rules: Record<string, Rule> = chatbotRules;
  private defaultResponses: string[] = defaultResponses;

  constructor(private chatMessageRepo: ChatMessageRepository) {}

  private getResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase().trim();

    for (const category of Object.values(this.rules)) {
      for (const pattern of category.patterns) {
        if (lowerMessage.includes(pattern)) {
          if (category.responses.length === 0) break;
          const randomIndex = Math.floor(
            Math.random() * category.responses.length,
          );
          const response = category.responses[randomIndex];
          if (response) return response;
        }
      }
    }

    const randomIndex = Math.floor(
      Math.random() * this.defaultResponses.length,
    );
    return this.defaultResponses[randomIndex] || "I'm here to help!";
  }

  private async getResponseWithDelay(
    message: string,
    delayMs: number = 800,
  ): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.getResponse(message)), delayMs);
    });
  }

  async sendMessage(userId: number, message: string) {
    const userMessage = await this.chatMessageRepo.saveMessage(
      userId,
      "user",
      message,
    );

    const botResponseText = await this.getResponseWithDelay(message, 800);

    const botMessage = await this.chatMessageRepo.saveMessage(
      userId,
      "bot",
      botResponseText,
    );

    return { userMessage, botMessage };
  }

  async getMessages(userId: number, limit: number, offset: number) {
    const { rows: messages, count: total } =
      await this.chatMessageRepo.getMessagesByUser(userId, limit, offset);
    return { messages, total, hasMore: offset + limit < total };
  }

  async searchMessages(userId: number, query: string) {
    // console.log(`Searching for: "${query}" for user: ${userId}`);
    const results = await this.chatMessageRepo.searchMessages(userId, query);
    // console.log(`Found ${results.length} results`);
    return results;
  }

  async getLatestOffset(userId: number, limit: number) {
    const total = await this.chatMessageRepo.getTotalMessageCount(userId);
    const latestOffset = Math.max(0, Math.ceil(total / limit) - 1) * limit;
    return { offset: latestOffset, total, limit };
  }
}