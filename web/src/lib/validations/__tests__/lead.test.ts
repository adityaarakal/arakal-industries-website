import { describe, it, expect } from "vitest";
import {
  contactInfoSchema,
  productInterestsSchema,
  requirementsSchema,
  additionalInfoSchema,
  leadFormSchema,
} from "../lead";

describe("Lead Validation Schemas", () => {
  describe("contactInfoSchema", () => {
    it("validates valid contact info", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+91-123-456-7890",
        company: "Test Company",
      };
      expect(() => contactInfoSchema.parse(validData)).not.toThrow();
    });

    it("rejects invalid email", () => {
      const invalidData = {
        name: "John Doe",
        email: "invalid-email",
      };
      expect(() => contactInfoSchema.parse(invalidData)).toThrow();
    });

    it("rejects name that is too short", () => {
      const invalidData = {
        name: "A",
        email: "john@example.com",
      };
      expect(() => contactInfoSchema.parse(invalidData)).toThrow();
    });

    it("allows optional phone and company", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
      };
      expect(() => contactInfoSchema.parse(validData)).not.toThrow();
    });
  });

  describe("productInterestsSchema", () => {
    it("validates valid product interests", () => {
      const validData = {
        productCategories: ["terry", "dobby"],
        volume: "large",
        weavePreference: "terry",
      };
      expect(() => productInterestsSchema.parse(validData)).not.toThrow();
    });

    it("rejects empty product categories", () => {
      const invalidData = {
        productCategories: [],
      };
      expect(() => productInterestsSchema.parse(invalidData)).toThrow();
    });

    it("allows optional fields", () => {
      const validData = {
        productCategories: ["terry"],
      };
      expect(() => productInterestsSchema.parse(validData)).not.toThrow();
    });
  });

  describe("requirementsSchema", () => {
    it("validates valid requirements", () => {
      const validData = {
        certificationRequirements: ["iso", "oeko-tex"],
        logisticsTimeline: "urgent",
        facilityPreference: "gandhi-nagar",
        targetMarket: "international",
      };
      expect(() => requirementsSchema.parse(validData)).not.toThrow();
    });

    it("allows all optional fields", () => {
      const validData = {};
      expect(() => requirementsSchema.parse(validData)).not.toThrow();
    });
  });

  describe("additionalInfoSchema", () => {
    it("validates valid additional info", () => {
      const validData = {
        message: "This is a test message with enough characters",
        preferredContactMethod: "email",
        hearAboutUs: "search",
      };
      expect(() => additionalInfoSchema.parse(validData)).not.toThrow();
    });

    it("rejects message that is too short", () => {
      const invalidData = {
        message: "short",
      };
      expect(() => additionalInfoSchema.parse(invalidData)).toThrow();
    });

    it("allows optional fields", () => {
      const validData = {
        message: "This is a test message with enough characters",
      };
      expect(() => additionalInfoSchema.parse(validData)).not.toThrow();
    });
  });

  describe("leadFormSchema", () => {
    it("validates complete lead form data", () => {
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

    it("rejects invalid email", () => {
      const invalidData = {
        name: "John Doe",
        email: "invalid-email",
        productCategories: ["terry"],
        message: "This is a test message with enough characters",
      };
      expect(() => leadFormSchema.parse(invalidData)).toThrow();
    });

    it("rejects empty product categories", () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        productCategories: [],
        message: "This is a test message with enough characters",
      };
      expect(() => leadFormSchema.parse(invalidData)).toThrow();
    });
  });
});

