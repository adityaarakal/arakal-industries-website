import { defineField, defineType } from "sanity";

export default defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Certification Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issuingOrganization",
      title: "Issuing Organization",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description of the certification",
    }),
    defineField({
      name: "certificateNumber",
      title: "Certificate Number",
      type: "string",
    }),
    defineField({
      name: "issueDate",
      title: "Issue Date",
      type: "date",
    }),
    defineField({
      name: "expiryDate",
      title: "Expiry Date",
      type: "date",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Quality Management", value: "quality" },
          { title: "Environmental", value: "environmental" },
          { title: "Safety", value: "safety" },
          { title: "Industry Standard", value: "industry" },
          { title: "Export", value: "export" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Certification Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Logo or badge image for the certification",
    }),
    defineField({
      name: "certificateDocument",
      title: "Certificate Document",
      type: "file",
      description: "PDF or image file of the actual certificate",
      options: {
        accept: ".pdf,.jpg,.jpeg,.png",
      },
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
      name: "url",
      title: "Verification URL",
      type: "url",
      description: "Link to verify the certification online (if available)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "issuingOrganization",
      media: "logo",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Issue Date (Newest)",
      name: "issueDateDesc",
      by: [{ field: "issueDate", direction: "desc" }],
    },
  ],
});

