import { Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  _id: string;
  name: string;
  company?: string;
  role?: string;
  content: string;
  rating?: number;
  source?: string;
  verified?: boolean;
  date?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const rating = testimonial.rating || 5;
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div
      className={cn(
        "bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow",
        className
      )}
    >
      {/* Rating */}
      {rating && (
        <div className="flex items-center space-x-1 mb-4">
          {stars.map((star) => (
            <Star
              key={star}
              className={cn(
                "h-4 w-4",
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-300 text-gray-300"
              )}
            />
          ))}
        </div>
      )}

      {/* Testimonial Content */}
      <p className="text-muted-foreground mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>

      {/* Author Info */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">{testimonial.name}</h3>
            {testimonial.verified && (
              <CheckCircle2 className="h-4 w-4 text-primary" aria-label="Verified" />
            )}
          </div>
          {testimonial.role && (
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          )}
          {testimonial.company && (
            <p className="text-sm text-muted-foreground">{testimonial.company}</p>
          )}
        </div>
      </div>

      {/* Source & Date */}
      {(testimonial.source || testimonial.date) && (
        <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
          {testimonial.source && (
            <span className="capitalize">Source: {testimonial.source}</span>
          )}
          {testimonial.date && (
            <span>{new Date(testimonial.date).toLocaleDateString("en-IN")}</span>
          )}
        </div>
      )}
    </div>
  );
}

