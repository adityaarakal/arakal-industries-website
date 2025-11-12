import Link from "next/link";
import { COMPANY_INFO, NAVIGATION, SOCIAL_LINKS } from "@/lib/constants";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Footer navigation sections
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Manufacturing", href: "/manufacturing" },
        { name: "Sustainability", href: "/sustainability" },
        { name: "Locations", href: "/locations" },
      ],
    },
    {
      title: "Products",
      links: [
        { name: "All Products", href: "/products" },
        { name: "Terry Towels", href: "/products?category=terry" },
        { name: "Dobby Towels", href: "/products?category=dobby" },
        { name: "Jacquard Chaddars", href: "/products?category=jacquard" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Industries", href: "/industries" },
        { name: "Resources", href: "/resources" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{COMPANY_INFO.name}</h3>
            <p className="text-sm text-muted-foreground">{COMPANY_INFO.tagline}</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {COMPANY_INFO.locations[0].address}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${COMPANY_INFO.contact.phone}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {COMPANY_INFO.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${COMPANY_INFO.contact.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {COMPANY_INFO.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Footer Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-semibold">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              <p>
                © {currentYear} {COMPANY_INFO.name}. All rights reserved.
              </p>
              <p className="mt-1">
                Established in {COMPANY_INFO.founded} | Heritage since{" "}
                {COMPANY_INFO.heritage.handlooms}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {SOCIAL_LINKS.linkedin && (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {/* Add more social links as they become available */}
            </div>
          </div>

          {/* Production Info */}
          <div className="mt-6 text-xs text-muted-foreground text-center">
            <p>
              Production Capacity: {COMPANY_INFO.production.capacity} | Products:{" "}
              {COMPANY_INFO.production.products.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

