"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Facebook, Mail, Share2 } from "lucide-react";
import { trackSocialShare } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  variant?: "default" | "compact" | "icon-only";
}

export function SocialShare({
  url,
  title,
  description,
  className,
  variant = "default",
}: SocialShareProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : url;
  const shareTitle = title;
  const shareDescription = description || "";

  const handleShare = async (
    platform: string,
    shareUrl: string,
    shareTitle: string,
    shareDescription?: string
  ) => {
    // Track share event
    trackSocialShare(platform, shareUrl, shareTitle);

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedDescription = encodeURIComponent(shareDescription || "");

    let shareLink = "";

    switch (platform) {
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "email":
        shareLink = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`;
        break;
      case "native":
        // Use Web Share API if available
        if (typeof window !== "undefined" && navigator.share) {
          try {
            await navigator.share({
              title: shareTitle,
              text: shareDescription,
              url: shareUrl,
            });
            return;
          } catch (error) {
            // User cancelled or error occurred
            console.log("Share cancelled or failed:", error);
            return;
          }
        }
        break;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "noopener,noreferrer");
    }
  };

  const shareButtons = [
    {
      platform: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      color: "text-[#0077b5]",
    },
    {
      platform: "twitter",
      label: "Twitter",
      icon: Twitter,
      color: "text-[#1da1f2]",
    },
    {
      platform: "facebook",
      label: "Facebook",
      icon: Facebook,
      color: "text-[#1877f2]",
    },
    {
      platform: "email",
      label: "Email",
      icon: Mail,
      color: "text-muted-foreground",
    },
  ];

  const hasNativeShare = typeof window !== "undefined" && navigator.share;

  if (variant === "icon-only") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {hasNativeShare && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleShare("native", shareUrl, shareTitle, shareDescription)}
            aria-label="Share"
            className="h-9 w-9"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        )}
        {shareButtons.map(({ platform, label, icon: Icon, color }) => (
          <Button
            key={platform}
            variant="outline"
            size="icon"
            onClick={() => handleShare(platform, shareUrl, shareTitle, shareDescription)}
            aria-label={`Share on ${label}`}
            className="h-9 w-9"
          >
            <Icon className={cn("h-4 w-4", color)} />
          </Button>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {hasNativeShare && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("native", shareUrl, shareTitle, shareDescription)}
            className="h-8"
          >
            <Share2 className="h-3 w-3 mr-1" />
            Share
          </Button>
        )}
        {shareButtons.map(({ platform, label, icon: Icon, color }) => (
          <Button
            key={platform}
            variant="outline"
            size="sm"
            onClick={() => handleShare(platform, shareUrl, shareTitle, shareDescription)}
            className="h-8"
            aria-label={`Share on ${label}`}
          >
            <Icon className={cn("h-3 w-3", color)} />
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="text-sm font-medium">Share this page</div>
      <div className="flex flex-wrap gap-2">
        {hasNativeShare && (
          <Button
            variant="outline"
            onClick={() => handleShare("native", shareUrl, shareTitle, shareDescription)}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        )}
        {shareButtons.map(({ platform, label, icon: Icon, color }) => (
          <Button
            key={platform}
            variant="outline"
            onClick={() => handleShare(platform, shareUrl, shareTitle, shareDescription)}
            className="flex items-center gap-2"
            aria-label={`Share on ${label}`}
          >
            <Icon className={cn("h-4 w-4", color)} />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

