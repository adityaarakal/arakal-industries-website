/**
 * Consent management utilities
 * Handles cookie consent and analytics consent states
 */

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

/**
 * Get consent preferences from localStorage
 */
export function getConsentPreferences(): ConsentPreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      return JSON.parse(consent) as ConsentPreferences;
    }
  } catch (error) {
    console.error("Error reading consent preferences:", error);
  }

  return null;
}

/**
 * Check if analytics consent is given
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const preferences = getConsentPreferences();
  return preferences?.analytics === true || localStorage.getItem("analytics-consent") === "true";
}

/**
 * Check if marketing consent is given
 */
export function hasMarketingConsent(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const preferences = getConsentPreferences();
  return preferences?.marketing === true;
}

/**
 * Check if functional consent is given
 */
export function hasFunctionalConsent(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const preferences = getConsentPreferences();
  return preferences?.functional === true;
}

/**
 * Save consent preferences
 */
export function saveConsentPreferences(preferences: ConsentPreferences): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    // Set cookie with consent status
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    document.cookie = `cookie-consent=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    // Set analytics consent flag
    if (preferences.analytics) {
      localStorage.setItem("analytics-consent", "true");
    } else {
      localStorage.removeItem("analytics-consent");
    }
  } catch (error) {
    console.error("Error saving consent preferences:", error);
  }
}

/**
 * Clear consent preferences
 */
export function clearConsentPreferences(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("cookie-consent");
  localStorage.removeItem("analytics-consent");
  document.cookie = "cookie-consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

/**
 * Check if consent banner should be shown
 */
export function shouldShowConsentBanner(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const consent = localStorage.getItem("cookie-consent");
  return !consent;
}

