"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Download, Check } from "lucide-react";
import { trackEvent, trackDownload } from "@/lib/analytics";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const downloadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type DownloadFormData = z.infer<typeof downloadFormSchema>;

interface GatedDownloadProps {
  resourceTitle: string;
  resourceUrl: string;
  resourceType?: string;
  className?: string;
  trigger?: React.ReactNode;
}

export function GatedDownload({
  resourceTitle,
  resourceUrl,
  resourceType = "PDF",
  className,
  trigger,
}: GatedDownloadProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DownloadFormData>({
    resolver: zodResolver(downloadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: DownloadFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Track download request event
      trackEvent("download_request", {
        event_category: "lead_generation",
        event_label: resourceTitle,
        resource_type: resourceType,
      });

      // Submit lead capture form
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone,
          message: data.message || `Requesting download: ${resourceTitle}`,
          source: "gated_download",
          referrer: window.location.href,
          metadata: {
            downloadResource: resourceTitle,
            downloadType: resourceType,
            downloadUrl: resourceUrl,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit download request");
      }

      // Track successful download
      trackDownload(resourceTitle, resourceType);

      // Set download URL and show success
      setDownloadUrl(resourceUrl);
      setSubmitSuccess(true);
      reset();

      // Auto-download after 1 second
      setTimeout(() => {
        if (resourceUrl) {
          window.open(resourceUrl, "_blank");
        }
      }, 1000);
    } catch (error) {
      console.error("Error submitting download request:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit download request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger = (
    <Button variant="outline" className="group w-full">
      <Download className="mr-2 h-4 w-4" />
      Download
      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={className}>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Download {resourceTitle}</DialogTitle>
          <DialogDescription>
            Please provide your details to download this resource. We'll send you the download link
            and keep you updated with our latest products and news.
          </DialogDescription>
        </DialogHeader>

        {submitSuccess ? (
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 text-success mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Download Started!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your interest. Your download should start shortly.
            </p>
            {downloadUrl && (
              <Button asChild>
                <a href={downloadUrl} download target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download Now
                </a>
              </Button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="download-name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="download-name"
                {...register("name")}
                className="mt-2"
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="download-email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="download-email"
                type="email"
                {...register("email")}
                className="mt-2"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="download-company">Company</Label>
              <Input id="download-company" {...register("company")} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="download-phone">Phone</Label>
              <Input
                id="download-phone"
                type="tel"
                {...register("phone")}
                className="mt-2"
                placeholder="+91-XXX-XXX-XXXX"
              />
            </div>

            <div>
              <Label htmlFor="download-message">Message (Optional)</Label>
              <Textarea
                id="download-message"
                {...register("message")}
                className="mt-2"
                rows={3}
                placeholder="Tell us how we can help you..."
              />
            </div>

            {submitError && (
              <p className="text-sm text-destructive">{submitError}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resource
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}


