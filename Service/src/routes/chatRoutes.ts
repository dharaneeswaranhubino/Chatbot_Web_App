import { Router } from "express";
import { ChatController } from "../controllers/chatController.js";
import { authMiddleware } from "../middleware/authMiddelware.js";
import { validate } from "../middleware/validate.js";
import {
  sendMessageSchema,
} from "../validators/chatValidator.js";

const router = Router();
const controller = new ChatController();

router.post(
  "/send",
  authMiddleware,
  validate(sendMessageSchema),
  controller.sendMessage.bind(controller),
);

router.get(
  "/messages",
  authMiddleware,
  controller.getMessages.bind(controller),
);

router.get(
  "/search",
  authMiddleware,
  controller.searchMessages.bind(controller),
);


export default router;
