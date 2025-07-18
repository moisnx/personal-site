// src/gallery/index.ts
import { getAllPosts } from "../../posts";

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  thumbnail?: string;
  description?: string;
  date: string;
  tags: string[];
  type: "image" | "post-linked" | "auto-generated";
  // Optional: link to blog post
  postSlug?: string;
  // Image metadata
  alt?: string;
  camera?: string;
  lens?: string;
  settings?: string;
  location?: string;
  // Source info for curated images
  source?: string;
  sourceUrl?: string;
}

// Manual gallery items (your curated content)
export const manualGalleryItems: GalleryItem[] = [
  {
    id: "matrix-code-rain",
    title: "Digital Matrix Code Flow",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    description:
      "Green cascading code reminiscent of The Matrix, representing data flow in digital systems.",
    date: "2025-07-14",
    tags: ["Matrix", "Code", "Digital", "Data"],
    type: "image",
    alt: "Matrix-style cascading green code",
    source: "Unsplash",
  },
  {
    id: "neural-network-viz",
    title: "Neural Network Visualization",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    description:
      "Abstract visualization of neural networks and AI processing, showing interconnected nodes.",
    date: "2025-07-13",
    tags: ["AI", "Neural", "Network", "Visualization"],
    type: "image",
    alt: "Neural network visualization with glowing nodes",
    source: "Unsplash",
  },
  {
    id: "futuristic-city",
    title: "Neo-Tokyo Skyline",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
    thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
    description:
      "A cyberpunk cityscape with towering skyscrapers and neon signs, reminiscent of Tokyo-3.",
    date: "2025-07-12",
    tags: ["Cyberpunk", "City", "Tokyo", "Neon", "Architecture"],
    type: "image",
    alt: "Futuristic cyberpunk city skyline",
    location: "Neo Tokyo",
    source: "Unsplash",
  },
  {
    id: "eva-mech-inspired",
    title: "Mech Unit Assembly",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    description:
      "Industrial robotics and mechanical engineering, inspired by EVA unit design philosophy.",
    date: "2025-07-11",
    tags: ["Mech", "Robot", "Industrial", "Engineering", "EVA"],
    type: "image",
    alt: "Industrial robot assembly",
    source: "Unsplash",
  },

  {
    id: "server-room-matrix",
    title: "Data Center Neural Core",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
    description:
      "Massive server room with glowing indicators, representing the digital backbone of consciousness.",
    date: "2025-07-08",
    tags: ["Server", "Data", "Infrastructure", "Neural", "Core"],
    type: "image",
    alt: "Server room with glowing lights",
    source: "Unsplash",
  },
];

// Dynamic function to generate gallery items from blog posts
function generateGalleryFromPosts(): GalleryItem[] {
  const posts = getAllPosts();
  const galleryFromPosts: GalleryItem[] = [];

  posts.forEach((post: any) => {
    // Check if post has gallery configuration in frontmatter
    const galleryConfig = post?.gallery;

    // if (galleryConfig?.showInGallery && post.cover) {
    //   galleryFromPosts.push({
    //     id: `post-${post.slug}`,
    //     title: post.title,
    //     image: post.cover,
    //     description: post.excerpt,
    //     date: post.date,
    //     tags: post.tags,
    //     type: "post-linked",
    //     postSlug: post.slug,
    //     alt: `Cover image for ${post.title}`,
    //   });
    // }

    // Add additional gallery images from the post
    if (galleryConfig?.images && Array.isArray(galleryConfig.images)) {
      galleryConfig.images.forEach((image: string, index: number) => {
        galleryFromPosts.push({
          id: `post-${post.slug}-img-${index}`,
          title: `${post.title} - Image ${index + 1}`,
          image: image,
          description: post.excerpt,
          date: post.date,
          tags: post.tags,
          type: "post-linked",
          postSlug: post.slug,
          alt: `Image ${index + 1} from ${post.title}`,
        });
      });
    }
  });

  return galleryFromPosts;
}

// Combined gallery items
export function getGalleryItems(): GalleryItem[] {
  const postsGallery = generateGalleryFromPosts();
  const allItems = [...manualGalleryItems, ...postsGallery];

  return allItems.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function getGalleryItemById(id: string): GalleryItem | undefined {
  return getGalleryItems().find((item) => item.id === id);
}

export function getGalleryItemsByTag(tag: string): GalleryItem[] {
  return getGalleryItems().filter((item) =>
    item.tags.some((itemTag) =>
      itemTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
}

export function getGalleryItemsByType(
  type: "image" | "post-linked" | "auto-generated"
): GalleryItem[] {
  return getGalleryItems().filter((item) => item.type === type);
}

// Helper function to add new manual gallery items
export function addGalleryItem(item: Omit<GalleryItem, "id">): void {
  const newItem: GalleryItem = {
    ...item,
    id: `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  manualGalleryItems.push(newItem);
}

// Utility to get curated tech/cyberpunk images (you can expand this)
export const curatedImageSources = {
  cyberpunk: [
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80",
    "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&q=80",
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
  ],
  matrix: [
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  ],
  tech: [
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    "https://images.unsplash.com/photo-1635070041409-e63e783ce3d1?w=800&q=80",
  ],
};

// Function to quickly generate a gallery item from a URL
export function createGalleryItemFromUrl(
  url: string,
  title: string,
  tags: string[] = [],
  description?: string
): GalleryItem {
  return {
    id: `imported-${Date.now()}`,
    title,
    image: url,
    thumbnail: url.replace("w=800", "w=400"), // Simple thumbnail generation for Unsplash
    description: description || `Curated image: ${title}`,
    date: new Date().toISOString().split("T")[0],
    tags: [...tags, "Curated"],
    type: "image",
    alt: title,
    source: "Curated",
  };
}
