<template>
  <!-- Background -->
  <div class="eva-background">
    <img src="/eva-image-bg.jpg" alt="EVA Unit" class="eva-image active" />
    <div class="image-overlay"></div>
  </div>

  <!-- Grid overlay -->
  <div class="grid-overlay"></div>

  <!-- Navigation -->
  <Navbar variant="home" />

  <div class="container">
    <!-- Terminal -->
    <div class="terminal">
      <div class="terminal-header">
        <div class="terminal-dots">
          <div class="dot red"></div>
          <div class="dot yellow"></div>
          <div class="dot green"></div>
        </div>
        <div class="terminal-title">moisxn@nerv:~$</div>
      </div>
      <div class="terminal-content">
        <div>
          <span class="prompt">moisxn@nerv:~$</span>
          <span class="command" id="typed-text"></span>
          <span class="cursor" id="cursor">|</span>
        </div>
        <div class="output" id="output" style="display: none">
          <div class="name">Moisxn</div>
          <div class="role">Full Stack Developer</div>
          <div class="description">
            Building the future, one line of code at a time
          </div>
        </div>
      </div>
    </div>

    <!-- Experience -->
    <section class="section" id="experience">
      <div class="section-header">
        <h2 class="section-title">// experience</h2>
      </div>
      <div class="experience-item">
        <div class="experience-header">
          <div class="job-title">Full Stack Developer</div>
          <div class="job-period">2024 - 2025</div>
        </div>
        <div class="job-company">Verkum</div>
        <div class="job-description">
          Developed core features including file explorer, role-based
          protections, file renderer (pdf, docx, dwg), authentication system,
          and more.
        </div>
        <div class="job-tech">
          <span class="tech-tag">Next.js</span>
          <span class="tech-tag">Node.js</span>
          <span class="tech-tag">Supabase</span>
          <span class="tech-tag">TailwindCSS</span>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="section" id="skills">
      <div class="section-header">
        <h2 class="section-title">// skills</h2>
      </div>
      <div class="skills-grid">
        <div class="skill-category">
          <h3>Frontend</h3>
          <div class="skill-list">
            <div class="skill-item">
              <span class="skill-name">Vue.js</span>
              <span class="skill-level">90%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">React</span>
              <span class="skill-level">85%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">TypeScript</span>
              <span class="skill-level">88%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">Next.js</span>
              <span class="skill-level">82%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">Tailwind</span>
              <span class="skill-level">95%</span>
            </div>
          </div>
        </div>

        <div class="skill-category">
          <h3>Backend</h3>
          <div class="skill-list">
            <div class="skill-item">
              <span class="skill-name">Node.js</span>
              <span class="skill-level">87%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">Python</span>
              <span class="skill-level">50%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">PostgreSQL</span>
              <span class="skill-level">85%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">Supabase</span>
              <span class="skill-level">70%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">Docker</span>
              <span class="skill-level">78%</span>
            </div>
          </div>
        </div>

        <div class="skill-category">
          <h3>Tooling</h3>
          <div class="skill-list">
            <div class="skill-item">
              <span class="skill-name">Git</span>
              <span class="skill-level">60%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">VSCode</span>
              <span class="skill-level">80%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">Neovim</span>
              <span class="skill-level">50%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section class="section" id="projects">
      <div class="section-header">
        <h2 class="section-title">// projects</h2>
      </div>
      <div class="project-item">
        <div class="project-header">
          <div class="project-title">X Card Generator</div>
          <div class="project-status">LIVE</div>
        </div>
        <div class="project-description">
          A minimalist Twitter/X profile card generator with 10k+ users.
          Features real-time preview, real data, verification badge(Premium,
          Goverment, Bussines, Etc). Populated with data scraped from an old
          Twitter EndPoint.
        </div>
        <div class="project-links">
          <a href="#" class="project-link">demo</a>
          <a href="#" class="project-link">github</a>
        </div>
        <div class="job-tech">
          <span class="tech-tag">SvelteKit</span>
          <span class="tech-tag">TailwindCSS</span>
          <span class="tech-tag">API Integration</span>
        </div>
      </div>

      <div class="project-item">
        <div class="project-header">
          <div class="project-title">Flowbie</div>
          <div class="project-status">COMING SOON</div>
        </div>
        <div class="project-description">
          Next-generation bookmark manager with AI-powered categorization and
          collaborative features for teams.
        </div>
        <div class="project-links">
          <a href="#" class="project-link">github</a>
        </div>
        <div class="job-tech">
          <span class="tech-tag">Next.js</span>
          <span class="tech-tag">Node.js</span>
          <span class="tech-tag">AI/ML</span>
        </div>
      </div>

      <div class="project-item">
        <div class="project-header">
          <div class="project-title">IronGym Landing Page</div>
          <div class="project-status">LIVE</div>
        </div>
        <div class="project-description">
          A beautiful and modern landing page example for a gym. Built with
          modern and lightweight tech stack.
        </div>
        <div class="project-links">
          <a href="#" class="project-link">demo</a>
        </div>
        <div class="job-tech">
          <span class="tech-tag">React</span>
          <span class="tech-tag">Vite</span>
          <span class="tech-tag">TailwindCSS</span>
        </div>
      </div>
    </section>

    <!-- Blog -->
    <section class="section" id="blog">
      <div class="section-header">
        <h2 class="section-title">// blog</h2>
        <router-link to="/blog" class="section-more-button"
          >View More ->
        </router-link>
      </div>

      <article
        v-for="post in posts.slice(0, 2)"
        :key="post.slug"
        class="blog-item"
      >
        <div class="blog-header">
          <router-link :to="'blog/' + post.slug" class="blog-title">
            {{ post.title }}
          </router-link>
          <div class="blog-date">{{ formatDate(post.date) }}</div>
        </div>
        <div class="blog-excerpt">
          {{ post.excerpt }}
        </div>
        <div class="blog-tags">
          <span v-for="(tag, i) in post.tags" :key="i" class="blog-tag">{{
            tag
          }}</span>
        </div>
      </article>
    </section>

    <!-- Contact -->
    <section class="section" id="contact">
      <div class="section-header">
        <h2 class="section-title">// contact</h2>
      </div>
      <div class="contact-grid">
        <a href="mailto:moisxn1@gmail.com" class="contact-item">
          <svg
            class="contact-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <div class="contact-info">
            <div class="contact-label">Email</div>
            <div class="contact-value">moisxn1@gmail.com</div>
          </div>
        </a>

        <a href="https://github.com/moisnx" class="contact-item">
          <Github class="contact-icon" />
          <div class="contact-info">
            <div class="contact-label">GitHub</div>
            <div class="contact-value">github.com/moisnx</div>
          </div>
        </a>

        <a href="https://x.com/moisnx" class="contact-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="contact-icon"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
            />
          </svg>
          <div class="contact-info">
            <div class="contact-label">X/Twitter</div>
            <div class="contact-value">@moisnx</div>
          </div>
        </a>
      </div>
    </section>
  </div>

  <!-- Status Bar -->
  <div class="status-bar">
    <div class="status-item">
      <div class="status-dot pulse"></div>
      <span>EVA-01: OPERATIONAL</span>
    </div>
    <div class="status-item">
      <div class="status-dot warning pulse"></div>
      <span>SYNC: <span id="sync-ratio">400</span>%</span>
    </div>
    <div class="status-item">
      <div class="status-dot error"></div>
      <span>ANGELS: ALL CLEAR</span>
    </div>
  </div>
