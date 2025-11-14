"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface PrintButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function PrintButton({ className, variant = "outline", size = "default" }: PrintButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      onClick={handlePrint}
      variant={variant}
      size={size}
      className={className}
      aria-label="Print this page"
    >
      <Printer className="h-4 w-4 mr-2" />
      Print
    </Button>
  );
}

