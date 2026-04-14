import { Router } from "express";
import { PermissionController } from "../controllers/permissionController.js";
import { authMiddleware } from "../middleware/authMiddelware.js";
import { permissionMiddleware } from "../middleware/permissionMiddleware.js";
import { validate } from "../middleware/validate.js";
import { assignPermissionSchema } from "../validators/permissionValidator.js";

const router = Router();
const controller = new PermissionController();

router.get(
  "/all",
  authMiddleware,
  permissionMiddleware("view:role"),
  controller.getAllPermissions,
);

router.get(
  "/role/:roleId",
  authMiddleware,
  permissionMiddleware("view:role"),
  controller.getRolePermissions,
);

router.post(
  "/assign",
  authMiddleware,
  permissionMiddleware("edit:role"),
  validate(assignPermissionSchema),
  controller.assignPermission,
);

router.delete(
  "/remove",
  authMiddleware,
  permissionMiddleware("edit:role"),
  validate(assignPermissionSchema),
  controller.removePermission,
);

export default router;