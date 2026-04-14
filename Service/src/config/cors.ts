import type { CorsOptions } from "cors";

export const corsOption: CorsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  credentials: true,
  exposedHeaders: ["Set-Cookie"],
  optionsSuccessStatus: 200,
};
