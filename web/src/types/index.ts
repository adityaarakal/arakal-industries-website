/**
 * TypeScript type definitions for Arakal Industries website
 */

export interface CompanyLocation {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapplsPin: string;
  digipin: string;
  phone?: string;
  email?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: "terry" | "dobby" | "jacquard" | "custom";
  gsm?: number;
  material?: string;
  colors?: string[];
  images?: string[];
  specifications?: Record<string, string>;
  featured?: boolean;
}

export interface Lead {
  id?: string;
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: string;
  referrer?: string;
  metadata?: Record<string, unknown>;
  status?: "new" | "contacted" | "qualified" | "converted" | "archived";
}

export interface NewsletterSubscription {
  email: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  role?: string;
  content: string;
  rating?: number;
  source?: "justdial" | "indiamart" | "internal";
  verified?: boolean;
  date?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  category?: string;
  featuredImage?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
  external?: boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkbox" | "radio";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface AnalyticsEvent {
  eventName: string;
  eventData?: Record<string, unknown>;
  userId?: string;
  sessionId?: string;
  page?: string;
  referrer?: string;
}

