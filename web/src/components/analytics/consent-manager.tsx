"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { cn } from "@/lib/utils";
import { saveConsentPreferences, shouldShowConsentBanner, getConsentPreferences } from "@/lib/consent";
import type { ConsentPreferences } from "@/lib/consent";

interface ConsentManagerProps {
  onConsentChange?: (preferences: ConsentPreferences) => void;
}

export function ConsentManager({ onConsentChange }: ConsentManagerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if consent has already been given
    if (typeof window !== "undefined") {
      const savedPreferences = getConsentPreferences();
      if (savedPreferences) {
        setPreferences(savedPreferences);
        setShowBanner(false);
        if (onConsentChange) {
          onConsentChange(savedPreferences);
        }
      } else {
        setShowBanner(shouldShowConsentBanner());
      }
    }
  }, [onConsentChange]);

  const handleSaveConsent = (prefs: ConsentPreferences) => {
    if (typeof window !== "undefined") {
      saveConsentPreferences(prefs);
      setPreferences(prefs);
      setShowBanner(false);
      setShowSettings(false);
      if (onConsentChange) {
        onConsentChange(prefs);
      }
      // Dispatch custom event for consent change
      window.dispatchEvent(new CustomEvent("consent-updated", { detail: prefs }));
      // Reload the page to apply consent changes
      window.location.reload();
    }
  };

  const handleAcceptAll = () => {
    handleSaveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  };

  const handleRejectAll = () => {
    handleSaveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  };

  const handleSavePreferences = () => {
    handleSaveConsent(preferences);
  };

  const updatePreference = (key: keyof ConsentPreferences, value: boolean) => {
    if (key === "necessary") return; // Cannot disable necessary cookies
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  if (!showBanner && !showSettings) {
    return null;
  }

  return (
    <>
      {/* Consent Banner */}
      {showBanner && (
        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg p-4 md:p-6",
            "animate-in slide-in-from-bottom duration-300"
          )}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Cookie className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Cookie Consent</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  We use cookies to enhance your browsing experience, analyze site traffic, and
                  personalize content. By clicking "Accept All", you consent to our use of cookies.
                  You can manage your preferences or learn more in our{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 md:ml-4">
                <Button variant="outline" onClick={() => setShowSettings(true)} size="sm">
                  Customize
                </Button>
                <Button variant="outline" onClick={handleRejectAll} size="sm">
                  Reject All
                </Button>
                <Button onClick={handleAcceptAll} size="sm">
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consent Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Cookie Preferences</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Manage your cookie preferences. You can enable or disable different types of cookies
                below. Learn more in our{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </p>

              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Necessary Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      These cookies are essential for the website to function properly. They cannot
                      be disabled.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="h-5 w-5 rounded border-gray-300"
                    />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Analytics Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      These cookies help us understand how visitors interact with our website by
                      collecting and reporting information anonymously (Google Analytics, Hotjar).
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => updatePreference("analytics", e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300"
                    />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Marketing Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      These cookies are used to track visitors across websites to display relevant
                      ads and measure campaign effectiveness.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => updatePreference("marketing", e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300"
                    />
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Functional Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      These cookies enable enhanced functionality and personalization, such as
                      remembering your preferences.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => updatePreference("functional", e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <Button variant="outline" onClick={handleRejectAll} className="flex-1">
                  Reject All
                </Button>
                <Button variant="outline" onClick={handleAcceptAll} className="flex-1">
                  Accept All
                </Button>
                <Button onClick={handleSavePreferences} className="flex-1">
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

