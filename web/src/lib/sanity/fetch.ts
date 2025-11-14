import { client, projectId } from "./client";
import {
  productsQuery,
  productBySlugQuery,
  featuredProductsQuery,
  locationsQuery,
  locationByIdQuery,
  heritageTimelineQuery,
  pageBySlugQuery,
  industriesQuery,
  resourcesQuery,
  testimonialsQuery,
  featuredTestimonialsQuery,
  settingsQuery,
  certificationsQuery,
  featuredCertificationsQuery,
} from "./queries";

// Product fetchers
export async function getProducts() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(productsQuery);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    if (!projectId) {
      return null;
    }
    return await client.fetch(productBySlugQuery, { slug });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

export async function getFeaturedProducts() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(featuredProductsQuery);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

// Location fetchers
export async function getLocations() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(locationsQuery);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}

export async function getLocationById(id: string) {
  try {
    if (!projectId) {
      return null;
    }
    return await client.fetch(locationByIdQuery, { id });
  } catch (error) {
    console.error("Error fetching location by id:", error);
    return null;
  }
}

// Heritage timeline fetchers
export async function getHeritageTimeline() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(heritageTimelineQuery);
  } catch (error) {
    console.error("Error fetching heritage timeline:", error);
    return [];
  }
}

// Page fetchers
export async function getPageBySlug(slug: string) {
  try {
    if (!projectId) {
      return null;
    }
    return await client.fetch(pageBySlugQuery, { slug });
  } catch (error) {
    console.error("Error fetching page by slug:", error);
    return null;
  }
}

// Industry fetchers
export async function getIndustries() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(industriesQuery);
  } catch (error) {
    console.error("Error fetching industries:", error);
    return [];
  }
}

// Resource fetchers
export async function getResources() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(resourcesQuery);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
}

// Testimonial fetchers
export async function getTestimonials() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(testimonialsQuery);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

export async function getFeaturedTestimonials() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(featuredTestimonialsQuery);
  } catch (error) {
    console.error("Error fetching featured testimonials:", error);
    return [];
  }
}

// Settings fetchers
export async function getSettings() {
  try {
    if (!projectId) {
      return null;
    }
    return await client.fetch(settingsQuery);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

// Certification fetchers
export async function getCertifications() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(certificationsQuery);
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return [];
  }
}

export async function getFeaturedCertifications() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(featuredCertificationsQuery);
  } catch (error) {
    console.error("Error fetching featured certifications:", error);
    return [];
  }
}

