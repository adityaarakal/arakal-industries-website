import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateFAQSchema } from "@/lib/seo";
import { JSONLD } from "@/components/seo/json-ld";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Frequently asked questions about Arakal Industries, our products, manufacturing, and services",
  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "FAQ", href: "/faq" },
  ];

  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is Arakal Industries?",
          answer:
            "Arakal Industries is a multi-generational, family-owned towel manufacturer based in Solapur, Maharashtra. With over 80 years of textile heritage, we specialize in producing premium quality terry towels, dobby towels, and jacquard chaddars.",
        },
        {
          question: "Where is Arakal Industries located?",
          answer:
            "We have two manufacturing facilities in Solapur, Maharashtra: Gandhi Nagar Facility (14/36, Gandhi Nagar, Akkalkot Road, Solapur - 413006) and Solapur MIDC Facility (Solapur MIDC, Solapur, Maharashtra - 413006).",
        },
        {
          question: "What is your annual production capacity?",
          answer:
            "Our annual production capacity is 800-1000 tons per annum, with products including Terry Towels, Dobby Towels, and Jacquard Chaddars.",
        },
        {
          question: "How long has Arakal Industries been in business?",
          answer:
            "Arakal Industries was established in 1997. However, our textile heritage dates back to 1940 when the Arakal family started with handlooms, expanded into jacquard chaddars in 1965, and launched terry towel production in 1984.",
        },
      ],
    },
    {
      category: "Products",
      questions: [
        {
          question: "What types of towels do you manufacture?",
          answer:
            "We manufacture three main types of towels: Terry Towels (high-quality, highly absorbent towels perfect for hospitality and home use), Dobby Towels (elegant designs with intricate patterns), and Jacquard Chaddars (traditional jacquard chaddars with heritage designs).",
        },
        {
          question: "What are the specifications of your products?",
          answer:
            "Our products come in various GSM (grams per square meter) ranges, materials, and colors. For specific specifications, please contact us or download our product brochure from the Resources page.",
        },
        {
          question: "Do you offer custom products?",
          answer:
            "Yes, we offer custom textile solutions tailored to your specific requirements. Please contact us to discuss your needs, and we'll work with you to create the perfect solution.",
        },
        {
          question: "What certifications do your products have?",
          answer:
            "Our products meet various international standards and certifications. For specific certification information, please contact us or visit our Resources page to download certification documents.",
        },
      ],
    },
    {
      category: "Manufacturing",
      questions: [
        {
          question: "What is your manufacturing process?",
          answer:
            "Our manufacturing process involves state-of-the-art facilities and rigorous quality control measures. We use modern machinery and traditional craftsmanship to produce high-quality towels. For more details, please visit our Manufacturing page.",
        },
        {
          question: "What quality control measures do you have?",
          answer:
            "We implement strict quality control measures throughout our manufacturing process, including material inspection, in-process quality checks, and final product testing to ensure consistent quality.",
        },
        {
          question: "Do you offer factory tours?",
          answer:
            "Yes, we welcome visitors to our facilities. Please contact us in advance to schedule a factory tour and see our manufacturing processes firsthand.",
        },
      ],
    },
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "What is the minimum order quantity?",
          answer:
            "Minimum order quantities vary depending on the product type and specifications. Please contact us with your requirements, and we'll provide you with detailed information about minimum order quantities and pricing.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship our products internationally. We have experience serving customers worldwide and can handle international shipping and logistics.",
        },
        {
          question: "What is your lead time?",
          answer:
            "Lead times vary depending on the product type, quantity, and customization requirements. Please contact us with your specific needs, and we'll provide you with an accurate lead time estimate.",
        },
        {
          question: "How do I place an order?",
          answer:
            "You can place an order by contacting us through our Contact page, filling out the Request a Quote form, calling us at +91-217-2745260, or emailing us at info@arakalindustries.com.",
        },
      ],
    },
    {
      category: "Sustainability",
      questions: [
        {
          question: "What are your sustainability practices?",
          answer:
            "We are committed to sustainable manufacturing practices, including water conservation, energy efficiency, waste reduction, and eco-friendly processes. For more details, please visit our Sustainability page.",
        },
        {
          question: "Do you use organic materials?",
          answer:
            "We offer products made from various materials, including organic options. Please contact us to discuss your specific requirements and available options.",
        },
      ],
    },
    {
      category: "Contact & Support",
      questions: [
        {
          question: "How can I contact Arakal Industries?",
          answer:
            "You can contact us through our Contact page, by phone at +91-217-2745260, by email at info@arakalindustries.com, or via WhatsApp at +91-217-2745260.",
        },
        {
          question: "What are your business hours?",
          answer:
            "Our business hours are Monday through Saturday, 9:00 AM to 6:00 PM IST. For urgent inquiries, please contact us via phone or email, and we'll respond as soon as possible.",
        },
        {
          question: "Do you provide after-sales support?",
          answer:
            "Yes, we provide comprehensive after-sales support to ensure customer satisfaction. Our team is available to assist you with any questions or concerns after your purchase.",
        },
      ],
    },
  ];

  // Flatten FAQs for schema markup
  const allFaqs = faqs.flatMap((category) =>
    category.questions.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }))
  );

  return (
    <>
      {/* Structured Data - FAQ Schema */}
      <JSONLD data={generateFAQSchema(allFaqs)} />

      {/* Breadcrumbs */}
      <Container className="py-6">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      {/* Hero Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions about Arakal Industries, our products, manufacturing, and services.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Sections */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`item-${categoryIndex}-${faqIndex}`}
                      className="border-b"
                    >
                      <AccordionTrigger className="text-left font-semibold">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              If you couldn't find the answer you're looking for, please don't hesitate to contact us.
              Our team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="tel:+91-217-2745260"
                className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background rounded-md hover:bg-accent transition-colors"
              >
                Call Us: +91-217-2745260
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
