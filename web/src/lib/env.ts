/**
 * Environment variable validation and configuration
 */

/**
 * Validates that required environment variables are set
 * Throws an error if any required variable is missing
 */
export function validateEnv() {
  const required = {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  };

  const missing: string[] = [];

  for (const [key, value] of Object.entries(required)) {
    if (!value) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}. Please check your .env.local file.`
    );
  }
}

/**
 * Get environment variable with optional default value
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

/**
 * Get optional environment variable
 */
export function getOptionalEnv(key: string): string | undefined {
  return process.env[key];
}

/**
 * Environment configuration object
 */
export const env = {
  // Database
  databaseUrl: getOptionalEnv("DATABASE_URL"),
  
  // Sanity CMS
  sanityProjectId: getOptionalEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  sanityDataset: getOptionalEnv("NEXT_PUBLIC_SANITY_DATASET") || "production",
  sanityApiReadToken: getOptionalEnv("SANITY_API_READ_TOKEN"),
  sanityApiWriteToken: getOptionalEnv("SANITY_API_WRITE_TOKEN"),
  
  // App
  appUrl: getOptionalEnv("NEXT_PUBLIC_APP_URL") || "http://localhost:3000",
  
  // Email
  resendApiKey: getOptionalEnv("RESEND_API_KEY"),
  resendFromEmail: getOptionalEnv("RESEND_FROM_EMAIL") || "noreply@arakalindustries.com",
  resendToEmail: getOptionalEnv("RESEND_TO_EMAIL"),
  
  // CRM
  hubspotApiKey: getOptionalEnv("HUBSPOT_API_KEY"),
  hubspotPortalId: getOptionalEnv("HUBSPOT_PORTAL_ID"),
  
  // Analytics
  gtmId: getOptionalEnv("NEXT_PUBLIC_GTM_ID"),
  gaMeasurementId: getOptionalEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
  hotjarId: getOptionalEnv("NEXT_PUBLIC_HOTJAR_ID"),
  
  // Maps
  mapplsApiKey: getOptionalEnv("NEXT_PUBLIC_MAPPLS_API_KEY"),
  
  // Node Environment
  nodeEnv: getOptionalEnv("NODE_ENV") || "development",
  isDevelopment: (getOptionalEnv("NODE_ENV") || "development") === "development",
  isProduction: getOptionalEnv("NODE_ENV") === "production",
} as const;
