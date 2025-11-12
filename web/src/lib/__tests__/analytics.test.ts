import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  trackEvent,
  trackFormSubmission,
  trackFormStep,
  trackButtonClick,
  trackPageView,
  trackDownload,
  trackPhoneClick,
  trackWhatsAppClick,
  trackEmailClick,
  trackProductView,
  trackSearch,
} from "../analytics";

// Mock consent module
vi.mock("../consent", () => ({
  hasAnalyticsConsent: vi.fn(() => true),
}));

// Mock window object
const mockGtag = vi.fn();
const mockDataLayer: unknown[] = [];

describe("Analytics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDataLayer.length = 0;
    
    // Setup window mocks
    if (typeof window !== "undefined") {
      (window as any).gtag = mockGtag;
      (window as any).dataLayer = mockDataLayer;
    } else {
      // For Node.js environment
      global.window = {
        gtag: mockGtag,
        dataLayer: mockDataLayer,
      } as any;
    }
  });

  describe("trackEvent", () => {
    it("tracks event when consent is given", () => {
      // Mock hasAnalyticsConsent to return true
      vi.doMock("../consent", () => ({
        hasAnalyticsConsent: () => true,
      }));

      trackEvent("test_event", { event_category: "test", value: 1 });

      expect(mockGtag).toHaveBeenCalledWith("event", "test_event", {
        event_category: "test",
        value: 1,
      });
      expect(mockDataLayer.length).toBeGreaterThan(0);
    });
  });

  describe("trackFormSubmission", () => {
    it("tracks form submission with correct parameters", () => {
      trackFormSubmission("rfq_form", { product_categories: ["terry"] });

      expect(mockGtag).toHaveBeenCalledWith("event", "form_submit", {
        event_category: "lead_generation",
        event_label: "rfq_form",
        value: 1,
        product_categories: ["terry"],
      });
    });
  });

  describe("trackFormStep", () => {
    it("tracks form step with correct parameters", () => {
      trackFormStep(2, "rfq_form");

      expect(mockGtag).toHaveBeenCalledWith("event", "form_step", {
        event_category: "lead_generation",
        event_label: "rfq_form",
        step: 2,
        value: 2,
      });
    });
  });

  describe("trackButtonClick", () => {
    it("tracks button click with correct parameters", () => {
      trackButtonClick("Get Quote", "header");

      expect(mockGtag).toHaveBeenCalledWith("event", "button_click", {
        event_category: "engagement",
        event_label: "Get Quote",
        button_location: "header",
      });
    });
  });

  describe("trackPageView", () => {
    it("tracks page view when measurement ID is set", () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST123";
      trackPageView("/products", "Products");

      if (typeof window !== "undefined" && (window as any).gtag) {
        expect(mockGtag).toHaveBeenCalledWith("config", "G-TEST123", {
          page_path: "/products",
          page_title: "Products",
        });
      }
    });
  });

  describe("trackDownload", () => {
    it("tracks file download", () => {
      trackDownload("catalogue.pdf", "pdf");

      expect(mockGtag).toHaveBeenCalledWith("event", "file_download", {
        event_category: "engagement",
        event_label: "catalogue.pdf",
        file_type: "pdf",
      });
    });
  });

  describe("trackPhoneClick", () => {
    it("tracks phone click", () => {
      trackPhoneClick("+91-217-2745260");

      expect(mockGtag).toHaveBeenCalledWith("event", "phone_click", {
        event_category: "contact",
        event_label: "+91-217-2745260",
      });
    });
  });

  describe("trackWhatsAppClick", () => {
    it("tracks WhatsApp click", () => {
      trackWhatsAppClick("+91-217-2745260");

      expect(mockGtag).toHaveBeenCalledWith("event", "whatsapp_click", {
        event_category: "contact",
        event_label: "+91-217-2745260",
      });
    });
  });

  describe("trackEmailClick", () => {
    it("tracks email click", () => {
      trackEmailClick("info@arakalindustries.com");

      expect(mockGtag).toHaveBeenCalledWith("event", "email_click", {
        event_category: "contact",
        event_label: "info@arakalindustries.com",
      });
    });
  });

  describe("trackProductView", () => {
    it("tracks product view", () => {
      trackProductView("Terry Towel", "terry");

      expect(mockGtag).toHaveBeenCalledWith("event", "product_view", {
        event_category: "product",
        event_label: "Terry Towel",
        product_category: "terry",
      });
    });
  });

  describe("trackSearch", () => {
    it("tracks search query", () => {
      trackSearch("terry towel", 10);

      expect(mockGtag).toHaveBeenCalledWith("event", "search", {
        event_category: "engagement",
        event_label: "terry towel",
        search_results: 10,
      });
    });
  });
});
