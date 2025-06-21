import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  age: z
    .string()
    .min(1, "Age is required")
    .regex(/^\d+$/, "Age must be a number")
    .refine((val) => parseInt(val) >= 13, "You must be at least 13 years old")
    .refine((val) => parseInt(val) <= 120, "Please enter a valid age"),

  addressLine1: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be less than 100 characters"),

  addressLine2: z
    .string()
    .max(100, "Address must be less than 100 characters")
    .optional(),

  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid 5-digit zip code"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),

  emergencyContact: z
    .string()
    .min(2, "Emergency contact name must be at least 2 characters")
    .max(50, "Emergency contact name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  emergencyPhone: z
    .string()
    .min(10, "Emergency phone number must be at least 10 digits")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),

  skills: z.array(z.string()).min(1, "Please select at least one skill"),

  interests: z
    .array(z.string())
    .min(1, "Please select at least one area of interest"),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

// Helper function to validate individual fields
export const validateField = (field: keyof OnboardingFormData, value: any) => {
  try {
    onboardingSchema.shape[field].parse(value);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: "Invalid field" };
  }
};

