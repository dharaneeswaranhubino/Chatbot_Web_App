import {z} from "zod"

export const registerSchema = z.object({
    name:z
        .string({required_error:"Name is required"})
        .min(2, "name must be atleast 2 characters")
        .max(50, "name must not exceed 50 characters"),
    email:z
        .string({required_error:"Email is required"})
        .email("Invalid email format"),
    password:z
        .string({required_error:"Password is required"})
        .min(6, "Password must atleast 6 characters")
})

export const loginSchema = z.object({
    email:z
        .string({required_error:"Email is required"})
        .email("Email is required"),
    password:z
        .string({required_error:"Password is required"})
        .min(1, "Password is required")
});

export const refreshSchema = z.object({}).strip();
