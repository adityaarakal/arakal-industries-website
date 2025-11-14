"use client";

import * as React from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

interface ClientLogo {
  _id: string;
  name: string;
  logo?: { asset?: any; alt?: string };
  url?: string;
  category?: string;
  description?: string;
}

interface ClientLogosProps {
  logos: ClientLogo[];
  className?: string;
  showTitle?: boolean;
  variant?: "grid" | "carousel" | "marquee";
}

export function ClientLogos({
  logos,
  className,
  showTitle = true,
  variant = "grid",
}: ClientLogosProps) {
  if (logos.length === 0) {
    return null;
  }

  if (variant === "marquee") {
    return (
      <div className={cn("overflow-hidden", className)}>
        {showTitle && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Our Clients & Partners</h2>
            <p className="text-muted-foreground">
              Trusted by leading businesses across industries
            </p>
          </div>
        )}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {logos.map((logo) => {
              const logoUrl = logo.logo ? urlForImage(logo.logo) : null;
              if (!logoUrl) return null;

              return (
                <div
                  key={logo._id}
                  className="flex-shrink-0 mx-8 flex items-center justify-center h-24 w-48"
                >
                  {logo.url ? (
                    <a
                      href={logo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src={logoUrl}
                        alt={logo.logo?.alt || logo.name}
                        width={192}
                        height={96}
                        className="object-contain max-h-24"
                      />
                    </a>
                  ) : (
                    <Image
                      src={logoUrl}
                      alt={logo.logo?.alt || logo.name}
                      width={192}
                      height={96}
                      className="object-contain max-h-24 opacity-60"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
            {logos.map((logo) => {
              const logoUrl = logo.logo ? urlForImage(logo.logo) : null;
              if (!logoUrl) return null;

              return (
                <div
                  key={`${logo._id}-duplicate`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center h-24 w-48"
                >
                  {logo.url ? (
                    <a
                      href={logo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src={logoUrl}
                        alt={logo.logo?.alt || logo.name}
                        width={192}
                        height={96}
                        className="object-contain max-h-24"
                      />
                    </a>
                  ) : (
                    <Image
                      src={logoUrl}
                      alt={logo.logo?.alt || logo.name}
                      width={192}
                      height={96}
                      className="object-contain max-h-24 opacity-60"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "carousel") {
    return (
      <div className={cn("relative", className)}>
        {showTitle && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Our Clients & Partners</h2>
            <p className="text-muted-foreground">
              Trusted by leading businesses across industries
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {logos.map((logo) => {
            const logoUrl = logo.logo ? urlForImage(logo.logo) : null;
            if (!logoUrl) return null;

            return (
              <div
                key={logo._id}
                className="flex items-center justify-center h-24 bg-background rounded-lg border p-4 hover:shadow-md transition-shadow"
              >
                {logo.url ? (
                  <a
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={logoUrl}
                      alt={logo.logo?.alt || logo.name}
                      width={192}
                      height={96}
                      className="object-contain max-h-20"
                    />
                  </a>
                ) : (
                  <Image
                    src={logoUrl}
                    alt={logo.logo?.alt || logo.name}
                    width={192}
                    height={96}
                    className="object-contain max-h-20 opacity-60"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default grid variant
  return (
    <div className={cn("", className)}>
      {showTitle && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Clients & Partners</h2>
          <p className="text-lg text-muted-foreground">
            Trusted by leading businesses across industries
          </p>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {logos.map((logo) => {
          const logoUrl = logo.logo ? urlForImage(logo.logo) : null;
          if (!logoUrl) return null;

          return (
            <div
              key={logo._id}
              className="flex items-center justify-center h-32 bg-background rounded-lg border p-6 hover:shadow-lg transition-shadow"
            >
              {logo.url ? (
                <a
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                  title={logo.name}
                >
                  <Image
                    src={logoUrl}
                    alt={logo.logo?.alt || logo.name}
                    width={192}
                    height={96}
                    className="object-contain max-h-20"
                  />
                </a>
              ) : (
                <Image
                  src={logoUrl}
                  alt={logo.logo?.alt || logo.name}
                  width={192}
                  height={96}
                  className="object-contain max-h-20 opacity-60"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

