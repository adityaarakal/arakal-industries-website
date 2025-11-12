"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { hasAnalyticsConsent } from "@/lib/consent";

interface HotjarProps {
  hotjarId: string;
  hotjarVersion?: number;
  enabled?: boolean;
}

export function Hotjar({
  hotjarId,
  hotjarVersion = 6,
  enabled = true,
}: HotjarProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Check if analytics consent is given
    if (typeof window !== "undefined" && enabled) {
      // Only load Hotjar if analytics consent is given
      if (hasAnalyticsConsent()) {
        setShouldLoad(true);
      } else {
        // Listen for consent changes
        const handleConsentChange = () => {
          if (hasAnalyticsConsent()) {
            setShouldLoad(true);
          } else {
            setShouldLoad(false);
          }
        };
        window.addEventListener("consent-updated", handleConsentChange);
        // Also check periodically (in case consent is changed in the same session)
        const interval = setInterval(() => {
          if (hasAnalyticsConsent()) {
            setShouldLoad(true);
            clearInterval(interval);
          }
        }, 1000);
        return () => {
          window.removeEventListener("consent-updated", handleConsentChange);
          clearInterval(interval);
        };
      }
    }
  }, [enabled]);

  if (!hotjarId || !shouldLoad) {
    return null;
  }

  return (
    <Script
      id="hotjar-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${hotjarId},hjsv:${hotjarVersion}};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
      }}
    />
  );
}

