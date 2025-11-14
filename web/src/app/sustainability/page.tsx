import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";
import { Leaf, Recycle, Droplets, Sun, ArrowRight } from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { JSONLD } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Our commitment to sustainable manufacturing practices and environmental responsibility at Arakal Industries",
  openGraph: {
    title: "Sustainability | Arakal Industries",
    description: "Sustainable manufacturing practices and environmental responsibility",
    url: `${SITE_CONFIG.url}/sustainability`,
  },
};

export default function SustainabilityPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Sustainability", href: "/sustainability" },
  ];

  const commitments = [
    {
      title: "Water Conservation",
      icon: <Droplets className="h-8 w-8" />,
      description:
        "Implementing water-efficient manufacturing processes and water recycling systems to minimize water consumption.",
    },
    {
      title: "Energy Efficiency",
      icon: <Sun className="h-8 w-8" />,
      description:
        "Using energy-efficient machinery and processes to reduce energy consumption and carbon footprint.",
    },
    {
      title: "Waste Reduction",
      icon: <Recycle className="h-8 w-8" />,
      description:
        "Minimizing waste through efficient production processes and recycling programs for manufacturing waste.",
    },
    {
      title: "Sustainable Materials",
      icon: <Leaf className="h-8 w-8" />,
      description:
        "Sourcing sustainable and eco-friendly materials where possible, ensuring responsible supply chain practices.",
    },
  ];

  return (
    <>
      {/* Breadcrumb Schema */}
      <JSONLD
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Sustainability", url: `${SITE_CONFIG.url}/sustainability` },
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Leaf className="h-8 w-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Sustainability</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Our commitment to sustainable manufacturing practices and environmental
              responsibility. Building a better future through responsible production.
            </p>
          </div>
        </Container>
      </section>

      {/* Sustainability Commitments */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Sustainability Commitments</h2>
            <p className="text-lg text-muted-foreground">
              We are committed to sustainable manufacturing practices and environmental
              responsibility
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commitments.map((commitment, index) => (
              <div key={index} className="bg-card border rounded-lg p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {commitment.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{commitment.title}</h3>
                <p className="text-muted-foreground">{commitment.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Environmental Responsibility */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Environmental Responsibility</h2>
              <p className="text-muted-foreground mb-6">
                At Arakal Industries, we recognize our responsibility towards the environment and
                future generations. We are committed to sustainable manufacturing practices that
                minimize our environmental impact while maintaining the highest quality standards.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Our Approach</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Sustainable manufacturing processes</li>
                    <li>• Energy-efficient operations</li>
                    <li>• Water conservation initiatives</li>
                    <li>• Waste reduction and recycling</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Our Goals</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Reduce environmental footprint</li>
                    <li>• Improve resource efficiency</li>
                    <li>• Sustainable supply chain</li>
                    <li>• Continuous improvement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Us in Our Sustainability Journey</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us to learn more about our sustainability practices and how we can work
              together for a sustainable future
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

