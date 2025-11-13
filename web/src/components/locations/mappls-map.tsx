"use client";

import * as React from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Location {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapplsPin?: string;
  digipin?: string;
}

interface MapplsMapProps {
  location: Location;
  className?: string;
  height?: string;
}

export function MapplsMap({ location, className, height = "400px" }: MapplsMapProps) {
  const [mapLoaded, setMapLoaded] = React.useState(false);
  const mapplsApiKey = process.env.NEXT_PUBLIC_MAPPLS_API_KEY;

  // Google Maps embed URL as fallback
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBFw0Qbyq9zTFTd-tUY6dRWTgQ6U7o8Ep0"}&q=${encodeURIComponent(location.address)}&zoom=15&center=${location.coordinates.lat},${location.coordinates.lng}`;

  // Mappls deep link URL
  const mapplsDeepLink = location.mapplsPin
    ? `https://mappls.com/?mappls=${location.mapplsPin}`
    : `https://mappls.com/?q=${location.coordinates.lat},${location.coordinates.lng}`;

  // For now, we'll use Google Maps embed as it's more reliable
  // Mappls JS SDK integration can be added later when API key is available
  // This provides a good fallback that works internationally

  return (
    <div className={cn("w-full", className)}>
      {/* Map Container */}
      <div className="relative w-full rounded-lg overflow-hidden border bg-muted" style={{ height }}>
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={googleMapsUrl}
          title={`${location.name} - Map`}
          onLoad={() => setMapLoaded(true)}
        />
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        )}
      </div>

      {/* Location Links */}
      <div className="mt-4 space-y-2">
        {/* Mappls Pin Link */}
        {location.mapplsPin && (
          <div className="text-sm">
            <a
              href={mapplsDeepLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center"
            >
              <MapPin className="h-4 w-4 mr-1" />
              Open in Mappls: {location.mapplsPin}
            </a>
          </div>
        )}
        {/* Digipin */}
        {location.digipin && (
          <div className="text-sm text-muted-foreground">
            Digipin: {location.digipin}
          </div>
        )}
        {/* Google Maps Link */}
        <div className="text-sm">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
