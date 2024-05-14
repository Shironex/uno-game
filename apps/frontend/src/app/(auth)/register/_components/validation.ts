import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  name: z.string().min(3, "Name is too short.").max(16, "Name is too long."),
  password: z
    .string()
    .min(8, "Password is too short.")
    .max(32, "Password can be at most 32 characters long."),
});

export const verifyEmailSchema = z.object({
  code: z.string().length(8, "Please enter a valid code"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
