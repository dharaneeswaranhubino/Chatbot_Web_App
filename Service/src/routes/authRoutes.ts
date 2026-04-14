import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddelware.js";
import { upload } from "../config/multer.js";
import { authLimiter } from "../config/rateLimit.js";
import { loginSchema, refreshSchema, registerSchema } from "../validators/authValidator.js";
import { validate } from "../middleware/validate.js";

const router = Router();
const controller = new AuthController();

router.post("/register", authLimiter,upload.single("profilePicture"), validate(registerSchema), controller.register.bind(controller));
router.post("/login", authLimiter, validate(loginSchema), controller.login.bind(controller));
router.post("/refresh", authLimiter, controller.refresh.bind(controller));
router.post("/logout", authMiddleware, controller.logout.bind(controller));

export default router;
