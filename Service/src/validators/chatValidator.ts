import { z } from "zod";

export const sendMessageSchema = z.object({
  message: z
    .string({ required_error: "Message is required" })
    .min(1, "Message cannot be empty")
    .max(2000, "Message too long (max 2000 characters)"),
});

export const searchMessagesSchema = z.object({
  q: z.string().min(1, "Search query is required"),
});