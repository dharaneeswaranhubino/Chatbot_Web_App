import { Router } from "express";
import { UserDashboardController } from "../controllers/userDashboardController.js";
import { authMiddleware } from "../middleware/authMiddelware.js";

const router = Router();
const controller = new UserDashboardController();

router.get(
  "/user_dashboard",
  authMiddleware,
  controller.getDashboard.bind(controller)
);

export default router;