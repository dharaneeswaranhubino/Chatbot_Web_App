import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const assignRoleSchema = z.object({
  userId: z
    .number({ required_error: "userId is required" })
    .int("userId must be an integer")
    .positive("userId must be positive"),

  roleName: z
    .string({ required_error: "roleName is required" })
    .min(1, "roleName is required"),
});
export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .optional(),
  
  email: z
    .string()
    .email("Invalid email format")
    .optional(),
  
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});
