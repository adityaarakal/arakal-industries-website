import { getBlogPosts } from "@/lib/sanity/fetch";
import { SITE_CONFIG } from "@/lib/constants";

export async function GET() {
  const posts = await getBlogPosts().catch(() => []);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.name} - Blog</title>
    <description>Latest news and insights from ${SITE_CONFIG.name}</description>
    <link>${SITE_CONFIG.url}/blog</link>
    <atom:link href="${SITE_CONFIG.url}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map((post: any) => {
        const pubDate = post.publishedAt
          ? new Date(post.publishedAt).toUTCString()
          : new Date().toUTCString();
        const postUrl = `${SITE_CONFIG.url}/blog/${post.slug?.current || post.slug}`;
        const excerpt = post.excerpt || "";

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      ${post.author?.name ? `<author>${post.author.name}</author>` : ""}
      ${post.categories?.map((cat: any) => `<category>${cat.title}</category>`).join("") || ""}
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

