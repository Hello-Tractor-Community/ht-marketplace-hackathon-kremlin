import { z } from "zod";

// const UserRole = z.enum(["Buyer", "Seller"]);
// type UserRole = z.infer<typeof UserRole>;
export const SignUpValidation = z.object({
  username: z
    .string()
    .min(1, "First Name is required")
    .max(50, "First Name must be less than 50 characters"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  role: z.string(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

export const SignInValidation = z.object({
  // email: z.string().email("Invalid email address").min(1, "Email is required"),
  username: z
    .string()
    .min(1, "First Name is required")
    .max(50, "First Name must be less than 50 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});
