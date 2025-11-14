"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";
import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface VideoEmbedProps {
  title: string;
  videoType: "youtube" | "vimeo" | "direct";
  videoId?: string;
  videoUrl?: string;
  thumbnail?: { asset?: any; alt?: string };
  description?: string;
  transcript?: string;
  className?: string;
  autoplay?: boolean;
  showTitle?: boolean;
}

export function VideoEmbed({
  title,
  videoType,
  videoId,
  videoUrl,
  thumbnail,
  description,
  transcript,
  className,
  autoplay = false,
  showTitle = true,
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = thumbnail ? urlForImage(thumbnail) : null;

  const getEmbedUrl = () => {
    if (videoType === "youtube" && videoId) {
      return `https://www.youtube.com/embed/${videoId}${autoplay ? "?autoplay=1" : ""}`;
    }
    if (videoType === "vimeo" && videoId) {
      return `https://player.vimeo.com/video/${videoId}${autoplay ? "?autoplay=1" : ""}`;
    }
    if (videoType === "direct" && videoUrl) {
      return videoUrl;
    }
    return null;
  };

  const getWatchUrl = () => {
    if (videoType === "youtube" && videoId) {
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    if (videoType === "vimeo" && videoId) {
      return `https://vimeo.com/${videoId}`;
    }
    return videoUrl;
  };

  const embedUrl = getEmbedUrl();

  if (!embedUrl && !getWatchUrl()) {
    return null;
  }

  if (isPlaying && embedUrl) {
    return (
      <div className={cn("relative w-full aspect-video", className)}>
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
        {transcript && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
              View Transcript
            </summary>
            <div className="mt-2 p-4 bg-muted rounded-lg text-sm">{transcript}</div>
          </details>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      {showTitle && (
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
      )}
      <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden group">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={thumbnail?.alt || title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <Button
            size="lg"
            onClick={() => setIsPlaying(true)}
            className="rounded-full w-20 h-20 bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg"
            aria-label={`Play ${title}`}
          >
            <Play className="h-8 w-8 ml-1" fill="currentColor" />
          </Button>
        </div>

        {/* Video Info */}
        {description && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white text-sm line-clamp-2">{description}</p>
          </div>
        )}
      </div>

      {/* Watch on Platform Link */}
      {getWatchUrl() && (
        <div className="mt-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-sm"
          >
            <a
              href={getWatchUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on {videoType === "youtube" ? "YouTube" : videoType === "vimeo" ? "Vimeo" : "External Site"}
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
        </div>
      )}

      {/* Transcript */}
      {transcript && !isPlaying && (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
            View Transcript
          </summary>
          <div className="mt-2 p-4 bg-muted rounded-lg text-sm">{transcript}</div>
        </details>
      )}
    </div>
  );
}

