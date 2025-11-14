import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { GatedDownload } from "@/components/resources/gated-download";
import { SITE_CONFIG } from "@/lib/constants";
import { FileText, Download, BookOpen, ArrowRight } from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { JSONLD } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Resources",
  description: "Download brochures, buyer guides, certifications, and resources from Arakal Industries",
  openGraph: {
    title: "Resources | Arakal Industries",
    description: "Download brochures, buyer guides, and resources",
    url: `${SITE_CONFIG.url}/resources`,
  },
};

export default function ResourcesPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Resources", href: "/resources" },
  ];

  const resources = [
    {
      title: "Product Brochure",
      description: "Comprehensive product catalog with specifications, features, and pricing information.",
      icon: <FileText className="h-8 w-8" />,
      type: "PDF",
      size: "2.5 MB",
    },
    {
      title: "Buyer Guide",
      description: "Complete guide for buyers with product information, ordering process, and FAQs.",
      icon: <BookOpen className="h-8 w-8" />,
      type: "PDF",
      size: "1.8 MB",
    },
    {
      title: "Certifications",
      description: "View our certifications and quality standards documentation.",
      icon: <FileText className="h-8 w-8" />,
      type: "PDF",
      size: "1.2 MB",
    },
    {
      title: "Product Specifications",
      description: "Detailed product specifications and technical information for all our products.",
      icon: <FileText className="h-8 w-8" />,
      type: "PDF",
      size: "3.1 MB",
    },
  ];

  return (
    <>
      {/* Breadcrumb Schema */}
      <JSONLD
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Resources", url: `${SITE_CONFIG.url}/resources` },
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Resources</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Download brochures, buyer guides, certifications, and other resources to learn more
              about our products and services.
            </p>
          </div>
        </Container>
      </section>

      {/* Resources Grid */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                    {resource.icon}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {resource.type} • {resource.size}
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-3">{resource.title}</h2>
                <p className="text-muted-foreground mb-6">{resource.description}</p>
                <GatedDownload
                  resourceTitle={resource.title}
                  resourceUrl={`/resources/${resource.title.toLowerCase().replace(/\s+/g, "-")}.pdf`}
                  resourceType={resource.type}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Additional Information */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Need More Information?</h2>
            <div className="bg-card border rounded-lg p-8">
              <p className="text-muted-foreground mb-6">
                If you need additional information or have specific questions about our products or
                services, please don't hesitate to contact us. Our team is ready to assist you with
                any inquiries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/products">View Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

