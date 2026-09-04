import { defineQuery } from "next-sanity";

export const FEATURED_PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_type == "featuredProject" && defined(slug.current)] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    index,
    category,
    year,
    role,
    coverImage {
      asset-> {
        _id,
        url
      },
      alt,
      hotspot
    },
    tools,
    summary,
    intro,
    context,
    concept[] {
      _key,
      heading,
      body
    },
    pullQuote,
    systemNotes,
    gallery[] {
      _key,
      label,
      style,
      ratio,
      span,
      image {
        asset-> {
          _id,
          url
        },
        alt,
        hotspot
      }
    },
    video {
      poster {
        asset-> {
          _id,
          url
        }
      },
      src,
      title
    },
    featured,
    order
  }
`);

export const FEATURED_PROJECT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "featuredProject" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    index,
    category,
    year,
    role,
    coverImage {
      asset-> {
        _id,
        url
      },
      alt,
      hotspot
    },
    tools,
    summary,
    intro,
    context,
    concept[] {
      _key,
      heading,
      body
    },
    pullQuote,
    systemNotes,
    gallery[] {
      _key,
      label,
      style,
      ratio,
      span,
      image {
        asset-> {
          _id,
          url
        },
        alt,
        hotspot
      }
    },
    video {
      poster {
        asset-> {
          _id,
          url
        }
      },
      src,
      title
    },
    featured
  }
`);

export const WORK_SAMPLES_QUERY = defineQuery(/* groq */ `
  *[_type == "workSample"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    mediaType,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt,
      hotspot
    },
    gallery[] {
      _key,
      alt,
      caption,
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      }
    },
    videoFile {
      asset-> {
        _id,
        url
      }
    },
    pdfFile {
      asset-> {
        _id,
        url
      }
    },
    videoUrl,
    ratio,
    year,
    clientOrBrand,
    description,
    tags,
    featured,
    order
  }
`);

export const WORK_SAMPLES_BY_CATEGORY_QUERY = defineQuery(/* groq */ `
  *[_type == "workSample" && category == $category && defined(slug.current)] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    mediaType,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt,
      hotspot
    },
    gallery[] {
      _key,
      alt,
      caption,
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      }
    },
    videoFile {
      asset-> {
        _id,
        url
      }
    },
    videoUrl,
    ratio,
    year,
    clientOrBrand,
    description,
    tags,
    featured
  }
`);
