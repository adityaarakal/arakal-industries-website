import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../header";
import { NAVIGATION } from "@/lib/constants";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

describe("Header", () => {
  it("renders company name", () => {
    render(<Header />);
    expect(screen.getByText(/Arakal Industries/i)).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);
    NAVIGATION.forEach((item) => {
      expect(screen.getByRole("link", { name: item.name })).toBeInTheDocument();
    });
  });

  it("renders Get Quote button", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /Get Quote/i })).toBeInTheDocument();
  });

  it("renders mobile menu button on mobile viewport", () => {
    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === "(max-width: 768px)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<Header />);
    // Mobile menu button should be present (it's always rendered, just hidden on desktop)
    const menuButton = screen.queryByRole("button", { name: /Toggle menu/i });
    expect(menuButton).toBeInTheDocument();
  });
});

