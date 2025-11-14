import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { getBlogPosts, getBlogCategories } from "@/lib/sanity/fetch";
import { urlForImage } from "@/lib/sanity/image";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { JSONLD } from "@/components/seo/json-ld";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog & News",
  description: "Read the latest news, insights, and updates from Arakal Industries",
  openGraph: {
    title: "Blog & News | Arakal Industries",
    description: "Latest news and insights from Arakal Industries",
    url: `${SITE_CONFIG.url}/blog`,
  },
};

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  author?: {
    name: string;
    image?: { asset?: any };
  };
  publishedAt: string;
  featuredImage?: { asset?: any; alt?: string };
  categories?: Array<{ _id: string; title: string; slug: { current: string } }>;
  tags?: string[];
  featured?: boolean;
}

export default async function BlogPage() {
  const posts = await getBlogPosts().catch(() => []);
  const categories = await getBlogCategories().catch(() => []);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      {/* Breadcrumb Schema */}
      <JSONLD
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Blog", url: `${SITE_CONFIG.url}/blog` },
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Blog & News</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Stay updated with the latest news, insights, and updates from Arakal Industries
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <Container>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-2">No blog posts available</p>
              <p className="text-sm text-muted-foreground">
                Blog posts will be displayed here once published.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: BlogPost) => {
                const imageUrl = post.featuredImage
                  ? urlForImage(post.featuredImage)
                  : null;
                const publishedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "";

                return (
                  <article
                    key={post._id}
                    className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {imageUrl && (
                      <Link href={`/blog/${post.slug.current}`}>
                        <div className="relative w-full h-48">
                          <Image
                            src={imageUrl}
                            alt={post.featuredImage?.alt || post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    )}
                    <div className="p-6">
                      {/* Categories */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories.map((category) => (
                            <Link
                              key={category._id}
                              href={`/blog/category/${category.slug.current}`}
                              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                            >
                              {category.title}
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-2xl font-bold mb-3">
                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        {post.author && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{post.author.name}</span>
                          </div>
                        )}
                        {publishedDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{publishedDate}</span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-muted rounded-full flex items-center gap-1"
                            >
                              <Tag className="h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read More */}
                      <Button asChild variant="outline" className="w-full group">
                        <Link href={`/blog/${post.slug.current}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

