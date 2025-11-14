import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { Package, ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/sanity/fetch";
import { urlForImage } from "@/lib/sanity/image";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { generateProductSchema, generateWebSiteSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { JSONLD } from "@/components/seo/json-ld";
import { ProductsFilter } from "@/components/products/products-filter";
import { ProductSearch } from "@/components/products/product-search";
import { ProductsList } from "@/components/products/products-list";
import { ProductComparison } from "@/components/products/product-comparison";
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

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categoryFilter = params.category || "";
  const searchQuery = params.q || "";

  // Fetch products from Sanity CMS
  const products = await getProducts().catch(() => []);

  // Fallback products if CMS is not available
  const fallbackProducts = [
    {
      _id: "1",
      name: "Terry Towels",
      slug: { current: "terry-towels" },
      description:
        "High-quality terry towels with excellent absorbency and durability. Perfect for hospitality, healthcare, and home use.",
      category: "terry",
      features: ["High GSM", "Excellent Absorbency", "Durable", "Soft Texture"],
      images: [],
    },
    {
      _id: "2",
      name: "Dobby Towels",
      slug: { current: "dobby-towels" },
      description:
        "Premium dobby towels with intricate patterns and designs. Ideal for luxury hospitality and retail markets.",
      category: "dobby",
      features: ["Intricate Patterns", "Luxury Finish", "Custom Designs", "Premium Quality"],
      images: [],
    },
    {
      _id: "3",
      name: "Jacquard Chaddars",
      slug: { current: "jacquard-chaddars" },
      description:
        "Traditional jacquard chaddars with heritage designs. Crafted with precision and attention to detail.",
      category: "jacquard",
      features: [
        "Heritage Designs",
        "Traditional Craftsmanship",
        "Premium Materials",
        "Cultural Authenticity",
      ],
      images: [],
    },
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  // Filter products by category if filter is provided
  let filteredProducts =
    categoryFilter && categoryFilter !== "all"
      ? displayProducts.filter((product: any) => product.category === categoryFilter)
      : displayProducts;

  // Filter products by search query if provided
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product: any) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.features &&
          product.features.some((feature: string) => feature.toLowerCase().includes(query)))
    );
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Products", href: "/products" },
  ];

  return (
    <>
      {/* Structured Data - Product Schema for each product */}
      {displayProducts.map((product: any) => (
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
      {/* Breadcrumb Schema */}
      <JSONLD
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Products", url: `${SITE_CONFIG.url}/products` },
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Products</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Premium quality towels and textiles manufactured with precision and care. From terry
              towels to jacquard chaddars, we deliver excellence in every product.
            </p>
          </div>
        </Container>
      </section>

      {/* Products Grid with Filters */}
      <section className="py-20">
        <Container>
          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="max-w-md">
              <ProductSearch placeholder="Search products by name, description, or features..." />
            </div>
            {/* Filter */}
            <ProductsFilter initialCategory={categoryFilter} />
            {/* Search Results Info */}
            {searchQuery && (
              <div className="text-sm text-muted-foreground">
                {filteredProducts.length > 0 ? (
                  <>
                    Found {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
                  </>
                ) : (
                  <>No products found for &quot;{searchQuery}&quot;</>
                )}
              </div>
            )}
          </div>

          {/* Products Grid */}
          <ProductsList products={filteredProducts} />
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