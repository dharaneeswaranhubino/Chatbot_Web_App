import { User } from "../models/userModel.js";

export class UploadRepository {
  async updateProfilePicture(userId: number, filePath: string) {
    const [affectedRows] = await User.update(
      { profilePicture: filePath },
      { where: { id: userId } },
    );

    if (affectedRows === 0) {
      throw new Error("User not found or profile picture not updated");
    }

    return await User.findByPk(userId, {
      attributes: ["id", "name", "email", "profilePicture"],
    });
  }

  async getProfilePicture(userId: number) {
    return await User.findByPk(userId, {
      attributes: ["id", "profilePicture"],
    });
  }
}