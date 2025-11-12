"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  contactInfoSchema,
  productInterestsSchema,
  requirementsSchema,
  additionalInfoSchema,
  type ContactInfoFormData,
  type ProductInterestsFormData,
  type RequirementsFormData,
  type AdditionalInfoFormData,
  type LeadFormData,
} from "@/lib/validations/lead";
import { COMPANY_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { trackFormSubmission, trackFormStep } from "@/lib/analytics";

interface RFQFormProps {
  onSuccess?: () => void;
  source?: string;
  referrer?: string;
}

export function RFQForm({ onSuccess, source = "web", referrer }: RFQFormProps) {
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  // Step 1: Contact Information
  const contactForm = useForm<ContactInfoFormData>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  // Step 2: Product Interests
  const productForm = useForm<ProductInterestsFormData>({
    resolver: zodResolver(productInterestsSchema),
    defaultValues: {
      productCategories: [],
      volume: "",
      weavePreference: "",
      customRequirements: "",
    },
  });

  // Step 3: Requirements
  const requirementsForm = useForm<RequirementsFormData>({
    resolver: zodResolver(requirementsSchema),
    defaultValues: {
      certificationRequirements: [],
      logisticsTimeline: "",
      facilityPreference: "",
      targetMarket: "",
    },
  });

  // Step 4: Additional Information
  const additionalForm = useForm<AdditionalInfoFormData>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues: {
      message: "",
      preferredContactMethod: "",
      hearAboutUs: "",
    },
  });

  const productCategories = [
    { value: "terry", label: "Terry Towels" },
    { value: "dobby", label: "Dobby Towels" },
    { value: "jacquard", label: "Jacquard Chaddars" },
    { value: "custom", label: "Custom Products" },
  ];

  const certifications = [
    { value: "iso", label: "ISO Certification" },
    { value: "oeko-tex", label: "OEKO-TEX Standard 100" },
    { value: "gots", label: "Global Organic Textile Standard (GOTS)" },
    { value: "bsci", label: "BSCI Certification" },
    { value: "other", label: "Other" },
  ];

  const facilities = COMPANY_INFO.locations.map((loc) => ({
    value: loc.name.toLowerCase().replace(/\s+/g, "-"),
    label: loc.name,
  }));

  const handleNext = async () => {
    let isValid = false;

    switch (step) {
      case 1:
        isValid = await contactForm.trigger();
        break;
      case 2:
        isValid = await productForm.trigger();
        break;
      case 3:
        isValid = await requirementsForm.trigger();
        break;
      case 4:
        isValid = await additionalForm.trigger();
        break;
    }

    if (isValid) {
      const nextStep = step + 1;
      setStep(nextStep);
      setSubmitError(null);
      // Track form step progress
      trackFormStep(nextStep, "rfq_form");
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const formData: LeadFormData = {
        ...contactForm.getValues(),
        ...productForm.getValues(),
        ...requirementsForm.getValues(),
        ...additionalForm.getValues(),
        source,
        referrer: referrer || (typeof window !== "undefined" ? window.location.href : undefined),
        metadata: {
          userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
          timestamp: new Date().toISOString(),
        },
      };

      // Track form submission event
      trackFormSubmission("rfq_form", {
        product_categories: formData.productCategories,
        volume: formData.volume,
        source: formData.source,
      });

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit form");
      }

      setSubmitSuccess(true);
      if (onSuccess) {
        onSuccess();
      }

      // Reset forms
      contactForm.reset();
      productForm.reset();
      requirementsForm.reset();
      additionalForm.reset();
      setStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error instanceof Error ? error.message : "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-card border rounded-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <svg
            className="h-8 w-8 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p className="text-muted-foreground mb-6">
          Your request has been submitted successfully. We'll get back to you shortly.
        </p>
        <Button onClick={() => setSubmitSuccess(false)}>Submit Another Request</Button>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-lg p-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                s < step
                  ? "bg-primary border-primary text-primary-foreground"
                  : s === step
                    ? "border-primary text-primary bg-primary/10"
                    : "border-muted text-muted-foreground"
              )}
            >
              {s < step ? "✓" : s}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Contact</span>
          <span>Products</span>
          <span>Requirements</span>
          <span>Message</span>
        </div>
      </div>

      {/* Form Steps */}
      <form className="space-y-6">
        {/* Step 1: Contact Information */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">
                  Name *
                </Label>
                <Input
                  {...contactForm.register("name")}
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="mt-2"
                />
                {contactForm.formState.errors.name && (
                  <p className="text-sm text-destructive mt-1">
                    {contactForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">
                  Email *
                </Label>
                <Input
                  {...contactForm.register("email")}
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className="mt-2"
                />
                {contactForm.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {contactForm.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  {...contactForm.register("phone")}
                  type="tel"
                  id="phone"
                  placeholder="+91-XXX-XXX-XXXX"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  {...contactForm.register("company")}
                  type="text"
                  id="company"
                  placeholder="Your Company"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Product Interests */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Product Interests</h2>
            <div>
              <Label>Product Categories *</Label>
              <div className="space-y-3 mt-2">
                {productCategories.map((category) => {
                  const currentCategories = productForm.watch("productCategories") || [];
                  const isChecked = currentCategories.includes(category.value);
                  return (
                    <label
                      key={category.value}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const current = productForm.getValues("productCategories") || [];
                          if (checked) {
                            productForm.setValue("productCategories", [...current, category.value], {
                              shouldValidate: true,
                            });
                          } else {
                            productForm.setValue(
                              "productCategories",
                              current.filter((v) => v !== category.value),
                              { shouldValidate: true }
                            );
                          }
                        }}
                      />
                      <span>{category.label}</span>
                    </label>
                  );
                })}
              </div>
              {productForm.formState.errors.productCategories && (
                <p className="text-sm text-destructive mt-1">
                  {productForm.formState.errors.productCategories.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="volume">Estimated Volume</Label>
              <Select {...productForm.register("volume")} id="volume" className="mt-2">
                <option value="">Select volume</option>
                <option value="small">Small (1-100 units)</option>
                <option value="medium">Medium (100-1,000 units)</option>
                <option value="large">Large (1,000-10,000 units)</option>
                <option value="bulk">Bulk (10,000+ units)</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="weavePreference">Weave Preference</Label>
              <Select {...productForm.register("weavePreference")} id="weavePreference" className="mt-2">
                <option value="">Select preference</option>
                <option value="terry">Terry</option>
                <option value="dobby">Dobby</option>
                <option value="jacquard">Jacquard</option>
                <option value="custom">Custom</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="customRequirements">Custom Requirements</Label>
              <Textarea
                {...productForm.register("customRequirements")}
                id="customRequirements"
                rows={4}
                className="mt-2"
                placeholder="Tell us about your specific requirements..."
              />
            </div>
          </div>
        )}

        {/* Step 3: Requirements */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            <div>
              <Label>Certification Requirements</Label>
              <div className="space-y-3 mt-2">
                {certifications.map((cert) => {
                  const currentCerts = requirementsForm.watch("certificationRequirements") || [];
                  const isChecked = currentCerts.includes(cert.value);
                  return (
                    <label
                      key={cert.value}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const current = requirementsForm.getValues("certificationRequirements") || [];
                          if (checked) {
                            requirementsForm.setValue("certificationRequirements", [
                              ...current,
                              cert.value,
                            ]);
                          } else {
                            requirementsForm.setValue(
                              "certificationRequirements",
                              current.filter((v) => v !== cert.value)
                            );
                          }
                        }}
                      />
                      <span>{cert.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div>
              <Label htmlFor="logisticsTimeline">Logistics Timeline</Label>
              <Select {...requirementsForm.register("logisticsTimeline")} id="logisticsTimeline" className="mt-2">
                <option value="">Select timeline</option>
                <option value="urgent">Urgent (Within 1 month)</option>
                <option value="short">Short-term (1-3 months)</option>
                <option value="medium">Medium-term (3-6 months)</option>
                <option value="long">Long-term (6+ months)</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="facilityPreference">Facility Preference</Label>
              <Select {...requirementsForm.register("facilityPreference")} id="facilityPreference" className="mt-2">
                <option value="">No preference</option>
                {facilities.map((facility) => (
                  <option key={facility.value} value={facility.value}>
                    {facility.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="targetMarket">Target Market</Label>
              <Select {...requirementsForm.register("targetMarket")} id="targetMarket" className="mt-2">
                <option value="">Select market</option>
                <option value="domestic">Domestic (India)</option>
                <option value="international">International</option>
                <option value="both">Both</option>
              </Select>
            </div>
          </div>
        )}

        {/* Step 4: Additional Information */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                {...additionalForm.register("message")}
                id="message"
                rows={6}
                className="mt-2"
                placeholder="Tell us more about your requirements..."
              />
              {additionalForm.formState.errors.message && (
                <p className="text-sm text-destructive mt-1">
                  {additionalForm.formState.errors.message.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
              <Select
                {...additionalForm.register("preferredContactMethod")}
                id="preferredContactMethod"
                className="mt-2"
              >
                <option value="">No preference</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="whatsapp">WhatsApp</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
              <Select {...additionalForm.register("hearAboutUs")} id="hearAboutUs" className="mt-2">
                <option value="">Select option</option>
                <option value="search">Search Engine</option>
                <option value="justdial">Justdial</option>
                <option value="indiamart">IndiaMART</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
                <option value="other">Other</option>
              </Select>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="bg-destructive/10 border border-destructive rounded-md p-4">
            <p className="text-sm text-destructive">{submitError}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
            className="group"
          >
            <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Previous
          </Button>
          {step < 4 ? (
            <Button type="button" onClick={handleNext} className="group">
              Next
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

