<template>
  <!-- Your existing template content -->
  <div class="eva-background">
    <img src="/eva-image-bg.jpg" alt="EVA Unit" class="eva-image active" />
    <div class="image-overlay"></div>
  </div>

  <div class="grid-overlay"></div>
  <Navbar />

  <div class="container">
    <article class="blog-post" v-if="post">
      <!-- Enhanced Head with comprehensive meta tags -->
      <Head>
        <!-- Basic Meta Tags -->
        <title>{{ seoTitle }}</title>
        <meta name="description" :content="seoDescription" />
        <meta name="keywords" :content="seoKeywords" />
        <meta
          name="author"
          :content="post.author || 'Neural Bridge Developer'"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en" />

        <!-- Article-specific Open Graph -->
        <meta property="article:published_time" :content="post.date" />
        <meta
          property="article:modified_time"
          :content="post.updatedDate || post.date"
        />

        <meta
          property="article:section"
          :content="post.category || 'Technology'"
        />
        <meta
          property="article:tag"
          v-for="tag in post.tags"
          :key="tag"
          :content="tag"
        />

        <!-- Twitter Card Meta Tags -->

        <!-- Technical Meta Tags -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <!-- Canonical URL -->
        <link rel="canonical" :href="canonicalUrl" />

        <!-- JSON-LD Structured Data -->

        <!-- Additional SEO Meta Tags -->
        <meta name="theme-color" content="#00ff41" />
        <meta name="msapplication-TileColor" content="#00ff41" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        <!-- Reading Time & Word Count (for analytics) -->
        <meta name="reading-time" :content="post.readTime" />
        <meta name="word-count" :content="post.wordCount || 'N/A'" />
      </Head>

      <!-- Rest of your existing template -->
      <header class="post-header">
        <div class="post-meta">
          <time class="post-date" :datetime="post.date">{{
            formatDate(post.date)
          }}</time>
          <span class="post-reading-time">{{ post.readTime }}</span>
        </div>
        <h1 class="post-title">{{ post.title }}</h1>
        <p class="post-subtitle">{{ post.excerpt }}</p>
        <div class="post-tags">
          <span
            v-for="(tag, index) in post.tags"
            :key="index"
            class="post-tag"
            >{{ tag }}</span
          >
        </div>
      </header>

      <div class="post-image-container">
        <img :src="post.cover" :alt="post.coverAlt" class="post-image" />
        <div class="image-caption">{{ post.coverAlt }}</div>
      </div>

      <div class="post-content">
        <section class="content-section">
          <component :is="postComponent" />
        </section>
      </div>
    </article>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import Navbar from "../components/Navbar.vue";
import { getPostBySlug } from "../posts";
import { useRoute } from "vue-router";
import "../styles/prism-theme.css";
import { formatDate } from "../lib/utils";
import prism from "prismjs";
import "markdown-it-github-alerts/styles/github-colors-light.css";
import "markdown-it-github-alerts/styles/github-colors-dark-media.css";
import "markdown-it-github-alerts/styles/github-base.css";
import { Head } from "@unhead/vue/components";

const route = useRoute();
const post = ref();
const postComponent = ref();

// SEO Configuration
const siteUrl = "https://yourdomain.com"; // Replace with your actual domain
const twitterHandle = "@yourtwitterhandle"; // Replace with your Twitter handle
const siteName = "Neural Bridge Blog";

// Computed properties for SEO
const seoTitle = computed(() => {
  if (!post.value) return siteName;
  return post.value.title.length > 60
    ? `${post.value.title.substring(0, 57)}...`
    : post.value.title;
});

const seoDescription = computed(() => {
  if (!post.value)
    return "Exploring the intersection of human consciousness and digital architecture.";

  let description = post.value.excerpt || post.value.description || "";

  // Ensure description is between 150-160 characters for optimal SEO
  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  } else if (description.length < 120) {
    // If too short, try to expand with additional context
    const additionalContext =
      " - Neural Bridge Blog explores technology and digital innovation.";
    if (description.length + additionalContext.length <= 160) {
      description += additionalContext;
    }
  }

  return description;
});

const seoKeywords = computed(() => {
  if (!post.value || !post.value.tags) return "";

  // Combine tags with some general keywords
  const generalKeywords = [
    "technology",
    "programming",
    "web development",
    "neural bridge",
  ];
  const allKeywords = [...post.value.tags, ...generalKeywords];

  // Remove duplicates and join
  return [...new Set(allKeywords)].join(", ");
});

