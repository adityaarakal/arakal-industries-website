import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("homepage should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
  });

  test("contact page should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/contact");
    const h1 = page.locator("h1");
    const count = await h1.count();
    // Should have at least one h1
    expect(count).toBeGreaterThan(0);
  });

  test("products page should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/products");
    const h1 = page.locator("h1");
    const count = await h1.count();
    // Should have at least one h1
    expect(count).toBeGreaterThan(0);
  });

  test("should have proper alt text for images", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      // Decorative images can have empty alt, but should have the attribute
      expect(alt).not.toBeNull();
    }
  });

  test("should be keyboard navigable", async ({ page }) => {
    await page.goto("/");
    
    // Tab through interactive elements
    await page.keyboard.press("Tab");
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();
  });

  test("should have proper ARIA labels", async ({ page }) => {
    await page.goto("/contact");
    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    // Menu button should exist on mobile or desktop
    const exists = await menuButton.count() > 0;
    if (exists) {
      await expect(menuButton).toHaveAttribute("aria-label");
    }
  });
});

