import { describe, it, expect, beforeEach, vi } from "vitest";
import * as consentModule from "../consent";

// Mock the consent module
vi.mock("../consent", () => ({
  hasAnalyticsConsent: vi.fn(() => true),
}));

// Mock window object
const mockGtag = vi.fn();
const mockDataLayer: unknown[] = [];

// Setup window mocks
Object.defineProperty(global, "window", {
  value: {
    gtag: mockGtag,
    dataLayer: mockDataLayer,
  },
  writable: true,
  configurable: true,
});

describe("Analytics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDataLayer.length = 0;
    vi.mocked(consentModule.hasAnalyticsConsent).mockReturnValue(true);
  });

  describe("trackEvent", () => {
    it("tracks event when consent is given", () => {
      const { trackEvent } = require("../analytics");
      trackEvent("test_event", { event_category: "test", value: 1 });

      expect(mockGtag).toHaveBeenCalledWith("event", "test_event", {
        event_category: "test",
        value: 1,
      });
      expect(mockDataLayer).toContainEqual({
        event: "test_event",
        event_category: "test",
        value: 1,
      });
    });

    it("does not track event when consent is not given", () => {
      vi.mocked(consentModule.hasAnalyticsConsent).mockReturnValue(false);
      const { trackEvent } = require("../analytics");
      trackEvent("test_event", { event_category: "test" });

      expect(mockGtag).not.toHaveBeenCalled();
      expect(mockDataLayer).toHaveLength(0);
    });
  });

  describe("trackFormSubmission", () => {
    it("tracks form submission with correct parameters", () => {
      const { trackFormSubmission } = require("../analytics");
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
      const { trackFormStep } = require("../analytics");
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
      const { trackButtonClick } = require("../analytics");
      trackButtonClick("Get Quote", "header");

      expect(mockGtag).toHaveBeenCalledWith("event", "button_click", {
        event_category: "engagement",
        event_label: "Get Quote",
        button_location: "header",
      });
    });
  });

  describe("trackPageView", () => {
    it("tracks page view with measurement ID", () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST123";
      const { trackPageView } = require("../analytics");
      trackPageView("/products", "Products");

      expect(mockGtag).toHaveBeenCalledWith("config", "G-TEST123", {
        page_path: "/products",
        page_title: "Products",
      });
    });
  });

  describe("trackDownload", () => {
    it("tracks file download", () => {
      const { trackDownload } = require("../analytics");
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
      const { trackPhoneClick } = require("../analytics");
      trackPhoneClick("+91-217-2745260");

      expect(mockGtag).toHaveBeenCalledWith("event", "phone_click", {
        event_category: "contact",
        event_label: "+91-217-2745260",
      });
    });
  });

  describe("trackWhatsAppClick", () => {
    it("tracks WhatsApp click", () => {
      const { trackWhatsAppClick } = require("../analytics");
      trackWhatsAppClick("+91-217-2745260");

      expect(mockGtag).toHaveBeenCalledWith("event", "whatsapp_click", {
        event_category: "contact",
        event_label: "+91-217-2745260",
      });
    });
  });

  describe("trackEmailClick", () => {
    it("tracks email click", () => {
      const { trackEmailClick } = require("../analytics");
      trackEmailClick("info@arakalindustries.com");

      expect(mockGtag).toHaveBeenCalledWith("event", "email_click", {
        event_category: "contact",
        event_label: "info@arakalindustries.com",
      });
    });
  });

  describe("trackProductView", () => {
    it("tracks product view", () => {
      const { trackProductView } = require("../analytics");
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
      const { trackSearch } = require("../analytics");
      trackSearch("terry towel", 10);

      expect(mockGtag).toHaveBeenCalledWith("event", "search", {
        event_category: "engagement",
        event_label: "terry towel",
        search_results: 10,
      });
    });
  });
});
