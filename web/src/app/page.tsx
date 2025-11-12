import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Home",
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">{COMPANY_INFO.name}</h1>
        <p className="text-xl mb-8 text-muted-foreground">{COMPANY_INFO.tagline}</p>
        <div className="flex gap-4">
          <Button asChild>
            <a href="/products">View Products</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </div>
    </main>
  );
}
