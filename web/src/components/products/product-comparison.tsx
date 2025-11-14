"use client";

import * as React from "react";
import { X, Plus, Trash2, Print } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PrintButton } from "@/components/ui/print-button";
import { urlForImage } from "@/lib/sanity/image";
import { trackEvent } from "@/lib/analytics";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  slug?: { current: string };
  description?: string;
  category?: string;
  gsm?: number;
  material?: string;
  colors?: string[];
  images?: Array<{ asset?: any; alt?: string }>;
  specifications?: Record<string, string>;
  features?: string[];
}

interface ProductComparisonProps {
  products: Product[];
  maxProducts?: number;
}

const MAX_COMPARISON_PRODUCTS = 3;

export function ProductComparison({ products, maxProducts = MAX_COMPARISON_PRODUCTS }: ProductComparisonProps) {
  const [comparisonProducts, setComparisonProducts] = React.useState<Product[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const addToComparison = (product: Product) => {
    if (comparisonProducts.length >= maxProducts) {
      return;
    }
    if (comparisonProducts.some((p) => p._id === product._id)) {
      return;
    }
    setComparisonProducts([...comparisonProducts, product]);
    trackEvent("product_comparison_add", {
      event_category: "engagement",
      event_label: product.name,
      product_id: product._id,
    });
  };

  const removeFromComparison = (productId: string) => {
    setComparisonProducts(comparisonProducts.filter((p) => p._id !== productId));
    trackEvent("product_comparison_remove", {
      event_category: "engagement",
      product_id: productId,
    });
  };

  const clearComparison = () => {
    setComparisonProducts([]);
    trackEvent("product_comparison_clear", {
      event_category: "engagement",
    });
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && comparisonProducts.length > 0) {
      trackEvent("product_comparison_view", {
        event_category: "engagement",
        product_count: comparisonProducts.length,
      });
    }
  };

  if (comparisonProducts.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="print-hide">
            <Plus className="h-4 w-4 mr-2" />
            Compare Products
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Products to Compare</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {products
              .filter((p) => !comparisonProducts.some((cp) => cp._id === p._id))
              .map((product) => {
                const imageUrl = product.images?.[0] ? urlForImage(product.images[0]) : null;
                return (
                  <div
                    key={product._id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => addToComparison(product)}
                  >
                    {imageUrl && (
                      <div className="relative w-full h-32 mb-3 rounded overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={product.images?.[0]?.alt || product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <Button size="sm" variant="outline" className="w-full">
                      <Plus className="h-3 w-3 mr-1" />
                      Add to Compare
                    </Button>
                  </div>
                );
              })}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="print-hide">
          Compare ({comparisonProducts.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Compare Products</DialogTitle>
            <div className="flex items-center gap-2">
              <PrintButton variant="outline" size="sm" />
              <Button variant="outline" size="sm" onClick={clearComparison}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-4 text-left sticky left-0 bg-background z-10 min-w-[200px]">
                  Feature
                </th>
                {comparisonProducts.map((product) => (
                  <th key={product._id} className="border p-4 text-center min-w-[250px]">
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 absolute top-2 right-2 print-hide"
                        onClick={() => removeFromComparison(product._id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {product.images?.[0] && (
                        <div className="relative w-32 h-32 mb-2">
                          <Image
                            src={urlForImage(product.images[0])}
                            alt={product.images[0]?.alt || product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <Link
                        href={`/products/${product.slug?.current || product.category}`}
                        className="text-sm text-primary hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Description */}
              <tr>
                <td className="border p-4 font-semibold bg-muted">Description</td>
                {comparisonProducts.map((product) => (
                  <td key={product._id} className="border p-4">
                    {product.description || "—"}
                  </td>
                ))}
              </tr>

              {/* Category */}
              <tr>
                <td className="border p-4 font-semibold bg-muted">Category</td>
                {comparisonProducts.map((product) => (
                  <td key={product._id} className="border p-4">
                    {product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : "—"}
                  </td>
                ))}
              </tr>

              {/* GSM */}
              <tr>
                <td className="border p-4 font-semibold bg-muted">GSM</td>
                {comparisonProducts.map((product) => (
                  <td key={product._id} className="border p-4">
                    {product.gsm || "—"}
                  </td>
                ))}
              </tr>

              {/* Material */}
              <tr>
                <td className="border p-4 font-semibold bg-muted">Material</td>
                {comparisonProducts.map((product) => (
                  <td key={product._id} className="border p-4">
                    {product.material || "—"}
                  </td>
                ))}
              </tr>

              {/* Colors */}
              <tr>
                <td className="border p-4 font-semibold bg-muted">Available Colors</td>
                {comparisonProducts.map((product) => (
                  <td key={product._id} className="border p-4">
                    {product.colors && product.colors.length > 0 ? product.colors.join(", ") : "—"}
                  </td>
                ))}
              </tr>

              {/* Features */}
              <tr>
                <td className="border p-4 font-semibold bg-muted">Features</td>
                {comparisonProducts.map((product) => (
                  <td key={product._id} className="border p-4">
                    {product.features && product.features.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {product.features.map((feature: string, index: number) => (
                          <li key={index} className="text-sm">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "—"
                    )}
                  </td>
                ))}
              </tr>

              {/* Specifications */}
              {comparisonProducts.some((p) => p.specifications) && (
                <>
                  {Object.keys(
                    comparisonProducts.reduce((acc, product) => {
                      if (product.specifications) {
                        Object.keys(product.specifications).forEach((key) => {
                          acc[key] = true;
                        });
                      }
                      return acc;
                    }, {} as Record<string, boolean>)
                  ).map((specKey) => (
                    <tr key={specKey}>
                      <td className="border p-4 font-semibold bg-muted capitalize">
                        {specKey.replace(/([A-Z])/g, " $1").trim()}
                      </td>
                      {comparisonProducts.map((product) => (
                        <td key={product._id} className="border p-4">
                          {product.specifications?.[specKey] || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              )}

              {/* Actions */}
              <tr>
                <td className="border p-4 font-semibold bg-muted">Actions</td>
                {comparisonProducts.map((product) => (
                  <td key={product._id} className="border p-4 text-center">
                    <Button asChild size="sm" className="w-full">
                      <Link href={`/products/${product.slug?.current || product.category}`}>
                        Get Quote
                      </Link>
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {comparisonProducts.length < maxProducts && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-3">
              Add {maxProducts - comparisonProducts.length} more product{maxProducts - comparisonProducts.length > 1 ? "s" : ""} to compare
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {products
                .filter((p) => !comparisonProducts.some((cp) => cp._id === p._id))
                .slice(0, 3)
                .map((product) => (
                  <Button
                    key={product._id}
                    variant="outline"
                    size="sm"
                    onClick={() => addToComparison(product)}
                    className="justify-start"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {product.name}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