</template>

<script setup>
import { Github } from "lucide-vue-next";
import Navbar from "../components/Navbar.vue";

import { onMounted, ref } from "vue";
import { getAllPosts } from "../posts";
import { formatDate } from "../lib/utils";
// import router from "../router";

const posts = ref([]);
// Terminal typing animation
let typedText = "";
let showCursor = true;
let showOutput = false;
const command = "whoami";
let currentIndex = 0;

// Navigation and scroll handling
let showNav = false;
let activeSection = "experience";
const sections = ["experience", "skills", "projects", "blog", "contact"];

// Status bar variables
let syncRatio = 400;
let angelsDetected = false;

// Background images
const evaImages = [
  "/eva-image-bg-2.jpeg",
  "/eva-image-bg-3.jpeg",
  "/eva-image-bg.jpg",
];
let currentImageIndex = 0;

// Initialize everything when page loads
onMounted(() => {
  typeCommand();
  setupScrollListener();
  setupNavigation();
  startStatusUpdates();
  startImageRotation();
  posts.value = getAllPosts();
});

// Terminal typing animation
async function typeCommand() {
  const typedElement = document.getElementById("typed-text");
  const outputElement = document.getElementById("output");
  const cursorElement = document.getElementById("cursor");

  // Type the command
  for (let i = 0; i <= command.length; i++) {
    typedElement.textContent = command.slice(0, i);
    await sleep(100);
  }

  // Wait a bit then show output
  await sleep(500);
  outputElement.style.display = "block";

  // Show navigation after output appears
  setTimeout(() => {
    const nav = document.getElementById("nav");
    nav.classList.add("visible");
    showNav = true;
  }, 1000);
}

