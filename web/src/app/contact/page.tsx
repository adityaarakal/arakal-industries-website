import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { RFQForm } from "@/components/forms/rfq-form";
import { SITE_CONFIG, COMPANY_INFO } from "@/lib/constants";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Arakal Industries. Contact us for product inquiries, quotes, or any questions about our towel manufacturing services in Solapur, Maharashtra",
  openGraph: {
    title: "Contact Us | Arakal Industries",
    description: "Get in touch with Arakal Industries for product inquiries and quotes",
    url: `${SITE_CONFIG.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Get in touch with us for product inquiries, quotes, or any questions about our
              manufacturing services.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-card border rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <a
                href={`tel:${COMPANY_INFO.contact.phone}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {COMPANY_INFO.contact.phone}
              </a>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <a
                href={`mailto:${COMPANY_INFO.contact.email}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {COMPANY_INFO.contact.email}
              </a>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-muted-foreground">{COMPANY_INFO.locations[0].address}</p>
            </div>
          </div>

          {/* RFQ Form Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Request a Quote</h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you with a custom quote
              </p>
            </div>
            <RFQForm source="web" />
          </div>
        </Container>
      </section>

      {/* Additional Information */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Contact Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border rounded-lg p-6">
                <MessageSquare className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Product Inquiries</h3>
                <p className="text-muted-foreground">
                  Learn more about our product range, specifications, and customization options.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <MessageSquare className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quote Requests</h3>
                <p className="text-muted-foreground">
                  Get custom quotes for bulk orders and discuss pricing and delivery timelines.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <MessageSquare className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Partnership Opportunities</h3>
                <p className="text-muted-foreground">
                  Explore partnership opportunities and distributor relationships.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <MessageSquare className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Support</h3>
                <p className="text-muted-foreground">
                  Get support for existing orders or technical assistance with our products.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

