import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { SocialShare } from "@/components/ui/social-share";
import { SITE_CONFIG, COMPANY_INFO } from "@/lib/constants";
import { Package, ArrowRight, Check, Download } from "lucide-react";
import { getProducts, getProductBySlug } from "@/lib/sanity/fetch";
import { urlForImage } from "@/lib/sanity/image";
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { JSONLD } from "@/components/seo/json-ld";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts().catch(() => []);
  return products.map((product: any) => ({
    slug: product.slug?.current || product.category,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | ${SITE_CONFIG.name}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${SITE_CONFIG.name}`,
      description: product.description,
      url: `${SITE_CONFIG.url}/products/${slug}`,
      images: product.images?.[0]
        ? [
            {
              url: urlForImage(product.images[0]) || "",
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  // Fallback product if CMS is not available or product not found
  const fallbackProduct = {
    _id: slug,
    name: slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    slug: { current: slug },
    description: `Premium quality ${slug.split("-")[0]} towels with excellent quality and durability.`,
    category: slug.split("-")[0],
    gsm: undefined,
    material: undefined,
    colors: undefined,
    images: [],
    specifications: undefined,
    features: ["High Quality", "Durable", "Soft Texture", "Excellent Absorbency"],
    featured: false,
  };

  const displayProduct = product || fallbackProduct;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Products", href: "/products" },
    { label: displayProduct.name, href: `/products/${slug}` },
  ];

  const imageUrl = displayProduct.images?.[0] ? urlForImage(displayProduct.images[0]) : null;

  return (
    <>
      {/* Structured Data - Product Schema */}
      <JSONLD
        data={generateProductSchema({
          name: displayProduct.name,
          description: displayProduct.description,
          category: displayProduct.category,
          sku: displayProduct.slug?.current || displayProduct.category,
          image: imageUrl || undefined,
        })}
      />
      {/* Breadcrumb Schema */}
      <JSONLD
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Products", url: `${SITE_CONFIG.url}/products` },
          { name: displayProduct.name, url: `${SITE_CONFIG.url}/products/${slug}` },
        ])}
      />

      {/* Breadcrumbs */}
      <Container className="py-6">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      {/* Hero Section */}
      <section className="py-12 bg-muted/50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              {imageUrl ? (
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={displayProduct.images[0]?.alt || displayProduct.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                  <Package className="h-24 w-24 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{displayProduct.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">
                {displayProduct.description}
              </p>

              {/* Product Features */}
              {displayProduct.features && displayProduct.features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                  <ul className="space-y-2">
                    {displayProduct.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Request Quote
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group">
                  <Link href="/resources">
                    <Download className="mr-2 h-4 w-4" />
                    Download Brochure
                  </Link>
                </Button>
              </div>

              {/* Social Sharing */}
              <SocialShare
                url={`${SITE_CONFIG.url}/products/${slug}`}
                title={displayProduct.name}
                description={displayProduct.description}
                variant="compact"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Product Details */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Specifications */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="font-semibold text-sm text-muted-foreground">
                      Category
                    </dt>
                    <dd className="mt-1 capitalize">{displayProduct.category}</dd>
                  </div>
                  {displayProduct.gsm && (
                    <div>
                      <dt className="font-semibold text-sm text-muted-foreground">
                        GSM
                      </dt>
                      <dd className="mt-1">{displayProduct.gsm}</dd>
                    </div>
                  )}
                  {displayProduct.material && (
                    <div>
                      <dt className="font-semibold text-sm text-muted-foreground">
                        Material
                      </dt>
                      <dd className="mt-1">{displayProduct.material}</dd>
                    </div>
                  )}
                  {displayProduct.colors && displayProduct.colors.length > 0 && (
                    <div>
                      <dt className="font-semibold text-sm text-muted-foreground">
                        Available Colors
                      </dt>
                      <dd className="mt-1">{displayProduct.colors.join(", ")}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Applications */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Applications</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Hospitality</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Healthcare</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Residential</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Commercial</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-muted/50">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* This would fetch related products - placeholder for now */}
            <div className="bg-card border rounded-lg p-6 text-center">
              <p className="text-muted-foreground">
                Related products will be displayed here
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center bg-primary text-primary-foreground rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-4">Interested in {displayProduct.name}?</h2>
            <p className="text-lg mb-8 opacity-90">
              Contact us today to discuss your requirements and get a custom quote
            </p>
            <Button asChild size="lg" variant="secondary" className="group">
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
