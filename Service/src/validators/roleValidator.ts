import { z } from "zod";

export const createRoleSchema = z.object({
  roleName: z
    .string({ required_error: "roleName is required" })
    .min(2, "roleName must be at least 2 characters")
    .max(30, "roleName must not exceed 30 characters"),
});