import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, COMPANY_INFO } from "@/lib/constants";
import { Calendar, Factory, Users, Award, ArrowRight } from "lucide-react";
import { getHeritageTimeline } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Arakal Industries - A multi-generational textile manufacturer with heritage since 1940, specializing in premium terry towels and textiles in Solapur, Maharashtra",
  openGraph: {
    title: "About Us | Arakal Industries",
    description: "Multi-generational textile manufacturer with heritage since 1940",
    url: `${SITE_CONFIG.url}/about`,
  },
};

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour

export default async function AboutPage() {
  // Fetch heritage timeline from Sanity CMS
  const heritageTimelineItems = await getHeritageTimeline().catch(() => []);

  // Fallback heritage timeline if CMS is not available
  const fallbackTimeline = [
    {
      _id: "1",
      year: COMPANY_INFO.heritage.handlooms,
      title: "Handloom Roots",
      description: "Arakal family begins handloom operations, laying the foundation for textile manufacturing excellence.",
    },
    {
      _id: "2",
      year: COMPANY_INFO.heritage.jacquard,
      title: "Jacquard Expansion",
      description: "Expansion into jacquard chaddars, showcasing traditional craftsmanship and design expertise.",
    },
    {
      _id: "3",
      year: COMPANY_INFO.heritage.terryTowels,
      title: "Terry Towel Production",
      description: "Launch of terry towel production under Arakal Textiles, marking entry into modern textile manufacturing.",
    },
    {
      _id: "4",
      year: COMPANY_INFO.founded,
      title: "Arakal Industries",
      description: "Formation of Arakal Industries, establishing the company as a leading towel manufacturer in Solapur.",
    },
  ];

  const timeline = heritageTimelineItems.length > 0 ? heritageTimelineItems : fallbackTimeline;
  const sortedTimeline = [...timeline].sort((a, b) => a.year - b.year);

  const values = [
    {
      icon: <Factory className="h-8 w-8" />,
      title: "Manufacturing Excellence",
      description: "State-of-the-art facilities with advanced production capabilities and quality control.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality First",
      description: "Commitment to quality with rigorous quality control measures and certifications.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Focus",
      description: "Dedicated customer service with personalized solutions for every client's needs.",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Heritage & Legacy",
      description: "Multi-generational expertise spanning decades of textile manufacturing experience.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Arakal Industries</h1>
            <p className="text-lg text-muted-foreground mb-8">
              A multi-generational, family-owned textile manufacturer with a rich heritage spanning
              decades. From handlooms in 1940 to modern terry towel production, we deliver quality
              and excellence.
            </p>
          </div>
        </Container>
      </section>

      {/* Heritage Timeline */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Heritage</h2>
            <div className="space-y-8">
              {sortedTimeline.map((item, index) => (
                <div key={item._id || index} className="relative pl-8 border-l-2 border-primary">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full border-4 border-background" />
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-primary">{item.year}</span>
                    <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-card border rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Production Stats */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Production Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {COMPANY_INFO.production.capacity}
                </div>
                <div className="text-muted-foreground">Annual Production</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {COMPANY_INFO.production.products.length}
                </div>
                <div className="text-muted-foreground">Product Categories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {COMPANY_INFO.locations.length}
                </div>
                <div className="text-muted-foreground">Manufacturing Facilities</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us today to discuss your requirements and discover how we can help you
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
