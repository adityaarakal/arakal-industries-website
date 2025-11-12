import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, COMPANY_INFO } from "@/lib/constants";
import { Package, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Products",
  description: "Premium quality terry towels, dobby towels, and jacquard chaddars manufactured in Solapur, Maharashtra",
  openGraph: {
    title: "Products | Arakal Industries",
    description: "Premium quality terry towels, dobby towels, and jacquard chaddars",
    url: `${SITE_CONFIG.url}/products`,
  },
};

export default function ProductsPage() {
  const products = [
    {
      name: "Terry Towels",
      description: "High-quality terry towels with excellent absorbency and durability. Perfect for hospitality, healthcare, and home use.",
      category: "terry",
      features: ["High GSM", "Excellent Absorbency", "Durable", "Soft Texture"],
    },
    {
      name: "Dobby Towels",
      description: "Premium dobby towels with intricate patterns and designs. Ideal for luxury hospitality and retail markets.",
      category: "dobby",
      features: ["Intricate Patterns", "Luxury Finish", "Custom Designs", "Premium Quality"],
    },
    {
      name: "Jacquard Chaddars",
      description: "Traditional jacquard chaddars with heritage designs. Crafted with precision and attention to detail.",
      category: "jacquard",
      features: ["Heritage Designs", "Traditional Craftsmanship", "Premium Materials", "Cultural Authenticity"],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Products</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Premium quality towels and textiles manufactured with precision and care. From terry
              towels to jacquard chaddars, we deliver excellence in every product.
            </p>
          </div>
        </Container>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.category}
                className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Package className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full group">
                  <Link href={`/products/${product.category}`}>
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
            <h2 className="text-3xl font-bold mb-4">Interested in Our Products?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us today to discuss your requirements and get a custom quote
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

