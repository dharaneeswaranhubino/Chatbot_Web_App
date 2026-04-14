import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import roleRoutes from "./roleRoutes.js";
import permissionRoutes from "./permissionRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import chatRoutes from "./chatRoutes.js";
import userDashboard from "./userDashboardRoutes.js";

const router = Router();

router.use("/v1/auth", authRoutes);
router.use("/v1/user", userRoutes);
router.use("/v1/userDashboard",userDashboard)
router.use("/v1/role", roleRoutes);
router.use("/v1/permission", permissionRoutes);
router.use("/v1/upload", uploadRoutes);
router.use("/v1/chat", chatRoutes);

export default router;