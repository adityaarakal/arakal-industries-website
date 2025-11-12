"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="en-IN">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-4">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
              <p className="text-lg text-muted-foreground mb-8">
                We're sorry, but something unexpected happened. Please try again or contact us if
                the problem persists.
              </p>
              {error.digest && (
                <p className="text-sm text-muted-foreground mb-4">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button onClick={reset} size="lg" className="group">
                <RefreshCw className="mr-2 h-5 w-5" />
                Try Again
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go to Homepage
                </Link>
              </Button>
            </div>

            <div className="bg-muted p-6 rounded-lg text-left">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                If you continue to experience issues, please contact our support team:
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-primary hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:info@arakalindustries.com"
                    className="text-primary hover:underline"
                  >
                    Email Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