// Sleep utility function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Setup scroll listener for navigation
function setupScrollListener() {
  window.addEventListener("scroll", handleScroll);
}

function handleScroll() {
  const scrollY = window.scrollY;

  // Update active section based on scroll position
  sections.forEach((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        updateActiveSection(sectionId);
      }
    }
  });
}

// Setup navigation click handlers
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const section = this.getAttribute("data-section");
      scrollToSection(section);
    });
  });
}

// Update active navigation link
function updateActiveSection(sectionId) {
  if (activeSection !== sectionId) {
    activeSection = sectionId;

    // Update nav link classes
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-section") === sectionId) {
        link.classList.add("active");
      }
    });
  }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Status bar updates
function startStatusUpdates() {
  const syncElement = document.getElementById("sync-ratio");

  setInterval(() => {
    // Update sync ratio
    syncRatio = Math.floor(Math.random() * 100) + 350;
    if (syncElement) {
      syncElement.textContent = syncRatio;
    }

    // Randomly detect angels (rare event)
    angelsDetected = Math.random() < 0.05;
    updateAngelStatus();
  }, 3000);
}

// Update angel detection status
function updateAngelStatus() {
  const statusItems = document.querySelectorAll(".status-item");
  const angelStatus = statusItems[2]; // Third status item

  if (angelStatus) {
    const dot = angelStatus.querySelector(".status-dot");
    const text = angelStatus.querySelector("span");

    if (angelsDetected) {
      dot.classList.add("error");
      dot.classList.add("pulse");
      text.textContent = "ANGELS: DETECTED";
    } else {
      dot.classList.remove("error");
      dot.classList.remove("pulse");
      text.textContent = "ANGELS: ALL CLEAR";
    }
  }
}

// Background image rotation
function startImageRotation() {
  const image = document.querySelector(".eva-image");

  setInterval(() => {
    if (evaImages.length > 1) {
      // Fade out current image
      image.classList.remove("active");

      // Move to next image
      currentImageIndex = (currentImageIndex + 1) % evaImages.length;

      // Update src and fade in new image
      setTimeout(() => {
        image.src = evaImages[currentImageIndex]; // Fixed: use evaImages array
        image.classList.add("active");
      }, 500);
    }
  }, 8000);
}

// Cursor blinking animation
setInterval(() => {
  const cursor = document.getElementById("cursor");
  if (cursor) {
    showCursor = !showCursor;
    cursor.style.opacity = showCursor ? "1" : "0";
  }
}, 500);

// Add some interactive effects
document.addEventListener("mousemove", function (e) {
  // Subtle parallax effect for grid
  const grid = document.querySelector(".grid-overlay");
  if (grid) {
    const x = (e.clientX / window.innerWidth) * 10;
    const y = (e.clientY / window.innerHeight) * 10;
    grid.style.transform = `translate(${x}px, ${y}px)`;
  }
});

// Add click effects to tech tags
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("tech-tag")) {
    e.target.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 150);
  }
});

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // Press 'h' to go to top
  if (e.key === "h" || e.key === "H") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Press numbers 1-5 to navigate sections
  const num = parseInt(e.key);
  if (num >= 1 && num <= 5) {
    const sectionId = sections[num - 1];
    scrollToSection(sectionId);
  }
});

// Add loading animation completion
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});
</script>
