import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <Container className="py-20 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
          <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or
            the URL may be incorrect.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="group">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/products">
              <Search className="mr-2 h-5 w-5" />
              Browse Products
            </Link>
          </Button>
        </div>

        <div className="bg-muted p-6 rounded-lg text-left">
          <h3 className="text-lg font-semibold mb-4">Popular Pages</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-primary hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-primary hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-primary hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/locations" className="text-primary hover:underline">
                Locations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
