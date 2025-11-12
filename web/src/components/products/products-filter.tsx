"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductsFilterProps {
  initialCategory?: string;
}

export function ProductsFilter({ initialCategory = "" }: ProductsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = [
    { value: "all", label: "All Products" },
    { value: "terry", label: "Terry Towels" },
    { value: "dobby", label: "Dobby Towels" },
    { value: "jacquard", label: "Jacquard Chaddars" },
  ];

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center space-x-2">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm font-semibold">Filter by Category:</span>
      </div>
      <Select
        value={initialCategory || "all"}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
