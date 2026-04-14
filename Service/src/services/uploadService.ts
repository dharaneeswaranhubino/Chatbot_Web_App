import fs from "fs";
import path from "path";
import { UploadRepository } from "../repositories/uploadRepository.js";

const uploadRepo = new UploadRepository();

export class UploadService {
  // Called both during register (optional) and from upload endpoint (explicit)
  async saveProfilePicture(file: Express.Multer.File, userId: number) {
    const filePath = `uploads/profile/${file.filename}`;

    const updatedUser = await uploadRepo.updateProfilePicture(userId, filePath);

    return {
      filename: file.filename,
      path: filePath,
      size: file.size,
      mimetype: file.mimetype,
      user: updatedUser,
    };
  }

  // Delete old profile picture from disk before replacing
  async deleteOldPicture(userId: number) {
    const record = await uploadRepo.getProfilePicture(userId);

    if (record?.profilePicture) {
      const absolutePath = path.resolve(record.profilePicture);

      // Only delete if file actually exists — no crash if missing
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    }
  }
}