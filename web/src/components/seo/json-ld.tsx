/**
 * JSON-LD Structured Data Component
 * Renders JSON-LD scripts for SEO
 */

interface JSONLDProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JSONLD({ data }: JSONLDProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
