import { ChatMessageRepository } from "../repositories/chatMessageRepository.js";
import { UserDashboardService } from "../services/userDashboardService.js";

const chatMessageRepo = new ChatMessageRepository();
export const userDashboardService = new UserDashboardService(chatMessageRepo);