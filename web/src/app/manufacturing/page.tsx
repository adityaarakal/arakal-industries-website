import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { SITE_CONFIG, COMPANY_INFO } from "@/lib/constants";
import { Factory, Settings, CheckCircle, Award, ArrowRight } from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { JSONLD } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Manufacturing",
  description: "Learn about our manufacturing processes, quality control, and production capabilities at Arakal Industries",
  openGraph: {
    title: "Manufacturing | Arakal Industries",
    description: "State-of-the-art manufacturing processes and quality control",
    url: `${SITE_CONFIG.url}/manufacturing`,
  },
};

export default function ManufacturingPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Manufacturing", href: "/manufacturing" },
  ];

  const processes = [
    {
      title: "Weaving",
      description:
        "Advanced weaving technology for terry, dobby, and jacquard fabrics. Precision and quality in every thread.",
      icon: <Settings className="h-8 w-8" />,
    },
    {
      title: "Dyeing",
      description:
        "Expert dyeing processes ensuring colorfastness and vibrant colors. Meeting international quality standards.",
      icon: <Settings className="h-8 w-8" />,
    },
    {
      title: "Finishing",
      description:
        "Professional finishing processes for softness, durability, and quality. Final touches that make the difference.",
      icon: <Settings className="h-8 w-8" />,
    },
    {
      title: "Quality Control",
      description:
        "Rigorous quality control at every stage. Ensuring each product meets our high standards before delivery.",
      icon: <CheckCircle className="h-8 w-8" />,
    },
  ];

  const capabilities = [
    {
      title: "Production Capacity",
      value: COMPANY_INFO.production.capacity,
      description: "Annual production capacity",
    },
    {
      title: "Product Range",
      value: `${COMPANY_INFO.production.products.length} Categories`,
      description: "Terry, Dobby, and Jacquard products",
    },
    {
      title: "Facilities",
      value: `${COMPANY_INFO.locations.length} Locations`,
      description: "Manufacturing facilities in Solapur",
    },
    {
      title: "Quality Standards",
      value: "Certified",
      description: "Meeting international quality standards",
    },
  ];

  return (
    <>
      {/* Breadcrumb Schema */}
      <JSONLD
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Manufacturing", url: `${SITE_CONFIG.url}/manufacturing` },
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
              <Factory className="h-8 w-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Manufacturing Excellence</h1>
            <p className="text-lg text-muted-foreground mb-8">
              State-of-the-art manufacturing processes with advanced technology and quality control.
              Delivering excellence in every product.
            </p>
          </div>
        </Container>
      </section>

      {/* Manufacturing Processes */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Manufacturing Processes</h2>
            <p className="text-lg text-muted-foreground">
              From raw materials to finished products, we ensure quality at every step
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {processes.map((process, index) => (
              <div key={index} className="bg-card border rounded-lg p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {process.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {capabilities.map((capability, index) => (
                <div key={index} className="bg-card border rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{capability.value}</div>
                  <h3 className="text-lg font-semibold mb-2">{capability.title}</h3>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Quality Assurance */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mr-4">
                  <Award className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold">Quality Assurance</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                At Arakal Industries, quality is our top priority. We maintain rigorous quality
                control standards at every stage of the manufacturing process, from raw materials to
                finished products.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span>Rigorous quality control at every stage</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span>Meeting international quality standards</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span>Certified manufacturing processes</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span>Continuous improvement and innovation</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Interested in Our Manufacturing?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us to learn more about our manufacturing processes and capabilities
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

