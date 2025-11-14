"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

interface PortableTextProps {
  content: any;
  className?: string;
}

const components = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null;
      const imageUrl = urlForImage(value);
      if (!imageUrl) return null;

      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || "Blog post image"}
            width={1200}
            height={675}
            className="rounded-lg w-full h-auto"
          />
          {value.alt && (
            <p className="text-sm text-muted-foreground mt-2 text-center">{value.alt}</p>
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-semibold mt-5 mb-2">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-xl font-semibold mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children: React.ReactNode }) => {
      if (Array.isArray(children) && children.length === 0) {
        return <br />;
      }
      return <p className="mb-4 leading-relaxed">{children}</p>;
    },
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    link: ({ value, children }: { value: { href: string }; children: React.ReactNode }) => {
      const target = value?.href?.startsWith("http") ? "_blank" : undefined;
      const rel = target === "_blank" ? "noopener noreferrer" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-primary hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
  },
};

export function BlogPortableText({ content, className }: PortableTextProps) {
  if (!content) return null;

  return (
    <div className={className}>
      <PortableText value={content} components={components} />
    </div>
  );
}

