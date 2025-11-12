import { z } from "zod";

// Step 1: Contact Information
export const contactInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
});

// Step 2: Product Interests
export const productInterestsSchema = z.object({
  productCategories: z.array(z.string()).min(1, "Please select at least one product category"),
  volume: z.string().optional(),
  weavePreference: z.string().optional(),
  customRequirements: z.string().optional(),
});

// Step 3: Requirements
export const requirementsSchema = z.object({
  certificationRequirements: z.array(z.string()).optional(),
  logisticsTimeline: z.string().optional(),
  facilityPreference: z.string().optional(),
  targetMarket: z.string().optional(),
});

// Step 4: Additional Information
export const additionalInfoSchema = z.object({
  message: z.string().min(10, "Message must be at least 10 characters"),
  preferredContactMethod: z.string().optional(),
  hearAboutUs: z.string().optional(),
});

// Complete Lead Form Schema
export const leadFormSchema = contactInfoSchema
  .merge(productInterestsSchema)
  .merge(requirementsSchema)
  .merge(additionalInfoSchema)
  .extend({
    source: z.string().optional(),
    referrer: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;
export type ProductInterestsFormData = z.infer<typeof productInterestsSchema>;
export type RequirementsFormData = z.infer<typeof requirementsSchema>;
export type AdditionalInfoFormData = z.infer<typeof additionalInfoSchema>;
export type LeadFormData = z.infer<typeof leadFormSchema>;

