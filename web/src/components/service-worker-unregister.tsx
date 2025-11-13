"use client";

import { useEffect } from "react";

/**
 * Component to unregister any existing service workers
 * This fixes issues where cached service workers cause fetch errors
 */
export function ServiceWorkerUnregister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Unregister all service workers
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          for (const registration of registrations) {
            registration
              .unregister()
              .then((success) => {
                if (success) {
                  console.log("Service worker unregistered successfully");
                }
              })
              .catch((error) => {
                console.error("Error unregistering service worker:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error getting service worker registrations:", error);
        });

      // Also try to unregister by scope
      navigator.serviceWorker
        .getRegistration()
        .then((registration) => {
          if (registration) {
            registration
              .unregister()
              .then((success) => {
                if (success) {
                  console.log("Service worker unregistered successfully");
                }
              })
              .catch((error) => {
                console.error("Error unregistering service worker:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error getting service worker registration:", error);
        });
    }
  }, []);

  return null;
}

