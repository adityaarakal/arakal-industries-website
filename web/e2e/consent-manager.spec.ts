import { test, expect } from "@playwright/test";

test.describe("Consent Manager", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage and cookies before each test
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });
    });
  });

  test("should show consent banner on first visit", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Cookie Consent")).toBeVisible();
  });

  test("should accept all cookies", async ({ page }) => {
    await page.goto("/");
    await page.click("button:has-text('Accept All')");
    
    // Banner should disappear
    await expect(page.locator("text=Cookie Consent")).not.toBeVisible();
    
    // Check that consent is saved
    const consent = await page.evaluate(() => localStorage.getItem("cookie-consent"));
    expect(consent).toBeTruthy();
    const consentData = JSON.parse(consent || "{}");
    expect(consentData.analytics).toBe(true);
    expect(consentData.marketing).toBe(true);
  });

  test("should reject all cookies", async ({ page }) => {
    await page.goto("/");
    await page.click("button:has-text('Reject All')");
    
    // Banner should disappear
    await expect(page.locator("text=Cookie Consent")).not.toBeVisible();
    
    // Check that consent is saved with all false except necessary
    const consent = await page.evaluate(() => localStorage.getItem("cookie-consent"));
    expect(consent).toBeTruthy();
    const consentData = JSON.parse(consent || "{}");
    expect(consentData.necessary).toBe(true);
    expect(consentData.analytics).toBe(false);
    expect(consentData.marketing).toBe(false);
  });

  test("should open settings modal", async ({ page }) => {
    await page.goto("/");
    await page.click("button:has-text('Customize')");
    
    await expect(page.locator("text=Cookie Preferences")).toBeVisible();
  });

  test("should save custom preferences", async ({ page }) => {
    await page.goto("/");
    await page.click("button:has-text('Customize')");
    
    // Toggle analytics on
    const analyticsCheckbox = page.locator('input[type="checkbox"]').nth(1);
    await analyticsCheckbox.check();
    
    // Save preferences
    await page.click("button:has-text('Save Preferences')");
    
    // Check that consent is saved
    const consent = await page.evaluate(() => localStorage.getItem("cookie-consent"));
    expect(consent).toBeTruthy();
    const consentData = JSON.parse(consent || "{}");
    expect(consentData.analytics).toBe(true);
  });

  test("should not show banner after consent is given", async ({ page }) => {
    // Set consent in localStorage
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem(
        "cookie-consent",
        JSON.stringify({
          necessary: true,
          analytics: true,
          marketing: false,
          functional: false,
        })
      );
    });
    
    // Reload page
    await page.reload();
    
    // Banner should not be visible
    await expect(page.locator("text=Cookie Consent")).not.toBeVisible();
  });
});

