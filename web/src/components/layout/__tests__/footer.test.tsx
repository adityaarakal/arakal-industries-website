import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../footer";
import { COMPANY_INFO, NAVIGATION, SOCIAL_LINKS } from "@/lib/constants";

describe("Footer", () => {
  it("renders company name", () => {
    render(<Footer />);
    expect(screen.getByText(COMPANY_INFO.name)).toBeInTheDocument();
  });

  it("renders company tagline", () => {
    render(<Footer />);
    expect(screen.getByText(COMPANY_INFO.tagline)).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Footer />);
    NAVIGATION.forEach((item) => {
      expect(screen.getByRole("link", { name: item.name })).toBeInTheDocument();
    });
  });

  it("renders contact information", () => {
    render(<Footer />);
    expect(screen.getByText(COMPANY_INFO.contact.phone)).toBeInTheDocument();
    expect(screen.getByText(COMPANY_INFO.contact.email)).toBeInTheDocument();
  });

  it("renders location addresses", () => {
    render(<Footer />);
    COMPANY_INFO.locations.forEach((location) => {
      expect(screen.getByText(location.address)).toBeInTheDocument();
    });
  });

  it("renders production information", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(COMPANY_INFO.production.capacity))).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<Footer />);
    if (SOCIAL_LINKS.linkedin) {
      const linkedinLink = screen.getByRole("link", { name: /LinkedIn/i });
      expect(linkedinLink).toHaveAttribute("href", SOCIAL_LINKS.linkedin);
      expect(linkedinLink).toHaveAttribute("target", "_blank");
      expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("renders copyright notice", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(COMPANY_INFO.name))).toBeInTheDocument();
  });
});

