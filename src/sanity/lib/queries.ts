import { defineQuery } from 'next-sanity'
import groq from 'groq'

export const GALLERIES_QUERY = defineQuery(groq`{
  "categories": *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id, title, "slug": slug.current, description
  },
  "galleries": *[_type == "gallery" && defined(slug.current)] | order(date desc) {
    _id, title, "slug": slug.current, description, date, featured,
    "categorySlug": category->slug.current,
    "coverImage": coverImage.asset->{url, "lqip": metadata.lqip, "dimensions": metadata.dimensions}
  }
}`)

export const GALLERY_SLUGS_QUERY = defineQuery(groq`*[_type == "gallery" && defined(slug.current)]{"slug": slug.current}`)

export const GALLERY_QUERY = defineQuery(groq`*[_type == "gallery" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, description, date,
  "categorySlug": category->slug.current,
  "categoryTitle": category->title,
  "coverImage": coverImage.asset->{url, "lqip": metadata.lqip, "dimensions": metadata.dimensions},
  "images": images[]{asset->{url, "lqip": metadata.lqip, "dimensions": metadata.dimensions}},
}`)

export const HOME_QUERY = defineQuery(groq`{
  "featured": *[_type == "gallery" && featured == true && defined(slug.current)] | order(date desc) [0...6] {
    _id, title, "slug": slug.current, description,
    "categoryTitle": category->title,
    "coverImage": coverImage.asset->{url, "lqip": metadata.lqip, "dimensions": metadata.dimensions}
  },
  "about": *[_type == "about"][0] {
    title, bio, photographerName, experience, awards,
    "profileImage": profileImage.asset->{url},
    stats
  },
  "services": *[_type == "service"] | order(order asc) {
    _id, title, description, icon,
    "image": image.asset->{url, "lqip": metadata.lqip, "dimensions": metadata.dimensions}
  },
  "allGalleries": *[_type == "gallery" && defined(slug.current)] | order(date desc) {
    "coverImage": coverImage.asset->{url}
  }
}`)

export const ABOUT_QUERY = defineQuery(groq`*[_type == "about"][0]{
  title, bio, story, photographerName, experience, awards,
  "profileImage": profileImage.asset->{url, "lqip": metadata.lqip, "dimensions": metadata.dimensions},
  stats
}`)

export const SEO_QUERY = defineQuery(groq`{
  "about": *[_type == "about"][0]{title, bio},
  "galleryCount": count(*[_type == "gallery"]),
  "categoryCount": count(*[_type == "category"])
}`)

export const CONTACT_MUTATION = groq`*[_type == "contactSubmission"]`

export const ALL_IMAGES_QUERY = defineQuery(groq`*[_type == "gallery" && defined(slug.current)] | order(date desc) {
  _id, title, "slug": slug.current,
  "images": images[]{asset->{url, "lqip": metadata.lqip, "dimensions": metadata.dimensions}},
  "coverImage": coverImage.asset->{url, "lqip": metadata.lqip, "dimensions": metadata.dimensions}
}`)
