import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddelware.js";
import { permissionMiddleware } from "../middleware/permissionMiddleware.js";
import { validate } from "../middleware/validate.js";
import { assignRoleSchema, createUserSchema, updateUserSchema } from "../validators/userValidator.js";

const router = Router();
const controller = new UserController();

router.post(
  "/create-user",
  authMiddleware,
  permissionMiddleware("create:user"),
  validate(createUserSchema),
  controller.createUser,
);

router.post(
  "/assign-role",
  authMiddleware,
  permissionMiddleware("assign:role"),
  validate(assignRoleSchema),
  controller.assignRole,
);

router.delete(
  "/remove-role",
  authMiddleware,
  permissionMiddleware("assign:role"),
  validate(assignRoleSchema),
  controller.removeRole.bind(controller),
);

router.get(
  "/all-users",
  authMiddleware,
  permissionMiddleware("view:user"),
  controller.getAllUsers,
);

router.get(
  "/dashboard-summary",
  authMiddleware,
  permissionMiddleware("view:user"),
  controller.getDashboardSummary,
)

router.put(
  "/users/:id",
  authMiddleware,
  permissionMiddleware("edit:user"),
  validate(updateUserSchema),
  controller.updateUser.bind(controller),
)

router.delete(
  "/users/:id",
  authMiddleware,
  permissionMiddleware("delete:user"),
  controller.deleteUser.bind(controller),
);


export default router;
