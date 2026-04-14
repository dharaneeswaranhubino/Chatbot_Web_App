import { Router } from "express";
import { UploadController } from "../controllers/uploadController.js";
import { authMiddleware } from "../middleware/authMiddelware.js";
import { upload } from "../config/multer.js";

const router = Router();
const controller = new UploadController();

router.post(
  "/profile-picture",
  authMiddleware,
  upload.single("profilePicture"),
  controller.uploadProfilePicture.bind(controller),
);

export default router;