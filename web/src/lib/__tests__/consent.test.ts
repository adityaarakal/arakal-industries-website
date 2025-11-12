import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  getConsentPreferences,
  hasAnalyticsConsent,
  hasMarketingConsent,
  hasFunctionalConsent,
  saveConsentPreferences,
  clearConsentPreferences,
  shouldShowConsentBanner,
  type ConsentPreferences,
} from "../consent";

// Mock localStorage
const createMockStorage = () => {
  const store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((key) => delete store[key]);
    }),
  };
};

// Mock document.cookie
const createMockCookie = () => {
  let cookieValue = "";
  return {
    get value() {
      return cookieValue;
    },
    set value(val: string) {
      cookieValue = val;
    },
    clear: () => {
      cookieValue = "";
    },
  };
};

describe("Consent Management", () => {
  let mockStorage: ReturnType<typeof createMockStorage>;
  let mockCookie: ReturnType<typeof createMockCookie>;

  beforeEach(() => {
    mockStorage = createMockStorage();
    mockCookie = createMockCookie();

    // Mock window.localStorage
    Object.defineProperty(window, "localStorage", {
      value: mockStorage,
      writable: true,
      configurable: true,
    });

    // Mock document.cookie
    Object.defineProperty(document, "cookie", {
      get: () => mockCookie.value,
      set: (val: string) => {
        mockCookie.value = val;
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockStorage.clear();
    mockCookie.clear();
  });

  describe("getConsentPreferences", () => {
    it("returns null when no consent is stored", () => {
      expect(getConsentPreferences()).toBeNull();
    });

    it("returns stored consent preferences", () => {
      const preferences: ConsentPreferences = {
        necessary: true,
        analytics: true,
        marketing: false,
        functional: false,
      };
      mockStorage.setItem("cookie-consent", JSON.stringify(preferences));
      const result = getConsentPreferences();
      expect(result).toEqual(preferences);
    });

    it("handles invalid JSON gracefully", () => {
      mockStorage.setItem("cookie-consent", "invalid json");
      expect(getConsentPreferences()).toBeNull();
    });
  });

  describe("hasAnalyticsConsent", () => {
    it("returns false when no consent is given", () => {
      expect(hasAnalyticsConsent()).toBe(false);
    });

    it("returns true when analytics consent is given", () => {
      const preferences: ConsentPreferences = {
        necessary: true,
        analytics: true,
        marketing: false,
        functional: false,
      };
      mockStorage.setItem("cookie-consent", JSON.stringify(preferences));
      expect(hasAnalyticsConsent()).toBe(true);
    });

    it("returns true when analytics-consent flag is set", () => {
      mockStorage.setItem("analytics-consent", "true");
      expect(hasAnalyticsConsent()).toBe(true);
    });
  });

  describe("hasMarketingConsent", () => {
    it("returns false when no consent is given", () => {
      expect(hasMarketingConsent()).toBe(false);
    });

    it("returns true when marketing consent is given", () => {
      const preferences: ConsentPreferences = {
        necessary: true,
        analytics: false,
        marketing: true,
        functional: false,
      };
      mockStorage.setItem("cookie-consent", JSON.stringify(preferences));
      expect(hasMarketingConsent()).toBe(true);
    });
  });

  describe("hasFunctionalConsent", () => {
    it("returns false when no consent is given", () => {
      expect(hasFunctionalConsent()).toBe(false);
    });

    it("returns true when functional consent is given", () => {
      const preferences: ConsentPreferences = {
        necessary: true,
        analytics: false,
        marketing: false,
        functional: true,
      };
      mockStorage.setItem("cookie-consent", JSON.stringify(preferences));
      expect(hasFunctionalConsent()).toBe(true);
    });
  });

  describe("saveConsentPreferences", () => {
    it("saves consent preferences to localStorage", () => {
      const preferences: ConsentPreferences = {
        necessary: true,
        analytics: true,
        marketing: true,
        functional: true,
      };
      saveConsentPreferences(preferences);
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        "cookie-consent",
        JSON.stringify(preferences)
      );
    });

    it("sets analytics-consent flag when analytics is enabled", () => {
      const preferences: ConsentPreferences = {
        necessary: true,
        analytics: true,
        marketing: false,
        functional: false,
      };
      saveConsentPreferences(preferences);
      expect(mockStorage.setItem).toHaveBeenCalledWith("analytics-consent", "true");
    });

    it("removes analytics-consent flag when analytics is disabled", () => {
      mockStorage.setItem("analytics-consent", "true");
      const preferences: ConsentPreferences = {
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false,
      };
      saveConsentPreferences(preferences);
      expect(mockStorage.removeItem).toHaveBeenCalledWith("analytics-consent");
    });
  });

  describe("clearConsentPreferences", () => {
    it("removes consent preferences from localStorage", () => {
      mockStorage.setItem("cookie-consent", JSON.stringify({ necessary: true, analytics: true }));
      mockStorage.setItem("analytics-consent", "true");
      clearConsentPreferences();
      expect(mockStorage.removeItem).toHaveBeenCalledWith("cookie-consent");
      expect(mockStorage.removeItem).toHaveBeenCalledWith("analytics-consent");
    });
  });

  describe("shouldShowConsentBanner", () => {
    it("returns true when no consent is stored", () => {
      expect(shouldShowConsentBanner()).toBe(true);
    });

    it("returns false when consent is stored", () => {
      mockStorage.setItem("cookie-consent", JSON.stringify({ necessary: true }));
      expect(shouldShowConsentBanner()).toBe(false);
    });
  });
});
