import { Router } from "express";
import { RoleController } from "../controllers/roleController.js";
import { authMiddleware } from "../middleware/authMiddelware.js";
import { permissionMiddleware } from "../middleware/permissionMiddleware.js";
import { validate } from "../middleware/validate.js";
import { createRoleSchema } from "../validators/roleValidator.js";

const router = Router();
const controller = new RoleController();

router.post(
  "/create-role",
  authMiddleware,
  permissionMiddleware("create:role"),
  validate(createRoleSchema),
  controller.createRole,
);
router.get(
  "/all-roles",
  authMiddleware,
  permissionMiddleware("view:role"),
  controller.getAllRoles,
);

router.delete(
  "/  /:id",
  authMiddleware,
  permissionMiddleware("delete:role"),
  controller.deleteRole.bind(controller),
);

export default router;
