# Testing Guide

This document outlines the testing strategy and how to run tests for the Arakal Industries website.

## Test Types

### Unit Tests
Unit tests are written using Vitest and React Testing Library. They test individual components and utilities in isolation.

**Location:** `src/**/__tests__/**/*.test.tsx` or `src/**/__tests__/**/*.test.ts`

**Run unit tests:**
```bash
npm run test
```

**Run unit tests with UI:**
```bash
npm run test:ui
```

**Run unit tests with coverage:**
```bash
npm run test:coverage
```

### Integration Tests
Integration tests verify that different parts of the application work together correctly. Currently, API route validation is tested via unit tests.

**Location:** `src/app/api/__tests__/**/*.test.ts`

### End-to-End (E2E) Tests
E2E tests are written using Playwright and test critical user flows across the entire application.

**Location:** `e2e/**/*.spec.ts`

**Run E2E tests:**
```bash
npm run test:e2e
```

**Run E2E tests with UI:**
```bash
npm run test:e2e:ui
```

## Test Coverage

### Components
- ✅ Button component (variants, sizes, disabled state)
- ✅ Input component (types, validation, placeholder)
- ✅ Header component (navigation, mobile menu)
- ✅ Footer component (links, contact info, copyright)

### Utilities
- ✅ Consent management (get, save, clear preferences)
- ✅ Analytics tracking (events, form submissions, page views)
- ✅ Lead form validation (Zod schemas)

### E2E Flows
- ✅ Homepage navigation and content
- ✅ RFQ form (multi-step, validation, submission)
- ✅ Consent manager (banner, settings, preferences)
- ✅ Accessibility checks (heading hierarchy, alt text, keyboard navigation)

## Performance Testing

### Lighthouse CI
Lighthouse CI is configured to run on pull requests and test:
- Performance (min score: 0.8)
- Accessibility (min score: 0.9)
- Best Practices (min score: 0.9)
- SEO (min score: 0.9)
- Core Web Vitals (FCP, LCP, CLS)

**Run Lighthouse CI:**
```bash
npm install -g @lhci/cli
lhci autorun --config=./.lighthouserc.json
```

## Accessibility Testing

### Automated Tests
- Heading hierarchy validation
- Alt text verification for images
- Keyboard navigation testing
- ARIA label verification

### Manual Testing Checklist
- [ ] Screen reader compatibility (NVDA, JAWS, VoiceOver)
- [ ] Keyboard-only navigation
- [ ] Color contrast ratios (WCAG 2.1 AA)
- [ ] Focus indicators
- [ ] Form labels and error messages
- [ ] Skip links
- [ ] Semantic HTML structure

## Cross-Browser Testing

Playwright is configured to test across:
- Chrome (Desktop)
- Firefox (Desktop)
- Safari/WebKit (Desktop)
- Chrome (Mobile)
- Safari (Mobile)

## CI/CD Integration

Tests are automatically run in GitHub Actions on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**CI Pipeline:**
1. Lint & Type Check
2. Unit Tests (with coverage)
3. E2E Tests
4. Build Verification
5. Lighthouse CI (on PRs)

## Writing New Tests

### Unit Test Example
```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "../my-component";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

### E2E Test Example
```typescript
import { test, expect } from "@playwright/test";

test("user can complete flow", async ({ page }) => {
  await page.goto("/");
  await page.click("button");
  await expect(page.locator("text=Success")).toBeVisible();
});
```

## Test Data

### Mock Data
- Use factories or fixtures for consistent test data
- Mock external APIs and services
- Use test database for integration tests

### Environment Variables
Tests use environment variables from `.env.test` (create this file for test-specific configuration).

## Debugging Tests

### Unit Tests
- Use `console.log` or debugger in test files
- Run tests with `--reporter=verbose` for detailed output
- Use Vitest UI for interactive debugging

### E2E Tests
- Use `await page.pause()` to pause execution
- Use `await page.screenshot()` to capture screenshots
- Check `playwright-report/` for test results
- Use Playwright Inspector: `npx playwright test --debug`

## Best Practices

1. **Test Behavior, Not Implementation**: Test what the user sees and does, not internal implementation details.

2. **Keep Tests Simple**: Each test should verify one thing.

3. **Use Descriptive Names**: Test names should clearly describe what they're testing.

4. **Avoid Test Interdependence**: Tests should be able to run in any order.

5. **Clean Up After Tests**: Reset state, clear mocks, and clean up resources.

6. **Mock External Dependencies**: Don't make real API calls or database queries in unit tests.

7. **Test Edge Cases**: Test error states, empty data, and boundary conditions.

8. **Maintain Test Coverage**: Aim for >80% code coverage, but focus on testing critical paths.

## Continuous Improvement

- Review test failures and fix issues promptly
- Update tests when requirements change
- Add tests for bugs found in production
- Refactor tests to improve maintainability
- Regularly review and update test coverage

