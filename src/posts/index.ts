// src/posts/index.js

// Automatically import all markdown files
const modules = import.meta.glob("./*.md", { eager: true });

export const posts = Object.entries(modules).map(([path, module]) => {
  // More robust slug extraction
  const slug = path.replace(/^\.\//, "").replace(/\.md$/, "");

  // Fix: Assert module as any to avoid type error for unknown
  const frontmatter = (module as any).frontmatter || {};

  console.log("Processing file:", path, "-> slug:", slug); // Debug log

  return {
    slug,
    title: frontmatter.title || slug,
    date: frontmatter.date || "",
    tags: frontmatter.tags || [],
    excerpt: frontmatter.excerpt || "",
    cover: frontmatter.cover || "",
    gallery: frontmatter.gallery || "",
    readTime: frontmatter.readTime || "",
    component: () => import(path),
  };
});

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getAllPosts() {
  // Debug: Log all posts to see what's happening
  console.log(
    "All posts:",
    posts.map((p) => ({ slug: p.slug, title: p.title, date: p.date }))
  );

  return posts.slice().sort((a, b) => {
    const dateA = new Date(a.date).getTime() || 0;
    const dateB = new Date(b.date).getTime() || 0;
    return dateB - dateA;
  });
}

// Alternative approach if the above doesn't work:
// You might need to handle the glob pattern differently
export const postsAlternative = Object.entries(modules).map(
  ([path, module]) => {
    // Extract filename from the full path
    const filename = path.split("/").pop() || path;
    const slug = filename.replace(/\.md$/, "");

    const frontmatter = (module as any).frontmatter || {};

    return {
      slug,
      path, // Keep original path for debugging
      title: frontmatter.title || slug,
      date: frontmatter.date || "",
      tags: frontmatter.tags || [],
      excerpt: frontmatter.excerpt || "",
      cover: frontmatter.cover || "",
      readTime: frontmatter.readTime || "",
      component: () => import(path),
    };
  }
);
