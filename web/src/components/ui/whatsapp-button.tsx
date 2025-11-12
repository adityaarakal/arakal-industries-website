"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface WhatsAppButtonProps {
  className?: string;
  variant?: "floating" | "inline";
  message?: string;
  label?: string;
}

export function WhatsAppButton({
  className,
  variant = "floating",
  message = "Hello, I'm interested in your products. Can you provide more information?",
  label = "Chat on WhatsApp",
}: WhatsAppButtonProps) {
  const whatsappUrl = React.useMemo(() => {
    const phone = COMPANY_INFO.contact.whatsapp?.replace(/[^\d]/g, "") || "";
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
  }, [message]);

  const handleClick = () => {
    // Track WhatsApp click event
    trackEvent("whatsapp_click", {
      source: variant === "floating" ? "floating_button" : "inline_button",
      message,
    });
  };

  if (variant === "floating") {
    return (
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BA5A] transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2",
          className
        )}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#25D366] text-white hover:bg-[#20BA5A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2",
        className
      )}
    >
      <MessageCircle className="mr-2 h-5 w-5" />
      {label}
    </Link>
  );
}
