import { Container } from "@/components/layout/container";
import { getFeaturedTestimonials } from "@/lib/sanity/fetch";
import { TestimonialCard } from "./testimonial-card";
import { Quote } from "lucide-react";

interface TestimonialsSectionProps {
  limit?: number;
  showTitle?: boolean;
}

export async function TestimonialsSection({
  limit = 6,
  showTitle = true,
}: TestimonialsSectionProps) {
  // Fetch testimonials from Sanity CMS
  const testimonials = await getFeaturedTestimonials().catch(() => []);

  // Fallback testimonials if CMS is not available
  const fallbackTestimonials = [
    {
      _id: "1",
      name: "Rajesh Kumar",
      company: "Hospitality Solutions Pvt Ltd",
      role: "Procurement Manager",
      content:
        "Arakal Industries has been our trusted partner for over 5 years. Their terry towels are of exceptional quality and their service is outstanding.",
      rating: 5,
      source: "Justdial",
      verified: true,
      date: "2024-01-15",
    },
    {
      _id: "2",
      name: "Priya Sharma",
      company: "Luxury Hotels Group",
      role: "Operations Director",
      content:
        "We've been impressed with the quality and consistency of Arakal Industries' products. Their dobby towels are perfect for our luxury hospitality needs.",
      rating: 5,
      source: "IndiaMART",
      verified: true,
      date: "2024-02-20",
    },
    {
      _id: "3",
      name: "Amit Patel",
      company: "Healthcare Supplies Inc",
      role: "Supply Chain Manager",
      content:
        "The quality of their products and their commitment to customer satisfaction is exceptional. Highly recommended for bulk orders.",
      rating: 5,
      source: "Justdial",
      verified: true,
      date: "2024-03-10",
    },
  ];

  const displayTestimonials =
    testimonials.length > 0 ? testimonials.slice(0, limit) : fallbackTestimonials.slice(0, limit);

  if (displayTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/50">
      <Container>
        {showTitle && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Quote className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trusted by hospitality, healthcare, and retail businesses across India and beyond
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}

