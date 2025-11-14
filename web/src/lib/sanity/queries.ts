import { groq } from "next-sanity";

// Product queries
export const productsQuery = groq`*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  description,
  category,
  gsm,
  material,
  colors,
  images,
  specifications,
  features,
  featured,
  _createdAt,
  _updatedAt
}`;

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  description,
  category,
  gsm,
  material,
  colors,
  images,
  specifications,
  features,
  featured,
  _createdAt,
  _updatedAt
}`;

export const featuredProductsQuery = groq`*[_type == "product" && featured == true] | order(_createdAt desc) {
  _id,
  name,
  slug,
  description,
  category,
  gsm,
  material,
  colors,
  images,
  specifications,
  features,
  featured,
  _createdAt,
  _updatedAt
}`;

// Location queries
export const locationsQuery = groq`*[_type == "location"] | order(_createdAt desc) {
  _id,
  name,
  address,
  coordinates,
  mapplsPin,
  digipin,
  phone,
  email,
  description,
  images,
  _createdAt,
  _updatedAt
}`;

export const locationByIdQuery = groq`*[_type == "location" && _id == $id][0] {
  _id,
  name,
  address,
  coordinates,
  mapplsPin,
  digipin,
  phone,
  email,
  description,
  images,
  _createdAt,
  _updatedAt
}`;

// Heritage timeline queries
export const heritageTimelineQuery = groq`*[_type == "heritageTimeline"] | order(year asc) {
  _id,
  year,
  title,
  description,
  image,
  _createdAt,
  _updatedAt
}`;

// Page content queries
export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  content,
  seo,
  _createdAt,
  _updatedAt
}`;

// Industry queries
export const industriesQuery = groq`*[_type == "industry"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  description,
  features,
  images,
  _createdAt,
  _updatedAt
}`;

// Resource queries
export const resourcesQuery = groq`*[_type == "resource"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  type,
  file,
  category,
  _createdAt,
  _updatedAt
}`;

// Testimonial queries
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  name,
  company,
  role,
  content,
  rating,
  source,
  verified,
  date,
  _createdAt,
  _updatedAt
}`;

export const featuredTestimonialsQuery = groq`*[_type == "testimonial" && verified == true] | order(_createdAt desc) [0...6] {
  _id,
  name,
  company,
  role,
  content,
  rating,
  source,
  verified,
  date,
  _createdAt,
  _updatedAt
}`;

// Settings queries
export const settingsQuery = groq`*[_type == "settings"][0] {
  _id,
  siteName,
  siteDescription,
  contactEmail,
  contactPhone,
  socialLinks,
  _createdAt,
  _updatedAt
}`;

// Certification queries
export const certificationsQuery = groq`*[_type == "certification"] | order(order asc, issueDate desc) {
  _id,
  name,
  issuingOrganization,
  description,
  certificateNumber,
  issueDate,
  expiryDate,
  category,
  logo,
  certificateDocument,
  featured,
  order,
  url,
  _createdAt,
  _updatedAt
}`;

export const featuredCertificationsQuery = groq`*[_type == "certification" && featured == true] | order(order asc, issueDate desc) {
  _id,
  name,
  issuingOrganization,
  description,
  certificateNumber,
  issueDate,
  expiryDate,
  category,
  logo,
  certificateDocument,
  featured,
  order,
  url,
  _createdAt,
  _updatedAt
}`;

// Client Logo queries
export const clientLogosQuery = groq`*[_type == "clientLogo"] | order(order asc, name asc) {
  _id,
  name,
  logo,
  url,
  category,
  description,
  featured,
  order,
  _createdAt,
  _updatedAt
}`;

export const featuredClientLogosQuery = groq`*[_type == "clientLogo" && featured == true] | order(order asc, name asc) {
  _id,
  name,
  logo,
  url,
  category,
  description,
  featured,
  order,
  _createdAt,
  _updatedAt
}`;

// Video queries
export const videosQuery = groq`*[_type == "video"] | order(order asc, title asc) {
  _id,
  title,
  description,
  videoType,
  videoId,
  videoUrl,
  thumbnail,
  category,
  duration,
  transcript,
  featured,
  order,
  relatedProducts,
  _createdAt,
  _updatedAt
}`;

export const featuredVideosQuery = groq`*[_type == "video" && featured == true] | order(order asc, title asc) {
  _id,
  title,
  description,
  videoType,
  videoId,
  videoUrl,
  thumbnail,
  category,
  duration,
  transcript,
  featured,
  order,
  relatedProducts,
  _createdAt,
  _updatedAt
}`;

export const videosByCategoryQuery = groq`*[_type == "video" && category == $category] | order(order asc, title asc) {
  _id,
  title,
  description,
  videoType,
  videoId,
  videoUrl,
  thumbnail,
  category,
  duration,
  transcript,
  featured,
  order,
  relatedProducts,
  _createdAt,
  _updatedAt
}`;

