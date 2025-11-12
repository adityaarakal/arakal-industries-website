import { describe, it, expect, vi } from "vitest";
import { leadFormSchema } from "@/lib/validations/lead";

// Note: API route testing is better done via E2E tests
// This file tests the validation schema used by the API

describe("Leads API Validation", () => {
  describe("leadFormSchema", () => {
    it("should validate complete lead form data", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+91-123-456-7890",
        company: "Test Company",
        productCategories: ["terry"],
        volume: "large",
        message: "This is a test message with enough characters",
        source: "web",
        referrer: "https://example.com",
      };

      expect(() => leadFormSchema.parse(validData)).not.toThrow();
    });

    it("should reject invalid email", () => {
      const invalidData = {
        name: "John Doe",
        email: "invalid-email",
        productCategories: ["terry"],
        message: "This is a test message with enough characters",
      };

      expect(() => leadFormSchema.parse(invalidData)).toThrow();
    });

    it("should reject empty product categories", () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        productCategories: [],
        message: "This is a test message with enough characters",
      };

      expect(() => leadFormSchema.parse(invalidData)).toThrow();
    });

    it("should reject message that is too short", () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        productCategories: ["terry"],
        message: "short",
      };

      expect(() => leadFormSchema.parse(invalidData)).toThrow();
    });
  });
});
