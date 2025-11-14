import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { SITE_CONFIG } from "@/lib/constants";
import { Quote } from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { JSONLD } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what our customers say about Arakal Industries' products and services",
  openGraph: {
    title: "Testimonials | Arakal Industries",
    description: "Customer testimonials and reviews",
    url: `${SITE_CONFIG.url}/testimonials`,
  },
};

export default function TestimonialsPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Testimonials", href: "/testimonials" },
  ];

  return (
    <>
      {/* Breadcrumb Schema */}
      <JSONLD
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Testimonials", url: `${SITE_CONFIG.url}/testimonials` },
        ])}
      />

      {/* Breadcrumbs */}
      <Container className="py-6">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      {/* Hero Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Quote className="h-8 w-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Customer Testimonials</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover what our customers have to say about our products, service, and commitment
              to quality.
            </p>
          </div>
        </Container>
      </section>

      {/* Testimonials Grid */}
      <TestimonialsSection limit={12} showTitle={false} />

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center bg-primary text-primary-foreground rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Quality?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join our satisfied customers and discover the difference quality makes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary rounded-md hover:bg-gray-100 transition-colors"
              >
                Get Quote
              </a>
              <a
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-md hover:bg-white/10 transition-colors"
              >
                View Products
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}


