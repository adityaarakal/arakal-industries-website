import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";
import { Award, Download, ExternalLink, Calendar } from "lucide-react";
import { getCertifications } from "@/lib/sanity/fetch";
import { urlForImage } from "@/lib/sanity/image";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { JSONLD } from "@/components/seo/json-ld";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Certifications & Quality Standards",
  description: "View our certifications, quality standards, and compliance credentials at Arakal Industries",
  openGraph: {
    title: "Certifications | Arakal Industries",
    description: "Our certifications and quality standards",
    url: `${SITE_CONFIG.url}/certifications`,
  },
};

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour

interface Certification {
  _id: string;
  name: string;
  issuingOrganization: string;
  description?: string;
  certificateNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  category: string;
  logo?: { asset?: any; alt?: string };
  certificateDocument?: { asset?: { url?: string } };
  featured?: boolean;
  order?: number;
  url?: string;
}

const categoryLabels: Record<string, string> = {
  quality: "Quality Management",
  environmental: "Environmental",
  safety: "Safety",
  industry: "Industry Standard",
  export: "Export",
  other: "Other",
};

export default async function CertificationsPage() {
  const certifications = await getCertifications().catch(() => []);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Certifications", href: "/certifications" },
  ];

  // Group certifications by category
  const groupedCertifications = certifications.reduce(
    (acc: Record<string, Certification[]>, cert: Certification) => {
      const category = cert.category || "other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(cert);
      return acc;
    },
    {}
  );

  return (
    <>
      {/* Breadcrumb Schema */}
      <JSONLD
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Certifications", url: `${SITE_CONFIG.url}/certifications` },
        ])}
      />

      {/* Breadcrumbs */}
      <Container className="py-6 print-hide">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      {/* Hero Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Award className="h-8 w-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Certifications & Quality Standards
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Arakal Industries is committed to maintaining the highest standards of quality,
              safety, and environmental responsibility. Our certifications demonstrate our
              dedication to excellence in manufacturing.
            </p>
          </div>
        </Container>
      </section>

      {/* Certifications by Category */}
      <section className="py-20">
        <Container>
          {Object.keys(groupedCertifications).length === 0 ? (
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-2">No certifications available</p>
              <p className="text-sm text-muted-foreground">
                Certifications will be displayed here once added to the CMS.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(groupedCertifications).map(([category, certs]) => (
                <div key={category}>
                  <h2 className="text-3xl font-bold mb-8">
                    {categoryLabels[category] || "Other Certifications"}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certs.map((cert: Certification) => {
                      const logoUrl = cert.logo ? urlForImage(cert.logo) : null;
                      const certificateUrl = cert.certificateDocument?.asset?.url;
                      const isExpired =
                        cert.expiryDate &&
                        new Date(cert.expiryDate) < new Date();

                      return (
                        <div
                          key={cert._id}
                          className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                          {/* Logo */}
                          {logoUrl && (
                            <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                              <Image
                                src={logoUrl}
                                alt={cert.logo?.alt || cert.name}
                                fill
                                className="object-contain p-4"
                              />
                            </div>
                          )}

                          {/* Certification Info */}
                          <div className="space-y-3">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{cert.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {cert.issuingOrganization}
                              </p>
                            </div>

                            {cert.description && (
                              <p className="text-sm text-muted-foreground">
                                {cert.description}
                              </p>
                            )}

                            {/* Certificate Details */}
                            <div className="space-y-2 text-sm">
                              {cert.certificateNumber && (
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">Certificate #:</span>
                                  <span className="font-medium">{cert.certificateNumber}</span>
                                </div>
                              )}

                              {cert.issueDate && (
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Issued:</span>
                                  <span>
                                    {new Date(cert.issueDate).toLocaleDateString()}
                                  </span>
                                </div>
                              )}

                              {cert.expiryDate && (
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Expires:</span>
                                  <span
                                    className={isExpired ? "text-destructive font-medium" : ""}
                                  >
                                    {new Date(cert.expiryDate).toLocaleDateString()}
                                    {isExpired && " (Expired)"}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 pt-4">
                              {certificateUrl && (
                                <Button asChild variant="outline" size="sm" className="w-full">
                                  <a
                                    href={certificateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Certificate
                                  </a>
                                </Button>
                              )}

                              {cert.url && (
                                <Button asChild variant="outline" size="sm" className="w-full">
                                  <a
                                    href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Verify Online
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

