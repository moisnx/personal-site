<template>
  <!-- Background -->
  <div class="eva-background">
    <img src="/eva-image-bg.jpg" alt="EVA Unit" class="eva-image active" />
    <div class="image-overlay"></div>
  </div>

  <!-- Grid overlay -->
  <div class="grid-overlay"></div>

  <!-- Navigation -->
  <Navbar />

  <div class="container">
    <section class="section blog-section" id="blog">
      <div class="section-header">
        <h2 class="section-title">// blog</h2>
      </div>

      <article
        v-for="post in posts"
        :key="post.slug"
        class="blog-item"
        @click="this.$router.push(`/blog/${post.slug}`)"
      >
        <div class="blog-header">
          <div class="blog-title">
            {{ post.title }}
          </div>
          <div class="blog-date">{{ formatDate(post.date) }}</div>
        </div>
        <div class="blog-excerpt">
          {{ post.excerpt }}
        </div>
        <div class="blog-tags">
          <span v-for="tag in post.tags" :key="tag" class="blog-tag">
            {{ tag }}
          </span>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.blog-section {
  margin-top: 10rem;
}
.blog-item {
  cursor: pointer;
}
</style>

<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../components/Navbar.vue";
import { getAllPosts } from "../posts";
// import router from "../router";

const posts = ref([]);
// Background images
const evaImages = [
  "/eva-image-bg-2.jpeg",
  "/eva-image-bg-3.jpeg",
  "/eva-image-bg.jpg",
];
let currentImageIndex = 0;

onMounted(() => {
  startImageRotation();
  setupReadingProgress();
  posts.value = getAllPosts();
  // console.log("Posts loaded:", posts.value); // Debug log
});

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
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0].replace(/-/g, ".");
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
