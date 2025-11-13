"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { trackPageView } from "@/lib/analytics";
import { hasAnalyticsConsent } from "@/lib/consent";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Check if analytics consent is given
    if (typeof window !== "undefined") {
      if (hasAnalyticsConsent()) {
        setShouldLoad(true);
      } else {
        // Listen for consent changes
        const handleConsentChange = () => {
          if (hasAnalyticsConsent()) {
            setShouldLoad(true);
          }
        };
        window.addEventListener("consent-updated", handleConsentChange);
        return () => {
          window.removeEventListener("consent-updated", handleConsentChange);
        };
      }
    }
  }, []);

  useEffect(() => {
    if (pathname && shouldLoad) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      trackPageView(url);
    }
  }, [pathname, searchParams, shouldLoad]);

  if (!measurementId || !shouldLoad) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}

