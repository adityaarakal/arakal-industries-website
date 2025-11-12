"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  onSuccess?: () => void;
  source?: string;
  className?: string;
}

export function NewsletterForm({
  onSuccess,
  source = "footer",
  className,
}: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Track newsletter subscription event
      trackEvent("newsletter_subscription", {
        event_category: "lead_generation",
        event_label: "newsletter_subscription",
        source,
        email: data.email,
      });

      // In a real application, this would call an API endpoint to subscribe the user
      // For now, we'll just simulate a successful submission
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          source,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to subscribe");
      }

      setSubmitSuccess(true);
      reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to subscribe. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex items-center space-x-2 text-success">
        <Check className="h-5 w-5" />
        <span className="text-sm font-medium">Thank you for subscribing!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Label htmlFor="newsletter-email" className="sr-only">
            Email address
          </Label>
          <Input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting} className="group">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Subscribe
            </>
          )}
        </Button>
      </div>
      {submitError && (
        <p className="mt-2 text-sm text-destructive">{submitError}</p>
      )}
    </form>
  );
}
