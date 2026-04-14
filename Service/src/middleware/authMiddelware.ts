import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.js";
import { UserRepository } from "../repositories/userRepositorie.js";

const userRepo = new UserRepository();

export interface AuthRequest extends Request {
  user?: { id: number };
}

export const authMiddleware = async (
  req: AuthRequest, 
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    const user = await userRepo.findById(decoded.id as number);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { id: user.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};