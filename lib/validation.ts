import { z } from "zod";

export const emailSchema = z.string().trim().email().max(254);

export const calculatorLeadSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  companyName: z.string().trim().min(1).max(160),
  email: emailSchema,
  annualRevenue: z.string().trim().min(1).max(80),
  profitMargin: z.string().trim().min(1).max(30),
  industry: z.string().trim().min(1).max(100),
  estimatedGain: z.number().int().nonnegative(),
  integrateFastFee: z.number().int().nonnegative(),
  clientNetGain: z.number().int().nonnegative(),
});

export const auditIntakeSchema = z.object({
  companyName: z.string().trim().min(1).max(160),
  industry: z.string().trim().min(1).max(100),
  annualRevenue: z.string().trim().min(1).max(80),
  employees: z.string().trim().min(1).max(50),
  contactName: z.string().trim().min(1).max(120),
  contactEmail: emailSchema,
  contactPhone: z.string().trim().max(40).optional().or(z.literal("")),
});

export const chatMessageSchema = z.object({
  visitorId: z.string().trim().min(1).max(120),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(4000),
      }),
    )
    .min(1)
    .max(20),
});
