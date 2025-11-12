/**
 * Application constants and configuration
 */

export const SITE_CONFIG = {
  name: "Arakal Industries",
  description: "Premium towel manufacturer in Solapur, Maharashtra",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  locale: "en-IN",
  companyName: "Arakal Industries",
  tagline: "Premium Towel Solutions Backed by Decades of Craftsmanship",
} as const;

export const COMPANY_INFO = {
  name: "Arakal Industries",
  tagline: "Premium Towel Solutions Backed by Decades of Craftsmanship",
  founded: 1997,
  heritage: {
    handlooms: 1940,
    jacquard: 1965,
    terryTowels: 1984,
  },
  locations: [
    {
      name: "Gandhi Nagar Facility",
      address: "14/36, Gandhi Nagar, Akkalkot Road, Solapur - 413006",
      coordinates: {
        lat: 17.673226,
        lng: 75.931096,
      },
      mapplsPin: "ktzkbn",
      digipin: "432-FC2-42LM",
    },
    {
      name: "Solapur MIDC Facility",
      address: "Solapur MIDC, Solapur, Maharashtra - 413006",
      coordinates: {
        lat: 17.658951,
        lng: 75.934328,
      },
      mapplsPin: "2ce1be",
      digipin: "432-FCP-8LLL",
    },
  ],
  contact: {
    phone: "+91-217-2745260",
    email: "info@arakalindustries.com",
    whatsapp: "+91-217-2745260",
  },
  production: {
    capacity: "800-1000 tons per annum",
    products: ["Terry Towels", "Dobby Towels", "Jacquard Chaddars"],
  },
} as const;

export const NAVIGATION = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Industries", href: "/industries" },
  { name: "Manufacturing", href: "/manufacturing" },
  { name: "Sustainability", href: "/sustainability" },
  { name: "About", href: "/about" },
  { name: "Resources", href: "/resources" },
  { name: "Locations", href: "/locations" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/rohit-arakal-59b47973/",
  // Add other social links as they become available
} as const;

export const EXTERNAL_LISTINGS = {
  justdial: "https://www.justdial.com/Solapur/Arakal-Industries-Near-Lakshmi-Mandir-Gandhi-Nagar/9999PX217-X217-190912000227-H8L2_BZDET",
  indiamart: "https://www.indiamart.com/arakal-industries-rajanikant-fabrics/",
  handlooms: "https://handlooms.com/arakal.html",
  tatanexarc: "https://www.tatanexarc.com/company/arakal-textile-trade-utn6530ara21dmc/",
  companycheck: "https://www.thecompanycheck.com/org/arakal-industries/bfc63a4a9b",
} as const;
