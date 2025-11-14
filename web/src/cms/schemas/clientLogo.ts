import { defineField, defineType } from "sanity";

export default defineType({
  name: "clientLogo",
  title: "Client Logo",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client/Partner Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: "Client or partner company logo",
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
      description: "Link to client/partner website (optional)",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Client", value: "client" },
          { title: "Partner", value: "partner" },
          { title: "Distributor", value: "distributor" },
          { title: "Certification Body", value: "certification" },
          { title: "Other", value: "other" },
        ],
      },
      initialValue: "client",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description or testimonial (optional)",
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
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
      subtitle: "category",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name (A-Z)",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});

