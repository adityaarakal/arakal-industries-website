/**
 * Analytics utilities for tracking user interactions
 * Supports Google Analytics 4 (GA4) and Google Tag Manager (GTM)
 */

import { hasAnalyticsConsent } from "./consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Track a custom event in Google Analytics 4
 * Only tracks if analytics consent is given
 */
export function trackEvent(
  eventName: string,
  eventParams?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: unknown;
  }
) {
  // Check for analytics consent
  if (!hasAnalyticsConsent()) {
    return;
  }

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }

  // Also push to dataLayer for GTM
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }
}

/**
 * Track form submission
 */
export function trackFormSubmission(formType: string, formData?: Record<string, unknown>) {
  trackEvent("form_submit", {
    event_category: "lead_generation",
    event_label: formType,
    value: 1,
    ...formData,
  });
}

/**
 * Track form step progress
 */
export function trackFormStep(step: number, formType: string) {
  trackEvent("form_step", {
    event_category: "lead_generation",
    event_label: formType,
    step: step,
    value: step,
  });
}

/**
 * Track button click
 */
export function trackButtonClick(buttonLabel: string, buttonLocation?: string) {
  trackEvent("button_click", {
    event_category: "engagement",
    event_label: buttonLabel,
    button_location: buttonLocation,
  });
}

/**
 * Track page view
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window !== "undefined" && window.gtag) {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (measurementId) {
      window.gtag("config", measurementId, {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  }
}

/**
 * Track download
 */
export function trackDownload(fileName: string, fileType?: string) {
  trackEvent("file_download", {
    event_category: "engagement",
    event_label: fileName,
    file_type: fileType,
  });
}

/**
 * Track phone click
 */
export function trackPhoneClick(phoneNumber: string) {
  trackEvent("phone_click", {
    event_category: "contact",
    event_label: phoneNumber,
  });
}

/**
 * Track WhatsApp click
 */
export function trackWhatsAppClick(phoneNumber: string) {
  trackEvent("whatsapp_click", {
    event_category: "contact",
    event_label: phoneNumber,
  });
}

/**
 * Track email click
 */
export function trackEmailClick(email: string) {
  trackEvent("email_click", {
    event_category: "contact",
    event_label: email,
  });
}

/**
 * Track product view
 */
export function trackProductView(productName: string, productCategory?: string) {
  trackEvent("product_view", {
    event_category: "product",
    event_label: productName,
    product_category: productCategory,
  });
}

/**
 * Track search
 */
export function trackSearch(searchQuery: string, resultCount?: number) {
  trackEvent("search", {
    event_category: "engagement",
    event_label: searchQuery,
    search_results: resultCount,
  });
}

