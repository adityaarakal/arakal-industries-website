import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load homepage successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Arakal Industries/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("section").filter({ hasText: /Premium Towel Solutions/ }).first();
    await expect(hero).toBeVisible();
  });

  test("should display company stats", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Since 1997")).toBeVisible();
    await expect(page.locator("text=1940")).toBeVisible();
  });

  test("should navigate to products page", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/products"]');
    await expect(page).toHaveURL(/.*products/);
  });

  test("should navigate to contact page", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/.*contact/);
  });

  test("should have working navigation menu", async ({ page }) => {
    await page.goto("/");
    const navLinks = [
      { href: "/products", text: "Products" },
      { href: "/industries", text: "Industries" },
      { href: "/manufacturing", text: "Manufacturing" },
      { href: "/about", text: "About" },
      { href: "/contact", text: "Contact" },
    ];

    for (const link of navLinks) {
      await page.click(`a[href="${link.href}"]`);
      await expect(page).toHaveURL(new RegExp(link.href));
      await expect(page.locator(`text=${link.text}`).first()).toBeVisible();
    }
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    // Check if mobile menu button is visible
    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    await expect(menuButton).toBeVisible();
  });
});

