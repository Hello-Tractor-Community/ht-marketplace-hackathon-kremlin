import { z } from "zod";
export const SignUpValidation = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .max(50, "First Name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .max(50, "Last Name must be less than 50 characters"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phoneNumber: z
    .string()
    .regex(
      /^[0-9]{10,15}$/,
      "Phone Number must be between 10 and 15 digits and contain only numbers"
    ),
  role: z
    .enum(["Buyer", "Seller"], {
      required_error: "Role is required",
    })
    .refine((value) => value === "Buyer" || value === "Seller", {
      message: "Invalid selection for Buyer/Seller",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

export const SignInValidation = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character"),
})
