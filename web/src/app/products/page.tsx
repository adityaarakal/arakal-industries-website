import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { Package, ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/sanity/fetch";
import { urlForImage } from "@/lib/sanity/image";
import { generateProductSchema, generateWebSiteSchema } from "@/lib/seo";
import { JSONLD } from "@/components/seo/json-ld";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Products",
  description: "Premium quality terry towels, dobby towels, and jacquard chaddars manufactured in Solapur, Maharashtra",
  openGraph: {
    title: "Products | Arakal Industries",
    description: "Premium quality terry towels, dobby towels, and jacquard chaddars",
    url: `${SITE_CONFIG.url}/products`,
  },
};

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour

export default async function ProductsPage() {
  // Fetch products from Sanity CMS
  const products = await getProducts().catch(() => []);

  // Fallback products if CMS is not available
  const fallbackProducts = [
    {
      _id: "1",
      name: "Terry Towels",
      slug: { current: "terry-towels" },
      description: "High-quality terry towels with excellent absorbency and durability. Perfect for hospitality, healthcare, and home use.",
      category: "terry",
      features: ["High GSM", "Excellent Absorbency", "Durable", "Soft Texture"],
      images: [],
    },
    {
      _id: "2",
      name: "Dobby Towels",
      slug: { current: "dobby-towels" },
      description: "Premium dobby towels with intricate patterns and designs. Ideal for luxury hospitality and retail markets.",
      category: "dobby",
      features: ["Intricate Patterns", "Luxury Finish", "Custom Designs", "Premium Quality"],
      images: [],
    },
    {
      _id: "3",
      name: "Jacquard Chaddars",
      slug: { current: "jacquard-chaddars" },
      description: "Traditional jacquard chaddars with heritage designs. Crafted with precision and attention to detail.",
      category: "jacquard",
      features: ["Heritage Designs", "Traditional Craftsmanship", "Premium Materials", "Cultural Authenticity"],
      images: [],
    },
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  return (
    <>
      {/* Structured Data - Product Schema for each product */}
      {displayProducts.map((product) => (
        <JSONLD
          key={`product-schema-${product._id}`}
          data={generateProductSchema({
            name: product.name,
            description: product.description,
            category: product.category,
            sku: product.slug?.current || product.category,
          })}
        />
      ))}
      {/* Structured Data - WebSite Schema */}
      <JSONLD data={generateWebSiteSchema()} />
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
            {displayProducts.map((product) => {
              const imageUrl = product.images?.[0] ? urlForImage(product.images[0]) : null;
              return (
                <div
                  key={product._id}
                  className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  {imageUrl && (
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={product.images[0]?.alt || product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Package className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  {product.features && (
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center text-sm">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button asChild variant="outline" className="w-full group">
                    <Link href={`/products/${product.slug?.current || product.category}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              );
            })}
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
