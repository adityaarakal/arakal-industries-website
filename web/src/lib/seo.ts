/**
 * SEO utilities for structured data (Schema.org markup)
 */

import { SITE_CONFIG, COMPANY_INFO } from "./constants";

/**
 * Generate Organization schema (JSON-LD)
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.description,
    foundingDate: COMPANY_INFO.founded.toString(),
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.locations[0].address,
      addressLocality: "Solapur",
      addressRegion: "Maharashtra",
      postalCode: "413006",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY_INFO.contact.phone,
      contactType: "Customer Service",
      email: COMPANY_INFO.contact.email,
      areaServed: "Worldwide",
      availableLanguage: ["en", "hi"],
    },
    sameAs: [
      // Add social media links when available
      // COMPANY_INFO.social.linkedin,
    ],
  };
}

/**
 * Generate LocalBusiness schema for each location
 */
export function generateLocalBusinessSchema(location: typeof COMPANY_INFO.locations[0]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/locations#${location.name.toLowerCase().replace(/\s+/g, "-")}`,
    name: `${COMPANY_INFO.name} - ${location.name}`,
    image: `${SITE_CONFIG.url}/images/locations/${location.name.toLowerCase().replace(/\s+/g, "-")}.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.split(",")[0],
      addressLocality: "Solapur",
      addressRegion: "Maharashtra",
      postalCode: "413006",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    telephone: COMPANY_INFO.contact.phone,
    url: `${SITE_CONFIG.url}/locations`,
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}

/**
 * Generate Product schema
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  image?: string;
  category?: string;
  sku?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image || `${SITE_CONFIG.url}/images/products/${product.name.toLowerCase().replace(/\s+/g, "-")}.jpg`,
    category: product.category || "Textile",
    sku: product.sku || product.name.toLowerCase().replace(/\s+/g, "-"),
    brand: {
      "@type": "Brand",
      name: COMPANY_INFO.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      url: `${SITE_CONFIG.url}/products`,
    },
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate Certification schema
 */
export function generateCertificationSchema(certifications: Array<{
  name: string;
  issuingOrganization: string;
  certificateNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  url?: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    hasCredential: certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: cert.issuingOrganization,
      recognizedBy: {
        "@type": "Organization",
        name: cert.issuingOrganization,
      },
      ...(cert.certificateNumber && { identifier: cert.certificateNumber }),
      ...(cert.issueDate && { dateCreated: cert.issueDate }),
      ...(cert.expiryDate && { validUntil: cert.expiryDate }),
      ...(cert.url && { url: cert.url }),
    })),
  };
}

