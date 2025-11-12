import { createClient } from "next-sanity";
import type { SanityClient } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
export const token = process.env.SANITY_API_READ_TOKEN;

// Create a fallback client that won't break if projectId is missing
const getClientConfig = () => {
  if (!projectId) {
    // Return a minimal config for development
    return {
      projectId: "placeholder",
      dataset,
      apiVersion,
      useCdn: false,
      token: undefined,
      perspective: "published" as const,
    };
  }

  return {
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
    token,
    perspective: "published" as const,
  };
};

export const client: SanityClient = createClient(getClientConfig());

// For preview mode (draft content)
export const previewClient: SanityClient = createClient({
  ...getClientConfig(),
  useCdn: false,
  perspective: "drafts" as const,
});

export const getClient = (preview?: boolean): SanityClient => {
  if (!projectId) {
    console.warn("NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity CMS features will not work.");
  }
  return preview ? previewClient : client;
};

