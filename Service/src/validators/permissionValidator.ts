import { z } from "zod";

export const assignPermissionSchema = z.object({
  roleId: z
    .number({ required_error: "roleId is required" })
    .int("roleId must be an integer")
    .positive("roleId must be positive"),

  permissionName: z
    .string({ required_error: "permissionName is required" })
    .min(1, "permissionName is required"),
});