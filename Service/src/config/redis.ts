import { createClient } from "redis";
import { env } from "./env.js";
import { logger } from "./logger.js";

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on("error", (err) => logger.error(`Redis error: ${err}`));
redisClient.on("connect", () => logger.info("Redis connected successfully!"));

export const connectRedis = async () => {
  await redisClient.connect();
};