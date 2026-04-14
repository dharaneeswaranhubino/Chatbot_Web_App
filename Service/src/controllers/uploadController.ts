import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddelware.js";
import { UploadService } from "../services/uploadService.js";

const uploadService = new UploadService();

export class UploadController {
  async uploadProfilePicture(req: AuthRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      await uploadService.deleteOldPicture(req.user!.id);

      const result = await uploadService.saveProfilePicture(
        req.file,
        req.user!.id,
      );

      return res.status(200).json({
        success: true,
        message: "Profile picture uploaded successfully",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}