import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddelware.js";
import { chatService } from "../container/chatContainer.js";

export class ChatController {
  async sendMessage(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { message } = req.body;

      const result = await chatService.sendMessage(userId, message);

      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getMessages(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const limit = Number(req.query.limit) || 50;
      const offset = Number(req.query.offset) || 0;

      const result = await chatService.getMessages(userId, limit, offset);

      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async searchMessages(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const query = req.query.q as string;

      if (!query || query.length < 2) {
        return res.status(400).json({
          success: false,
          message: "Search query must be at least 2 characters",
        });
      }

      const messages = await chatService.searchMessages(userId, query);

      res.status(200).json({ success: true, data: messages });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getLatestOffset(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const limit = Number(req.query.limit) || 50;

      const result = await chatService.getLatestOffset(userId, limit);

      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}