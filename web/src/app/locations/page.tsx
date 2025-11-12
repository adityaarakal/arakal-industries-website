import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, COMPANY_INFO } from "@/lib/constants";
import { MapPin, Phone, Mail, Factory, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Locations",
  description: "Visit our manufacturing facilities in Solapur, Maharashtra. Gandhi Nagar and Solapur MIDC locations with state-of-the-art production capabilities",
  openGraph: {
    title: "Locations | Arakal Industries",
    description: "Manufacturing facilities in Solapur, Maharashtra",
    url: `${SITE_CONFIG.url}/locations`,
  },
};

export default function LocationsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Locations</h1>
            <p className="text-lg text-muted-foreground mb-8">
              State-of-the-art manufacturing facilities in Solapur, Maharashtra. Strategically
              located for efficient production and distribution across India and internationally.
            </p>
          </div>
        </Container>
      </section>

      {/* Facilities Section */}
      <section className="py-20">
        <Container>
          <div className="space-y-12">
            {COMPANY_INFO.locations.map((location, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-card border rounded-lg p-8"
              >
                <div>
                  <div className="flex items-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mr-4">
                      <Factory className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold">{location.name}</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                      <p className="text-muted-foreground">{location.address}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-muted-foreground mr-3" />
                      <a
                        href={`tel:${COMPANY_INFO.contact.phone}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {COMPANY_INFO.contact.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                      <a
                        href={`mailto:${COMPANY_INFO.contact.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {COMPANY_INFO.contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground mb-2">
                      Mappls Pin: {location.mapplsPin}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Digipin: {location.digipin}
                    </p>
                  </div>
                  {/* Map placeholder - will be replaced with Mappls integration */}
                  <div className="mt-6">
                    <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Map integration coming soon (Mappls JS SDK)
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Facility Details</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Production Capacity</h4>
                      <p className="text-muted-foreground">
                        Part of our {COMPANY_INFO.production.capacity} annual production capacity
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Products Manufactured</h4>
                      <ul className="space-y-1">
                        {COMPANY_INFO.production.products.map((product) => (
                          <li key={product} className="text-muted-foreground">
                            • {product}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Location Advantages</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Strategic location in Solapur</li>
                        <li>• Easy access to transportation networks</li>
                        <li>• Close to raw material sources</li>
                        <li>• Skilled local workforce</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Visit Information */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Planning a Visit?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We welcome visitors to our facilities. Please contact us in advance to schedule a
              factory tour and see our manufacturing processes firsthand.
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Schedule a Visit
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