const canonicalUrl = computed(() => {
  if (!post.value) return siteUrl;
  return `${siteUrl}/blog/${route.params.slug}`;
});

const absoluteImageUrl = computed(() => {
  if (!post.value || !post.value.cover) {
    return `${siteUrl}/default-og-image.jpg`; // Fallback image
  }

  // Convert relative URLs to absolute
  if (post.value.cover.startsWith("http")) {
    return post.value.cover;
  }

  return `${siteUrl}${post.value.cover}`;
});

// Structured Data (JSON-LD)
const structuredData = computed(() => {
  if (!post.value) return "";

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.value.title,
    description: seoDescription.value,
    image: absoluteImageUrl.value,
    author: {
      "@type": "Person",
      name: post.value.author || "Neural Bridge Developer",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished: post.value.date,
    dateModified: post.value.updatedDate || post.value.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl.value,
    },
    keywords: post.value.tags?.join(", ") || "",
    articleSection: post.value.category || "Technology",
    inLanguage: "en-US",
    wordCount: post.value.wordCount || 0,
    timeRequired: post.value.readTime || "5 min read",
  };

  return JSON.stringify(data);
});

// Background images
const evaImages = [
  "/eva-image-bg-2.jpeg",
  "/eva-image-bg-3.jpeg",
  "/eva-image-bg.jpg",
];
let currentImageIndex = 0;

onMounted(async () => {
  startImageRotation();
  setupReadingProgress();
  post.value = getPostBySlug(route.params.slug);

  if (post.value) {
    postComponent.value = post.value.component;

    // Calculate word count if not provided
    if (!post.value.wordCount && postComponent.value) {
      calculateWordCount();
    }
  }
});

// Calculate word count for SEO
function calculateWordCount() {
  // This is a basic implementation - you might want to improve it
  const content = document.querySelector(".post-content");
  if (content) {
    const text = content.textContent || content.innerText || "";
    const wordCount = text.trim().split(/\s+/).length;
    post.value.wordCount = wordCount;
  }
}

// Background image rotation
function startImageRotation() {
  const image = document.querySelector(".eva-image");

  setInterval(() => {
    if (evaImages.length > 1) {
      image.classList.remove("active");
      currentImageIndex = (currentImageIndex + 1) % evaImages.length;

      setTimeout(() => {
        image.src = evaImages[currentImageIndex];
        image.classList.add("active");
      }, 500);
    }
  }, 10000);
}

// Reading progress indicator
function setupReadingProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "reading-progress";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const article = document.querySelector(".blog-post");
    const articleHeight = article.offsetHeight;
    const articleTop = article.offsetTop;
    const scrolled = window.scrollY - articleTop;
    const progress = Math.min(Math.max(scrolled / articleHeight, 0), 1);

    progressBar.style.width = `${progress * 100}%`;
  });
}

// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
</script>
<style>
/* Import existing styles */
:root {
  /* Typography */
  --font-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  --font-mono: "JetBrains Mono", "Cascadia Code", "Fira Code", Monaco, Consolas,
    monospace;
  --font-heading: var(--font-main);
  /* Enhanced text color hierarchy */
  --text-primary: #f0f0f0; /* Brightest - main headings */
  --text-secondary: #d4d4d4; /* Secondary headings */
  --text-body: #c2c2c2; /* Body text */
  --text-muted: #999; /* Muted text */
  --text-subtle: #777; /* Subtle text */
  --text-dim: #555; /* Dimmed text */
  --text-accent: #00ff41; /* Accent color */
  --text-accent-dim: #00cc33; /* Dimmed accent */
  --text-link: #4da6ff; /* Link color */
  --text-link-hover: #66b3ff; /* Link hover */
  --text-code: #ff6b9d; /* Code color */
  --text-quote: #a8a8a8; /* Quote text */
  /* Headings */
  /* Headings with different colors */
  --h1-size: 2.2rem;
  --h1-weight: 600;
  --h1-color: var(--text-primary);
  --h1-spacing: -0.02em;
  --h1-line-height: 1.3;
  --h1-margin: 2.5rem 0 1.25rem 0;

  --h2-size: 1.65rem;
  --h2-weight: 600;
  --h2-color: var(--text-secondary);
  --h2-spacing: -0.01em;
  --h2-line-height: 1.4;
  --h2-margin: 2.5rem 0 1.25rem 0;
  --h2-accent-width: 3px;
  --h2-accent-height: 1.4rem;
  --h2-accent-color: var(--accent);
  --h2-accent-offset: -1.25rem;

  --h3-size: 1.3rem;
  --h3-weight: 500;
  --h3-color: var(--text-body);
  --h3-line-height: 1.5;
  --h3-margin: 2rem 0 1rem 0;

  --h4-size: 1.1rem;
  --h4-weight: 500;
  --h4-color: var(--text-muted);
  --h4-line-height: 1.5;
  --h4-margin: 1.5rem 0 0.75rem 0;

  --h5-size: 1rem;
  --h5-weight: 600;
  --h5-color: var(--text-subtle);
  --h5-line-height: 1.5;
  --h5-margin: 1.25rem 0 0.5rem 0;

  --h6-size: 0.9rem;
  --h6-weight: 600;
  --h6-color: var(--text-dim);
  --h6-line-height: 1.5;
  --h6-margin: 1rem 0 0.5rem 0;

  /* Paragraph & Text */
  --p-size: 1.05rem;
  --p-color: var(--text-body);
  --p-line-height: 1.65;
  --p-margin: 0 0 1.5rem 0;

  --lead-size: 1.2rem;
  --lead-color: var(--text-secondary);
  --lead-weight: 400;
  --lead-line-height: 1.65;

  --small-size: 0.85rem;
  --small-color: var(--text-subtle);

  /* Links */
  --link-color: var(--accent);
  --link-hover-color: #00cc33;
  --link-visited-color: #00aa2a;
  --link-decoration: none;
  --link-hover-decoration: underline;
  --link-transition: all 0.2s ease;
  --link-underline-offset: 2px;

  /* Lists */
  --ul-margin: 1.5rem 0;
  --ul-padding: 0 0 0 1.5rem;
  --ol-margin: 1.5rem 0;
  --ol-padding: 0 0 0 1.5rem;
  --li-margin: 0.5rem 0;
  --li-color: var(--fg);
  --li-marker-color: var(--accent);

  /* Images */
  --img-border-radius: 8px;
  --img-border: 1px solid var(--border);
  --img-margin: 2rem 0;
  --img-max-width: 100%;
  --img-height: auto;
  --img-transition: all 0.2s ease;
  --img-hover-transform: scale(1.02);
  --img-hover-border-color: var(--accent);

  /* Figure & Caption */
  --figure-margin: 2.5rem 0;
  --figcaption-size: 0.85rem;
  --figcaption-color: var(--muted);
  --figcaption-style: italic;
  --figcaption-align: center;
  --figcaption-line-height: 1.5;
  --figcaption-margin: 1rem 0 0 0;

  /* Blockquotes */
  --blockquote-bg: var(--glass);
  --blockquote-border-left: 4px solid var(--accent);
  --blockquote-padding: 1.5rem 2rem;
  --blockquote-margin: 2.5rem 0;
  --blockquote-border-radius: 0 8px 8px 0;
  --blockquote-font-size: 1.15rem;
  --blockquote-font-style: italic;
  --blockquote-color: var(--fg);
  --blockquote-line-height: 1.6;
  --blockquote-cite-size: 0.9rem;
  --blockquote-cite-color: var(--muted);
  --blockquote-cite-style: normal;

  /* Code (Inline) */
  --code-bg: var(--surface);
  --code-color: var(--accent);
  --code-border: 1px solid var(--border);
  --code-border-radius: 4px;
  --code-padding: 0.2rem 0.4rem;
  --code-font-family: var(--font-mono);
  --code-font-size: 0.9rem;
  --code-font-weight: 500;

  /* Code Blocks */
  --code-block-bg: var(--surface);
  --code-block-border: 1px solid var(--border);
  --code-block-border-radius: 8px;
  --code-block-margin: 2.5rem 0;
  --code-block-font-family: var(--font-mono);
  --code-block-font-size: 0.85rem;
  --code-block-line-height: 1.5;
  --code-block-color: var(--fg);

  /* Code Block Header */
  --code-header-bg: var(--surface);
  --code-header-border-bottom: 1px solid var(--border);
  --code-header-padding: 0.75rem 1.25rem;
  --code-title-size: 0.85rem;
  --code-title-color: var(--fg);
  --code-lang-size: 0.75rem;
  --code-lang-color: var(--accent);

  /* Code Block Content */
  --code-content-padding: 1.5rem;
  --code-content-overflow: auto;

  /* Pre */
  --pre-bg: var(--surface);
  --pre-color: var(--fg);
  --pre-font-family: var(--font-mono);
  --pre-font-size: 0.85rem;
  --pre-line-height: 1.5;
  --pre-padding: 1.5rem;
  --pre-margin: 0;
  --pre-overflow: auto;
  --pre-border-radius: 8px;
  --pre-border: 1px solid var(--border);

  /* Tables */
  --table-bg: var(--surface);
  --table-border: 1px solid var(--border);
  --table-border-radius: 8px;
  --table-margin: 2rem 0;
  --table-width: 100%;
  --table-border-collapse: collapse;

  --th-bg: var(--glass);
  --th-color: var(--fg);
  --th-font-weight: 600;
  --th-padding: 0.75rem 1rem;
  --th-border-bottom: 2px solid var(--border);
  --th-text-align: left;

  --td-color: var(--fg);
  --td-padding: 0.75rem 1rem;
  --td-border-bottom: 1px solid var(--border);

  --tr-hover-bg: rgba(255, 255, 255, 0.02);

  /* Horizontal Rule */
  --hr-border: 1px solid var(--border);
  --hr-margin: 2.5rem 0;
  --hr-width: 100%;

  /* Strong & Em */
  --strong-color: var(--fg);
  --strong-weight: 600;
  --em-color: var(--fg);
  --em-style: italic;

  /* Mark/Highlight */
  --mark-bg: rgba(255, 255, 65, 0.2);
  --mark-color: var(--fg);
  --mark-padding: 0.1rem 0.2rem;
  --mark-border-radius: 2px;

  /* Deletion & Insertion */
  --del-color: var(--error);
  --del-decoration: line-through;
  --ins-color: var(--success);
  --ins-decoration: underline;

  /* Keyboard */
  --kbd-bg: var(--surface);
  --kbd-color: var(--fg);
  --kbd-border: 1px solid var(--border);
  --kbd-border-radius: 4px;
  --kbd-padding: 0.2rem 0.4rem;
  --kbd-font-family: var(--font-mono);
  --kbd-font-size: 0.85rem;
  --kbd-box-shadow: inset 0 -1px 0 var(--border);

  /* Abbreviation */
  --abbr-border-bottom: 1px dotted var(--muted);
  --abbr-cursor: help;
  --abbr-decoration: none;

  /* Definition List */
  --dl-margin: 1.5rem 0;
  --dt-color: var(--fg);
  --dt-font-weight: 600;
  --dt-margin: 1rem 0 0.5rem 0;
  --dd-color: var(--muted);
  --dd-margin: 0 0 1rem 1.5rem;

  /* Address */
  --address-color: var(--muted);
  --address-style: italic;
  --address-margin: 1rem 0;

  /* Details & Summary */
  --details-margin: 1.5rem 0;
  --details-border: 1px solid var(--border);
  --details-border-radius: 8px;
  --details-bg: var(--glass);

  --summary-color: var(--fg);
  --summary-font-weight: 600;
  --summary-padding: 1rem;
  --summary-cursor: pointer;
  --summary-transition: all 0.2s ease;
  --summary-hover-color: var(--accent);

  --details-content-padding: 0 1rem 1rem 1rem;
  --details-content-color: var(--muted);

  /* Form Elements (if needed) */
  --input-bg: var(--surface);
  --input-color: var(--fg);
  --input-border: 1px solid var(--border);
  --input-border-radius: 4px;
  --input-padding: 0.5rem 0.75rem;
  --input-font-family: var(--font-main);
  --input-font-size: 1rem;
  --input-focus-border-color: var(--accent);
  --input-focus-outline: none;
  --input-focus-box-shadow: 0 0 0 2px rgba(0, 255, 65, 0.2);

  /* Buttons */
  --btn-bg: var(--accent);
  --btn-color: var(--bg);
  --btn-border: 1px solid var(--accent);
  --btn-border-radius: 4px;
  --btn-padding: 0.5rem 1rem;
  --btn-font-family: var(--font-main);
  --btn-font-size: 0.9rem;
  --btn-font-weight: 500;
  --btn-cursor: pointer;
  --btn-transition: all 0.2s ease;
  --btn-hover-bg: #00cc33;
  --btn-hover-border-color: #00cc33;

  /* Special Components */
  --insight-box-bg: linear-gradient(
    135deg,
    rgba(0, 255, 65, 0.05),
    rgba(0, 255, 65, 0.02)
  );
  --insight-box-border: 1px solid rgba(0, 255, 65, 0.2);
  --insight-box-border-radius: 8px;
  --insight-box-padding: 1.75rem;
  --insight-box-margin: 2.5rem 0;
  --insight-box-title-color: var(--accent);
  --insight-box-title-size: 1.15rem;
  --insight-box-title-margin: 0 0 1rem 0;

  /* Tags */
  --tag-bg: var(--glass);
  --tag-color: var(--muted);
  --tag-border: 1px solid var(--border);
  --tag-border-radius: 16px;
  --tag-padding: 0.35rem 0.75rem;
  --tag-font-family: var(--font-mono);
  --tag-font-size: 0.75rem;
  --tag-font-weight: 500;
  --tag-transition: all 0.2s ease;
  --tag-hover-border-color: var(--accent);
  --tag-hover-color: var(--accent);

  /* Progress Bar */
  --progress-bg: var(--accent);
  --progress-height: 3px;
  --progress-transition: width 0.1s ease;

  /* Responsive Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;

  /* Animations */
  --transition-fast: 0.1s ease;
  --transition-normal: 0.2s ease;
  --transition-slow: 0.3s ease;
  --transition-veryslow: 0.5s ease;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);

  /* Z-Index Scale */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-toast: 1080;
}

