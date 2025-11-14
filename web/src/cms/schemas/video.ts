import { defineField, defineType } from "sanity";

export default defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description of the video",
    }),
    defineField({
      name: "videoType",
      title: "Video Type",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "Vimeo", value: "vimeo" },
          { title: "Direct URL", value: "direct" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "youtube",
    }),
    defineField({
      name: "videoId",
      title: "Video ID",
      type: "string",
      description: "YouTube video ID or Vimeo video ID",
      validation: (Rule) =>
        Rule.custom((videoId, context) => {
          const videoType = (context.parent as { videoType?: string })?.videoType;
          if (videoType === "youtube" || videoType === "vimeo") {
            return videoId ? true : "Video ID is required for YouTube and Vimeo";
          }
          return true;
        }),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "Direct video URL (for direct video type)",
      hidden: ({ parent }) => parent?.videoType !== "direct",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Custom thumbnail (optional, will use video platform thumbnail if not provided)",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Factory Tour", value: "factory-tour" },
          { title: "Product Demo", value: "product-demo" },
          { title: "Manufacturing Process", value: "manufacturing" },
          { title: "Testimonial", value: "testimonial" },
          { title: "Company Overview", value: "company" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "duration",
      title: "Duration (seconds)",
      type: "number",
      description: "Video duration in seconds",
    }),
    defineField({
      name: "transcript",
      title: "Transcript",
      type: "text",
      description: "Video transcript for accessibility",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Show on homepage",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
      description: "Products featured in this video",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "thumbnail",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Title (A-Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});

