import { test, expect } from "@playwright/test";

test.describe("RFQ Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("should display RFQ form", async ({ page }) => {
    await expect(page.locator("text=Request a Quote")).toBeVisible();
    await expect(page.locator("text=Contact Information")).toBeVisible();
  });

  test("should validate required fields", async ({ page }) => {
    // Try to proceed without filling required fields
    const nextButton = page.locator("button:has-text('Next')");
    await nextButton.click();
    
    // Should show validation error (either name or email)
    const nameError = page.locator("text=Name must be at least 2 characters");
    const emailError = page.locator("text=Please enter a valid email address");
    await expect(nameError.or(emailError)).toBeVisible();
  });

  test("should complete multi-step form", async ({ page }) => {
    // Mock API response
    await page.route("**/api/leads", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Lead submitted successfully",
          leadId: "test-lead-id",
        }),
      });
    });

    // Step 1: Contact Information
    await page.fill('input[id="name"]', "John Doe");
    await page.fill('input[id="email"]', "john@example.com");
    await page.fill('input[id="phone"]', "+91-123-456-7890");
    await page.fill('input[id="company"]', "Test Company");
    
    await page.click("button:has-text('Next')");
    
    // Wait for step 2
    await expect(page.locator("text=Product Interests")).toBeVisible();
    
    // Step 2: Product Interests - click checkbox for terry
    const terryCheckbox = page.locator('input[type="checkbox"]').first();
    await terryCheckbox.check();
    
    await page.selectOption('select[id="volume"]', "large");
    
    await page.click("button:has-text('Next')");
    
    // Step 3: Requirements
    await expect(page.locator("text=Requirements")).toBeVisible();
    await page.selectOption('select[id="logisticsTimeline"]', "urgent");
    
    await page.click("button:has-text('Next')");
    
    // Step 4: Additional Information
    await expect(page.locator("text=Additional Information")).toBeVisible();
    await page.fill('textarea[id="message"]', "This is a test message with enough characters to pass validation");
    
    await page.click("button:has-text('Submit Request')");
    
    // Wait for success message
    await expect(page.locator("text=Thank You!")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("text=Your request has been submitted successfully")).toBeVisible();
  });

  test("should handle form submission errors", async ({ page }) => {
    // Mock API error
    await page.route("**/api/leads", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "Failed to submit form",
        }),
      });
    });

    // Fill form
    await page.fill('input[id="name"]', "John Doe");
    await page.fill('input[id="email"]', "john@example.com");
    
    await page.click("button:has-text('Next')");
    await page.locator('input[type="checkbox"]').first().check();
    await page.click("button:has-text('Next')");
    await page.click("button:has-text('Next')");
    await page.fill('textarea[id="message"]', "This is a test message with enough characters");
    
    await page.click("button:has-text('Submit Request')");
    
    // Should show error message
    await expect(page.locator("text=Failed to submit form")).toBeVisible({ timeout: 10000 });
  });

  test("should allow navigation between steps", async ({ page }) => {
    // Fill step 1 and go to step 2
    await page.fill('input[id="name"]', "John Doe");
    await page.fill('input[id="email"]', "john@example.com");
    await page.click("button:has-text('Next')");
    
    // Wait for step 2
    await expect(page.locator("text=Product Interests")).toBeVisible();
    
    // Go back to step 1
    await page.click("button:has-text('Previous')");
    await expect(page.locator("text=Contact Information")).toBeVisible();
    
    // Values should be preserved
    await expect(page.locator('input[id="name"]')).toHaveValue("John Doe");
    await expect(page.locator('input[id="email"]')).toHaveValue("john@example.com");
  });
});