/* Container */
.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Blog Post */
.blog-post {
  margin-top: 5rem;
  margin-bottom: 5rem;
}

/* Post Header - Improved layout and typography */
.post-header {
  margin-bottom: 3rem;
  text-align: center;
}

.post-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.85rem;
  color: var(--muted);
}

.post-date {
  color: var(--accent);
  font-weight: 500;
}

.post-reading-time {
  padding: 0.25rem 0.75rem;
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 16px;
  font-size: 0.75rem;
}

.post-title {
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--fg);
  margin-bottom: 1.25rem;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.post-subtitle {
  font-size: 1.05rem;
  color: var(--muted);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
}

.post-tags {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.post-tag {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.75rem;
  background: var(--glass);
  border: 1px solid var(--border);
  padding: 0.35rem 0.75rem;
  border-radius: 16px;
  color: var(--muted);
  transition: all 0.2s ease;
  font-weight: 500;
  cursor: pointer;
}

.post-tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Featured Image */
.post-image-container {
  margin-bottom: 3rem;
}

.post-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--border);
  margin-bottom: 1rem;
}

.image-caption {
  text-align: center;
  font-size: 0.85rem;
  color: var(--muted);
  font-style: italic;
  line-height: 1.5;
}

/* Content - Better typography and spacing */
.post-content {
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--fg);
}

