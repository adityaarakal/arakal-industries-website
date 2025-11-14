"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trackSearch } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ProductSearchProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function ProductSearch({
  className,
  placeholder = "Search products...",
  onSearch,
}: ProductSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState(searchParams?.get("q") || "");
  const [isFocused, setIsFocused] = React.useState(false);

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    
    if (trimmedQuery) {
      // Track search event
      trackSearch(trimmedQuery);

      // Update URL with search query
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set("q", trimmedQuery);
      router.push(`/products?${params.toString()}`);

      // Call custom onSearch handler if provided
      if (onSearch) {
        onSearch(trimmedQuery);
      }
    } else {
      // Clear search
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.delete("q");
      router.push(`/products?${params.toString()}`);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.delete("q");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}


