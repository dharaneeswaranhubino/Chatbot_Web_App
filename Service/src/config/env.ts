import dotenv from "dotenv";
dotenv.config();

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || defaultValue || "";
};

export const env = {
  PORT: Number(getEnv("PORT", "5000")),
  DB_HOST: getEnv("DB_HOST", "127.0.0.1"),
  DB_PORT: Number(getEnv("DB_PORT", "3306")),
  DB_NAME: getEnv("DB_NAME"),
  DB_USER: getEnv("DB_USER"),
  DB_PASSWORD: getEnv("DB_PASSWORD"),
  DB_DIALECT: getEnv("DB_DIALECT", "mysql") as "mysql",
  NODE_ENV: getEnv("NODE_ENV", "development"),
  JWT_SECRET:getEnv("JWT_SECRET") as string,
  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET") as string,
  REDIS_URL: getEnv("REDIS_URL", "redis://localhost:6379"),
};