.content-section {
  margin-bottom: 3rem;
}

/* Base Typography */
.post-content {
  font-size: var(--p-size);
  line-height: var(--p-line-height);
  color: var(--p-color);
  font-family: var(--font-main);
}

/* Headings */
.post-content h1 {
  font-size: var(--h1-size);
  font-weight: var(--h1-weight);
  color: var(--h1-color);
  margin: var(--h1-margin);
  line-height: var(--h1-line-height);
  letter-spacing: var(--h1-spacing);
  font-family: var(--font-heading);
}

.post-content h2 {
  font-size: var(--h2-size);
  font-weight: var(--h2-weight);
  color: var(--h2-color);
  margin: var(--h2-margin);
  line-height: var(--h2-line-height);
  letter-spacing: var(--h2-spacing);
  position: relative;
  font-family: var(--font-heading);
}

.post-content h2::before {
  content: "";
  position: absolute;
  left: var(--h2-accent-offset);
  top: 0.4rem;
  width: var(--h2-accent-width);
  height: var(--h2-accent-height);
  background: var(--h2-accent-color);
  border-radius: 2px;
}

.post-content h3 {
  font-size: var(--h3-size);
  font-weight: var(--h3-weight);
  color: var(--h3-color);
  margin: var(--h3-margin);
  line-height: var(--h3-line-height);
  font-family: var(--font-heading);
}

.post-content h4 {
  font-size: var(--h4-size);
  font-weight: var(--h4-weight);
  color: var(--h4-color);
  margin: var(--h4-margin);
  line-height: var(--h4-line-height);
  font-family: var(--font-heading);
}

