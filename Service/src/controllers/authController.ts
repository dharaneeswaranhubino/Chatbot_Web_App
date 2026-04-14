import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddelware.js";
import { authService } from "../container/container.js";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.register(req.body, req.file);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (err: unknown) {
      next(err);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      const result = await authService.login(email, password);
      const { user, accessToken, refreshToken } = result;

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: { user, accessToken },
      });
    } catch (err: unknown) {
      const error = err as Error;
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken as string | undefined;

      if (!refreshToken) {
        res.status(401).json({
          success: false,
          message: "No refresh token",
        });
        return;
      }

      const token = await authService.refreshToken(refreshToken);

      res.cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        data: { accessToken: token.accessToken, user: token.user },
      });
    } catch (err: unknown) {
      const error = err as Error;
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  async logout(req: AuthRequest, res: Response) {
    try {
      await authService.logout(req.user!.id);

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (err: unknown) {
      const error = err as Error;
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
