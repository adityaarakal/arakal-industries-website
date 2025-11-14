import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";
import { Building2, Hotel, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { JSONLD } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Industries",
  description: "Serving diverse industries including hospitality, healthcare, retail, and wellness with premium towel solutions",
  openGraph: {
    title: "Industries | Arakal Industries",
    description: "Serving diverse industries with premium towel solutions",
    url: `${SITE_CONFIG.url}/industries`,
  },
};

export default function IndustriesPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Industries", href: "/industries" },
  ];

  const industries = [
    {
      name: "Hospitality",
      icon: <Hotel className="h-8 w-8" />,
      description:
        "Premium towels for hotels, resorts, and hospitality establishments. High-quality, durable, and designed for commercial use.",
      features: ["High GSM", "Commercial Grade", "Custom Branding", "Bulk Orders"],
    },
    {
      name: "Healthcare",
      icon: <Heart className="h-8 w-8" />,
      description:
        "Hygienic and durable towels for hospitals, clinics, and healthcare facilities. Meeting healthcare industry standards.",
      features: ["Hygienic", "Medical Grade", "Durable", "Compliance Standards"],
    },
    {
      name: "Retail",
      icon: <ShoppingBag className="h-8 w-8" />,
      description:
        "Private label towels for retail brands. Custom designs, packaging, and branding options for your brand.",
      features: ["Private Label", "Custom Designs", "Branding Options", "Packaging"],
    },
    {
      name: "Wellness & Spa",
      icon: <Building2 className="h-8 w-8" />,
      description:
        "Luxury towels for spas, wellness centers, and fitness facilities. Premium quality for premium experiences.",
      features: ["Luxury Quality", "Premium Finish", "Spa Grade", "Soft Texture"],
    },
  ];

  return (
    <>
      {/* Breadcrumb Schema */}
      <JSONLD
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Industries", url: `${SITE_CONFIG.url}/industries` },
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Industries We Serve</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Providing premium towel solutions across diverse industries. From hospitality to
              healthcare, we deliver quality and excellence.
            </p>
          </div>
        </Container>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="bg-card border rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  {industry.icon}
                </div>
                <h2 className="text-2xl font-bold mb-4">{industry.name}</h2>
                <p className="text-muted-foreground mb-6">{industry.description}</p>
                <ul className="space-y-2 mb-6">
                  {industry.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="group">
                  <Link href="/contact">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Custom Solutions?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us to discuss your industry-specific requirements and get custom solutions
              tailored to your needs.
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Get Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

