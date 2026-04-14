import { ChatbotService } from "../services/chatbotService.js";
import { ChatMessageRepository } from "../repositories/chatMessageRepository.js";

const chatMessageRepo = new ChatMessageRepository();    //is for create dependencies

export const chatService = new ChatbotService(      //is for Inject dependencies
    chatMessageRepo
); 