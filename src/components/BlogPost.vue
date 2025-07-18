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
    <!-- Blog Post -->
    <article class="blog-post">
      <!-- Header -->
      <header class="post-header">
        <div class="post-meta">
          <time class="post-date">2024.01.15</time>
          <span class="post-reading-time">8 min read</span>
        </div>
        <h1 class="post-title">The Third Impact of Modern Web Development</h1>
        <p class="post-subtitle">
          Exploring how modern frameworks are reshaping the digital landscape,
          much like the Third Impact reshaped humanity in Evangelion.
        </p>
        <div class="post-tags">
          <span class="post-tag">Vue.js</span>
          <span class="post-tag">Philosophy</span>
          <span class="post-tag">Web Dev</span>
          <span class="post-tag">Architecture</span>
        </div>
      </header>

      <!-- Featured Image -->
      <div class="post-image-container">
        <img src="/eva-image-bg.jpg" alt="EVA Unit" class="post-image" />
        <div class="image-caption">
          The digital frontier awaits—much like the mysteries of the Human
          Instrumentality Project.
        </div>
      </div>

      <!-- Content -->
      <div class="post-content">
        <section class="content-section">
          <p class="lead">
            In the world of Neon Genesis Evangelion, the Third Impact represents
            a fundamental transformation of human consciousness and reality
            itself. Similarly, modern web development frameworks are
            orchestrating their own "Third Impact" on how we build and interact
            with digital experiences.
          </p>

          <h2>The Evolution of Digital Consciousness</h2>
          <p>
            Just as the Angels in Evangelion possess unique AT Fields that
            define their individual existence, modern web frameworks have
            developed their own "AT Fields"— protective barriers of abstraction
            that shield developers from the chaos of vanilla JavaScript while
            enabling unprecedented creative expression.
          </p>

          <p>
            Vue.js, React, and Angular represent different approaches to this
            digital evolution. Each framework embodies a distinct philosophy
            about how human thought should interface with machine logic, much
            like how different characters in Evangelion represent various
            approaches to human connection and isolation.
          </p>

          <blockquote class="post-quote">
            <p>
              "The boundary between self and other is the first thing that must
              be crossed to understand the web."
            </p>
            <cite>— Adapted from Evangelion philosophy</cite>
          </blockquote>

          <h2>
            Component-Based Architecture: The Human Instrumentality Project
          </h2>
          <p>
            The Human Instrumentality Project sought to break down the barriers
            between individual consciousness, creating a unified existence.
            Modern web development has achieved something similar through
            component-based architecture—breaking down monolithic applications
            into interconnected, reusable components.
          </p>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">ComponentInstrumentality.vue</span>
              <span class="code-lang">Vue 3</span>
            </div>
            <pre><code>&lt;template&gt;
        &lt;div class="eva-unit"&gt;
          &lt;Component 
            :is="currentForm" 
            :sync-ratio="syncRatio"
            @impact="handleThirdImpact"
          /&gt;
        &lt;/div&gt;
      &lt;/template&gt;
      
      &lt;script setup&gt;
      import { ref, computed } from 'vue'
      
      const syncRatio = ref(400)
      const currentForm = computed(() => 
        syncRatio.value > 300 ? 'EvaUnit01' : 'BerserkMode'
      )
      
      const handleThirdImpact = (event) => {
        console.log('All barriers dissolved:', event)
      }
      &lt;/script&gt;</code></pre>
          </div>

          <h2>State Management: The Collective Unconscious</h2>
          <p>
            In Evangelion, the collective unconscious represents shared human
            experience and memory. Modern web applications achieve something
            similar through sophisticated state management—creating a shared
            consciousness that coordinates the behavior of countless components
            across the digital landscape.
          </p>

          <p>
            Tools like Vuex, Redux, and Zustand serve as the "LCL" (Link Connect
            Liquid) of our applications, creating a medium through which
            components can share consciousness and coordinate their actions
            seamlessly.
          </p>

          <h2>The AT Field of Abstraction</h2>
          <p>
            Every developer maintains their own AT Field—a barrier of familiar
            patterns and comfortable abstractions that protects them from the
            overwhelming complexity of modern web development. These fields are
            both necessary for survival and limiting for growth.
          </p>

          <div class="insight-box">
            <h3>Developer Insight</h3>
            <p>
              Breaking down your AT Field means embracing new paradigms,
              questioning established patterns, and being willing to experience
              the brief chaos that comes with learning something fundamentally
              different.
            </p>
          </div>

          <h2>The Future: Beyond the Third Impact</h2>
          <p>
            As we stand at the threshold of new paradigms—Web3, AI integration,
            edge computing—we face our own Third Impact. The question isn't
            whether it will happen, but how we'll choose to evolve alongside our
            tools.
          </p>

          <p>
            Will we maintain our individual AT Fields, working in isolation with
            our chosen frameworks? Or will we embrace a new form of digital
            consciousness that transcends the boundaries between languages,
            platforms, and paradigms?
          </p>

          <p>
            The choice, as always, is ours to make. But remember: in both
            Evangelion and web development, the most profound transformations
            happen not when we eliminate all barriers, but when we learn to
            connect meaningfully across them.
          </p>
        </section>

        <!-- Author Info -->
        <div class="author-info">
          <div class="author-avatar">
            <div class="avatar-placeholder">DEV</div>
          </div>
          <div class="author-details">
            <h4 class="author-name">Neural Bridge Developer</h4>
            <p class="author-bio">
              Exploring the intersection of human consciousness and digital
              architecture. Building bridges between the physical and digital
              worlds.
            </p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="post-navigation">
          <div class="nav-item nav-prev">
            <span class="nav-label">Previous</span>
            <span class="nav-title">The Angel of Async Programming</span>
          </div>
          <div class="nav-item nav-next">
            <span class="nav-label">Next</span>
            <span class="nav-title">Building EVA Units with Vue 3</span>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Navbar from "../components/Navbar.vue";

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