.post-content h5 {
  font-size: var(--h5-size);
  font-weight: var(--h5-weight);
  color: var(--h5-color);
  margin: var(--h5-margin);
  line-height: var(--h5-line-height);
  font-family: var(--font-heading);
}

.post-content h6 {
  font-size: var(--h6-size);
  font-weight: var(--h6-weight);
  color: var(--h6-color);
  margin: var(--h6-margin);
  line-height: var(--h6-line-height);
  font-family: var(--font-heading);
}

/* Paragraphs */
.post-content p {
  font-size: var(--p-size);
  color: var(--p-color);
  line-height: var(--p-line-height);
  margin: var(--p-margin);
}

/* Lead paragraph */
.post-content .lead {
  font-size: var(--lead-size);
  color: var(--lead-color);
  font-weight: var(--lead-weight);
  line-height: var(--lead-line-height);
  margin: var(--lead-margin);
}

/* Links */
.post-content a {
  color: var(--link-color);
  text-decoration: var(--link-decoration);
  transition: var(--link-transition);
  text-underline-offset: var(--link-underline-offset);
}

.post-content a:hover {
  color: var(--link-hover-color);
  text-decoration: var(--link-hover-decoration);
}

.post-content a:visited {
  color: var(--link-visited-color);
}

/* Images */
.post-content img {
  max-width: var(--img-max-width);
  height: var(--img-height);
  border-radius: var(--img-border-radius);
  border: var(--img-border);
  margin: var(--img-margin);
  transition: var(--img-transition);
  display: block;
}

.post-content img:hover {
  transform: var(--img-hover-transform);
  border-color: var(--img-hover-border-color);
}

/* Figure and Caption */
.post-content figure {
  margin: var(--figure-margin);
  text-align: center;
}

.post-content figure img {
  margin: 0 auto;
}

.post-content figcaption {
  font-size: var(--figcaption-size);
  color: var(--figcaption-color);
  font-style: var(--figcaption-style);
  text-align: var(--figcaption-align);
  line-height: var(--figcaption-line-height);
  margin: var(--figcaption-margin);
}

/* Lists */
.post-content ul {
  margin: var(--ul-margin);
  padding: var(--ul-padding);
  list-style-type: none;
}

.post-content ul li {
  margin: var(--li-margin);
  color: var(--li-color);
  position: relative;
}

.post-content ul li::before {
  content: "•";
  color: var(--li-marker-color);
  position: absolute;
  left: -1.25rem;
  font-weight: bold;
}

.post-content ol {
  margin: var(--ol-margin);
  padding: var(--ol-padding);
  counter-reset: ol-counter;
}

.post-content ol li {
  margin: var(--li-margin);
  color: var(--li-color);
  position: relative;
  counter-increment: ol-counter;
}

.post-content ol li::before {
  content: counter(ol-counter) ".";
  color: var(--li-marker-color);
  position: absolute;
  left: -1.5rem;
  font-weight: bold;
  font-family: var(--font-mono);
}

/* Nested lists */
.post-content ul ul,
.post-content ol ol,
.post-content ul ol,
.post-content ol ul {
  margin: 0.5rem 0;
}

/* Blockquotes */
.post-content blockquote {
  background: var(--blockquote-bg);
  border-left: var(--blockquote-border-left);
  padding: var(--blockquote-padding);
  margin: var(--blockquote-margin);
  border-radius: var(--blockquote-border-radius);
  font-size: var(--blockquote-font-size);
  font-style: var(--blockquote-font-style);
  color: var(--blockquote-color);
  line-height: var(--blockquote-line-height);
}

.post-content blockquote p {
  margin-bottom: 1rem;
}

.post-content blockquote p:last-child {
  margin-bottom: 0;
}

.post-content blockquote cite {
  font-size: var(--blockquote-cite-size);
  color: var(--blockquote-cite-color);
  font-style: var(--blockquote-cite-style);
  display: block;
  margin-top: 0.5rem;
}

.post-content blockquote cite::before {
  content: "— ";
}

/* Code (inline) */
.post-content code {
  background: var(--code-bg);
  color: var(--code-color);
  border: var(--code-border);
  border-radius: var(--code-border-radius);
  padding: var(--code-padding);
  font-family: var(--code-font-family);
  font-size: var(--code-font-size);
  font-weight: var(--code-font-weight);
}

