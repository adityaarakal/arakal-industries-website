import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, projectId } from "./client";

// Only create builder if projectId is set
const builder = projectId ? imageUrlBuilder(client) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder || !source) {
    return null;
  }
  return builder.image(source);
}

export function urlForImage(source: SanityImageSource) {
  if (!source || !builder) return null;
  const url = urlFor(source);
  return url ? url.width(800).height(600).url() : null;
}

export function urlForThumbnail(source: SanityImageSource) {
  if (!source || !builder) return null;
  const url = urlFor(source);
  return url ? url.width(400).height(300).url() : null;
}

export function urlForHero(source: SanityImageSource) {
  if (!source || !builder) return null;
  const url = urlFor(source);
  return url ? url.width(1920).height(1080).url() : null;
}