<style scoped>
/* Import existing styles */

/* Background styles */
.eva-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  overflow: hidden;
}

.eva-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 4s ease;
  opacity: 0.3;
}

.eva-image.active {
  opacity: 0.5;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(10, 10, 10, 0.8) 0%,
    rgba(10, 10, 10, 0.9) 50%,
    rgba(10, 10, 10, 0.95) 100%
  );
}

.grid-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 120%;
  height: 120%;
  background-image: linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: grid-drift 40s linear infinite;
  pointer-events: none;
  z-index: -1;
}

@keyframes grid-drift {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(60px, 60px);
  }
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

.lead {
  font-size: 1.2rem;
  color: var(--fg);
  margin-bottom: 2.5rem;
  font-weight: 400;
  line-height: 1.65;
}

.post-content h2 {
  font-size: 1.65rem;
  font-weight: 600;
  color: var(--fg);
  margin: 2.5rem 0 1.25rem 0;
  position: relative;
  letter-spacing: -0.01em;
}

.post-content h2::before {
  content: "";
  position: absolute;
  left: -1.25rem;
  top: 0.4rem;
  width: 3px;
  height: 1.4rem;
  background: var(--accent);
  border-radius: 2px;
}

.post-content h3 {
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--fg);
  margin: 2rem 0 1rem 0;
}

.post-content p {
  margin-bottom: 1.5rem;
  color: var(--fg);
}

/* Quote */
.post-quote {
  background: var(--glass);
  border-left: 4px solid var(--accent);
  padding: 1.5rem 2rem;
  margin: 2.5rem 0;
  border-radius: 0 8px 8px 0;
}

.post-quote p {
  font-size: 1.15rem;
  font-style: italic;
  margin-bottom: 1rem;
  color: var(--fg);
  line-height: 1.6;
}

.post-quote cite {
  font-size: 0.9rem;
  color: var(--muted);
  font-style: normal;
}

/* Code Block */
.code-block {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  margin: 2.5rem 0;
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
