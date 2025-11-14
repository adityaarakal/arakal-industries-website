import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight } from "lucide-react";
import { urlForImage } from "@/lib/sanity/image";
import { ProductComparison } from "@/components/products/product-comparison";

interface Product {
  _id: string;
  name: string;
  slug?: { current: string };
  description: string;
  category: string;
  features?: string[];
  images?: Array<{ alt?: string; asset?: any }>;
  gsm?: number;
  material?: string;
  colors?: string[];
  specifications?: Record<string, string>;
}

interface ProductsListProps {
  products: Product[];
  className?: string;
}

export function ProductsList({ products, className }: ProductsListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg text-muted-foreground mb-2">No products found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className || ""}`}>
      {products.map((product) => {
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
                  alt={product.images?.[0]?.alt || product.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
  );
}

