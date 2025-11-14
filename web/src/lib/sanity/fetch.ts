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
  clientLogosQuery,
  featuredClientLogosQuery,
  videosQuery,
  featuredVideosQuery,
  videosByCategoryQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  featuredBlogPostsQuery,
  blogPostsByCategoryQuery,
  blogCategoriesQuery,
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

// Client Logo fetchers
export async function getClientLogos() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(clientLogosQuery);
  } catch (error) {
    console.error("Error fetching client logos:", error);
    return [];
  }
}

export async function getFeaturedClientLogos() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(featuredClientLogosQuery);
  } catch (error) {
    console.error("Error fetching featured client logos:", error);
    return [];
  }
}

// Video fetchers
export async function getVideos() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(videosQuery);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export async function getFeaturedVideos() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(featuredVideosQuery);
  } catch (error) {
    console.error("Error fetching featured videos:", error);
    return [];
  }
}

export async function getVideosByCategory(category: string) {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(videosByCategoryQuery, { category });
  } catch (error) {
    console.error("Error fetching videos by category:", error);
    return [];
  }
}

// Blog fetchers
export async function getBlogPosts() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(blogPostsQuery);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    if (!projectId) {
      return null;
    }
    return await client.fetch(blogPostBySlugQuery, { slug });
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
}

export async function getFeaturedBlogPosts() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(featuredBlogPostsQuery);
  } catch (error) {
    console.error("Error fetching featured blog posts:", error);
    return [];
  }
}

export async function getBlogPostsByCategory(categoryId: string) {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(blogPostsByCategoryQuery, { categoryId });
  } catch (error) {
    console.error("Error fetching blog posts by category:", error);
    return [];
  }
}

export async function getBlogCategories() {
  try {
    if (!projectId) {
      return [];
    }
    return await client.fetch(blogCategoriesQuery);
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
}

