import winston from "winston";

const { combine, timestamp, errors, printf } = winston.format;

type LogInfo = winston.Logform.TransformableInfo & {
  body?: {
    password?: string;
    token?: string;
    [key: string]: unknown;
  };
};

const maskSensitive = winston.format((info: winston.Logform.TransformableInfo) => {
  const log = info as LogInfo;

  if (log.body?.password) log.body.password = "***";
  if (log.body?.token) log.body.token = "***";

  return log;
});

const customFormat = printf(({ timestamp, level, message, ...meta }) => {
  const payload =
    Object.keys(meta).length > 0
      ? "\n" + JSON.stringify(meta, null, 2)
      : "";

  return `[${timestamp}] ${level.toUpperCase()}: ${message}${payload}`;
});

export const logger = winston.createLogger({
  level: "info",

  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    maskSensitive(),
    customFormat
  ),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/combined.log" }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});