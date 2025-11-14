import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG, COMPANY_INFO } from "@/lib/constants";
import { ArrowRight, Factory, Award, Globe, Users } from "lucide-react";
import { getFeaturedCertifications, getFeaturedClientLogos, getFeaturedVideos } from "@/lib/sanity/fetch";
import { urlForImage } from "@/lib/sanity/image";
import { ClientLogos } from "@/components/clients/client-logos";
import { VideoEmbed } from "@/components/video/video-embed";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home",
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default async function HomePage() {
  const featuredCertifications = await getFeaturedCertifications().catch(() => []);
  const featuredClientLogos = await getFeaturedClientLogos().catch(() => []);
  const featuredVideos = await getFeaturedVideos().catch(() => []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {COMPANY_INFO.tagline}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Leading towel manufacturer in Solapur, Maharashtra, with a rich heritage spanning
              decades. From handlooms in 1940 to modern terry towel production, we deliver quality
              and excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/products">
                  View Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Get Quote</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {COMPANY_INFO.founded}
              </div>
              <div className="text-muted-foreground">Year Established</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {COMPANY_INFO.heritage.handlooms}
              </div>
              <div className="text-muted-foreground">Heritage Since</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {COMPANY_INFO.production.capacity}
              </div>
              <div className="text-muted-foreground">Annual Production</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Arakal Industries</h2>
            <p className="text-lg text-muted-foreground">
              Excellence in manufacturing, quality, and service for over three decades
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Factory className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Modern Manufacturing</h3>
              <p className="text-muted-foreground">
                State-of-the-art facilities in Solapur with advanced production capabilities
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Quality Excellence</h3>
              <p className="text-muted-foreground">
                Commitment to quality with rigorous quality control and certifications
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Global Reach</h3>
              <p className="text-muted-foreground">
                Serving clients across India and expanding to international markets
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Customer Focus</h3>
              <p className="text-muted-foreground">
                Dedicated customer service with personalized solutions for every client
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Certifications Section */}
      {featuredCertifications.length > 0 && (
        <section className="py-20 bg-muted/50">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Certifications & Quality Standards
              </h2>
              <p className="text-lg text-muted-foreground">
                Our commitment to quality is backed by industry-recognized certifications
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredCertifications.map((cert: any) => {
                const logoUrl = cert.logo ? urlForImage(cert.logo) : null;
                return (
                  <div
                    key={cert._id}
                    className="bg-background p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
                  >
                    {logoUrl ? (
                      <div className="relative w-full h-24">
                        <Image
                          src={logoUrl}
                          alt={cert.logo?.alt || cert.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <Award className="h-12 w-12 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium">{cert.name}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link href="/certifications">
                  View All Certifications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Client Logos Section */}
      {featuredClientLogos.length > 0 && (
        <section className="py-20">
          <Container>
            <ClientLogos logos={featuredClientLogos} variant="carousel" />
          </Container>
        </section>
      )}

      {/* Featured Videos Section */}
      {featuredVideos.length > 0 && (
        <section className="py-20 bg-muted/50">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Watch Our Story</h2>
              <p className="text-lg text-muted-foreground">
                Take a virtual tour of our facilities and see our manufacturing process
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featuredVideos.slice(0, 2).map((video: any) => (
                <VideoEmbed
                  key={video._id}
                  title={video.title}
                  videoType={video.videoType}
                  videoId={video.videoId}
                  videoUrl={video.videoUrl}
                  thumbnail={video.thumbnail}
                  description={video.description}
                  transcript={video.transcript}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Products Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Products</h2>
            <p className="text-lg text-muted-foreground">
              Premium quality towels for every need
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COMPANY_INFO.production.products.map((product) => (
              <div
                key={product}
                className="bg-background p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{product}</h3>
                <p className="text-muted-foreground mb-4">
                  High-quality {product.toLowerCase()} manufactured with precision and care
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/products">Learn More</Link>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center bg-primary/10 rounded-lg p-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us today to discuss your towel manufacturing needs and get a custom quote
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/products">View Products</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
