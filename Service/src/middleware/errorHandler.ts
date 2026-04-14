import type { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${req.method} ${req.url} - ${err.message}`);

    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
            success: false,
            message: "File too large. Max size is 2MB",
        });
    }

    if (err.message?.includes("Only jpeg")) {
        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }

    if (err.name === "JsonWebTokenError") {
        return res.status(400).json({
            success: false,
            message: "Invalid token"
        });
    }

    if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
            success: false,
            message: "Already exists",
        });
    }

    return res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error",
    });
};

