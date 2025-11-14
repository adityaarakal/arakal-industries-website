import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { SocialShare } from "@/components/ui/social-share";
import { SITE_CONFIG } from "@/lib/constants";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/sanity/fetch";
import { urlForImage } from "@/lib/sanity/image";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { JSONLD } from "@/components/seo/json-ld";
import { BlogPortableText } from "@/components/blog/portable-text";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts().catch(() => []);
  return posts.map((post: any) => ({
    slug: post.slug?.current || post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const imageUrl = post.featuredImage ? urlForImage(post.featuredImage) : null;

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt || SITE_CONFIG.description,
    keywords: post.seo?.keywords || post.tags || [],
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt || SITE_CONFIG.description,
      url: `${SITE_CONFIG.url}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.featuredImage?.alt || post.title,
            },
          ]
        : undefined,
    },
  };
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);

  if (!post) {
    notFound();
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${slug}` },
  ];

  const imageUrl = post.featuredImage ? urlForImage(post.featuredImage) : null;
  const authorImageUrl = post.author?.image ? urlForImage(post.author.image) : null;
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <>
      {/* Breadcrumb Schema */}
      <JSONLD
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Blog", url: `${SITE_CONFIG.url}/blog` },
          { name: post.title, url: `${SITE_CONFIG.url}/blog/${slug}` },
        ])}
      />

      {/* Breadcrumbs */}
      <Container className="py-6 print-hide">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      {/* Article */}
      <article className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-8">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((category: any) => (
                    <Link
                      key={category._id}
                      href={`/blog/category/${category.slug.current}`}
                      className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">{post.title}</h1>

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-muted-foreground mb-6">
                {post.author && (
                  <div className="flex items-center gap-2">
                    {authorImageUrl ? (
                      <Image
                        src={authorImageUrl}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <span>{post.author.name}</span>
                  </div>
                )}
                {publishedDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{publishedDate}</span>
                  </div>
                )}
              </div>

              {/* Featured Image */}
              {imageUrl && (
                <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={post.featuredImage?.alt || post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Social Sharing */}
              <div className="print-hide">
                <SocialShare
                  url={`${SITE_CONFIG.url}/blog/${slug}`}
                  title={post.title}
                  description={post.excerpt}
                  variant="compact"
                />
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <BlogPortableText content={post.content} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {post.author && post.author.bio && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-start gap-4">
                  {authorImageUrl && (
                    <Image
                      src={authorImageUrl}
                      alt={post.author.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{post.author.name}</h3>
                    <p className="text-muted-foreground">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </article>
    </>
  );
}