/* Code blocks */
.post-content pre {
  background: var(--pre-bg);
  color: var(--pre-color);
  font-family: var(--pre-font-family);
  font-size: var(--pre-font-size);
  line-height: var(--pre-line-height);
  padding: var(--pre-padding);
  margin: var(--pre-margin);
  overflow: var(--pre-overflow);
  border-radius: var(--pre-border-radius);
  border: var(--pre-border);
}

.post-content pre code {
  background: transparent;
  border: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

/* Code block with header */
.post-content .code-block {
  background: var(--code-block-bg);
  border: var(--code-block-border);
  border-radius: var(--code-block-border-radius);
  margin: var(--code-block-margin);
  overflow: hidden;
}

.post-content .code-header {
  background: var(--code-header-bg);
  border-bottom: var(--code-header-border-bottom);
  padding: var(--code-header-padding);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-content .code-title {
  font-family: var(--font-mono);
  font-size: var(--code-title-size);
  color: var(--code-title-color);
}

.post-content .code-lang {
  font-family: var(--font-mono);
  font-size: var(--code-lang-size);
  color: var(--code-lang-color);
}

.post-content .code-block pre {
  margin: 0;
  border: none;
  border-radius: 0;
  padding: var(--code-content-padding);
}

/* Tables */
.post-content table {
  width: var(--table-width);
  border-collapse: var(--table-border-collapse);
  background: var(--table-bg);
  border: var(--table-border);
  border-radius: var(--table-border-radius);
  margin: var(--table-margin);
  overflow: hidden;
}

.post-content thead th {
  background: var(--th-bg);
  color: var(--th-color);
  font-weight: var(--th-font-weight);
  padding: var(--th-padding);
  border-bottom: var(--th-border-bottom);
  text-align: var(--th-text-align);
}

.post-content tbody td {
  color: var(--td-color);
  padding: var(--td-padding);
  border-bottom: var(--td-border-bottom);
}

.post-content tbody tr:hover {
  background: var(--tr-hover-bg);
}

.post-content tbody tr:last-child td {
  border-bottom: none;
}

/* Horizontal Rule */
.post-content hr {
  border: var(--hr-border);
  margin: var(--hr-margin);
  width: var(--hr-width);
  border-top: none;
  border-left: none;
  border-right: none;
}

/* Text formatting */
.post-content strong {
  color: var(--strong-color);
  font-weight: var(--strong-weight);
}

.post-content em {
  color: var(--em-color);
  font-style: var(--em-style);
}

.post-content mark {
  background: var(--mark-bg);
  color: var(--mark-color);
  padding: var(--mark-padding);
  border-radius: var(--mark-border-radius);
}

.post-content del {
  color: var(--del-color);
  text-decoration: var(--del-decoration);
}

.post-content ins {
  color: var(--ins-color);
  text-decoration: var(--ins-decoration);
}

.post-content kbd {
  background: var(--kbd-bg);
  color: var(--kbd-color);
  border: var(--kbd-border);
  border-radius: var(--kbd-border-radius);
  padding: var(--kbd-padding);
  font-family: var(--kbd-font-family);
  font-size: var(--kbd-font-size);
  box-shadow: var(--kbd-box-shadow);
}

.post-content abbr[title] {
  border-bottom: var(--abbr-border-bottom);
  cursor: var(--abbr-cursor);
  text-decoration: var(--abbr-decoration);
}

.post-content small {
  font-size: var(--small-size);
  color: var(--small-color);
}

/* Definition Lists */
.post-content dl {
  margin: var(--dl-margin);
}

.post-content dt {
  color: var(--dt-color);
  font-weight: var(--dt-font-weight);
  margin: var(--dt-margin);
}

.post-content dd {
  color: var(--dd-color);
  margin: var(--dd-margin);
}

/* Address */
.post-content address {
  color: var(--address-color);
  font-style: var(--address-style);
  margin: var(--address-margin);
}

/* Details and Summary */
.post-content details {
  margin: var(--details-margin);
  border: var(--details-border);
  border-radius: var(--details-border-radius);
  background: var(--details-bg);
}

.post-content summary {
  color: var(--summary-color);
  font-weight: var(--summary-font-weight);
  padding: var(--summary-padding);
  cursor: var(--summary-cursor);
  transition: var(--summary-transition);
}

.post-content summary:hover {
  color: var(--summary-hover-color);
}

.post-content details[open] summary {
  border-bottom: 1px solid var(--border);
}

.post-content details > *:not(summary) {
  padding: var(--details-content-padding);
  color: var(--details-content-color);
}

/* Special Components */
.post-content .insight-box {
  background: var(--insight-box-bg);
  border: var(--insight-box-border);
  border-radius: var(--insight-box-border-radius);
  padding: var(--insight-box-padding);
  margin: var(--insight-box-margin);
}

.post-content .insight-box h3 {
  color: var(--insight-box-title-color);
  font-size: var(--insight-box-title-size);
  margin: var(--insight-box-title-margin);
}

.post-content .insight-box p:last-child {
  margin-bottom: 0;
}

/* Task Lists (GitHub-style) */
.post-content .task-list-item {
  list-style: none;
  position: relative;
}

.post-content .task-list-item::before {
  display: none;
}

.post-content .task-list-item input[type="checkbox"] {
  margin-right: 0.5rem;
  accent-color: var(--accent);
}

/* Footnotes */
.post-content .footnote-ref {
  font-size: 0.8rem;
  vertical-align: super;
  text-decoration: none;
  color: var(--accent);
}

.post-content .footnote-ref:hover {
  text-decoration: underline;
}

.post-content .footnotes {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  font-size: 0.9rem;
}

.post-content .footnotes ol {
  margin: 0;
  padding-left: 1.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .post-content {
    font-size: 1rem;
  }

  .post-content h1 {
    font-size: 1.85rem;
  }

  .post-content h2 {
    font-size: 1.45rem;
  }

  .post-content h2::before {
    left: -1rem;
  }

  .post-content .lead {
    font-size: 1.1rem;
  }

  .post-content pre {
    font-size: 0.8rem;
  }

  .post-content table {
    font-size: 0.9rem;
  }

  .post-content blockquote {
    font-size: 1rem;
    padding: 1rem 1.5rem;
  }
}

.code-wrapper {
  position: relative;
}

.code-wrapper .heading-row {
  position: absolute;
  z-index: 55;
  right: 0;
  top: 2.5rem;
  margin: 1rem;
}

/* Code Block */
.code-block {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  margin: 2.5rem 0;
  font-family: "Cascadia Code";
}

.code-header {
  background: var(--surface);
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.code-title {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.85rem;
  color: var(--fg);
}

.code-lang {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.75rem;
  color: var(--accent);
}

.code-block pre {
  padding: 1.5rem;
  overflow-x: auto;
  margin: 0;
}

.code-block code {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--fg);
}

/* Insight Box */
.insight-box {
  background: linear-gradient(
    135deg,
    rgba(0, 255, 65, 0.05),
    rgba(0, 255, 65, 0.02)
  );
  border: 1px solid rgba(0, 255, 65, 0.2);
  border-radius: 8px;
  padding: 1.75rem;
  margin: 2.5rem 0;
}

.insight-box h3 {
  color: var(--accent);
  margin-bottom: 1rem;
  font-size: 1.15rem;
}

.insight-box p {
  color: var(--fg);
  margin-bottom: 0;
}

/* Author Info */
.author-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.75rem;
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 3rem;
}

.author-avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 54px;
  height: 54px;
  background: var(--surface);
  border: 2px solid var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "JetBrains Mono", monospace;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--accent);
}

.author-name {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--fg);
  margin-bottom: 0.5rem;
}

.author-bio {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.5;
  margin: 0;
}

/* Post Navigation */
.post-navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 3rem;
}

.nav-item {
  padding: 1.5rem;
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.nav-item:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.nav-prev {
  text-align: left;
}

.nav-next {
  text-align: right;
}

.nav-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.75rem;
  color: var(--muted);
  display: block;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--fg);
  display: block;
  line-height: 1.4;
}

/* Reading Progress */
:global(.reading-progress) {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--accent);
  z-index: 1000;
  transition: width 0.1s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .blog-post {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }

  .post-title {
    font-size: 1.85rem;
  }

  .post-subtitle {
    font-size: 1rem;
  }

  .post-content {
    font-size: 1rem;
  }

  .lead {
    font-size: 1.1rem;
  }

  .post-content h2 {
    font-size: 1.45rem;
  }

  .post-content h2::before {
    left: -1rem;
  }

  .post-image {
    height: 250px;
  }

  .post-navigation {
    grid-template-columns: 1fr;
  }

  .author-info {
    flex-direction: column;
    text-align: center;
  }
}
</style>
