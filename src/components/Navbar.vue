<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

defineProps<{
  variant?: string;
}>();

const activeSection = ref("experience");
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const sections = [
  { id: "experience", label: "experience" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "blog", label: "blog" },
  { id: "contact", label: "contact" },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const scrollToSection = (sectionId: string) => {
  activeSection.value = sectionId;
  isMobileMenuOpen.value = false;

  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  // Intersection Observer for active section tracking
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => {
    const element = document.getElementById(section.id);
    if (element) observer.observe(element);
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <!-- Home variant with full navigation -->
  <nav
    class="nav"
    :class="{
      'nav--scrolled': isScrolled,
      'nav--visible': variant?.includes('home'),
    }"
    v-if="variant?.includes('home')"
  >
    <div class="nav-content">
      <!-- Logo with glitch effect -->
      <div class="nav-logo-container">
        <a href="/" class="nav-logo">
          <span class="nav-logo-text" data-text="moisxn@nerv:~$">
            moisxn@nerv:~$
          </span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="nav-links">
        <button
          v-for="section in sections"
          :key="section.id"
          class="nav-link"
          :class="{ 'nav-link--active': activeSection === section.id }"
          @click="scrollToSection(section.id)"
        >
          <span class="nav-link-text">{{ section.label }}</span>
          <span class="nav-link-indicator"></span>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="nav-mobile-toggle"
        @click="toggleMobileMenu"
        :class="{ 'nav-mobile-toggle--active': isMobileMenuOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      class="nav-mobile-menu"
      :class="{ 'nav-mobile-menu--open': isMobileMenuOpen }"
    >
      <div class="nav-mobile-content">
        <button
          v-for="(section, index) in sections"
          :key="section.id"
          class="nav-mobile-link"
          :class="{ 'nav-mobile-link--active': activeSection === section.id }"
          @click="scrollToSection(section.id)"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <span class="nav-mobile-link-text">{{ section.label }}</span>
        </button>
      </div>
    </div>
  </nav>

  <!-- Blog variant with minimal navigation -->
  <nav
    class="nav nav--minimal nav--visible"
    :class="{ 'nav--scrolled': isScrolled }"
    v-else
  >
    <div class="nav-content">
      <div class="nav-logo-container">
        <a href="/" class="nav-logo">
          <span class="nav-logo-text" data-text="moisxn@nerv:~$">
            moisxn@nerv:~$
          </span>
        </a>
      </div>
      <div class="nav-links">
        <router-link class="nav-link nav-link--active" to="/gallery">
          <span class="nav-link-text">Gallery</span>
          <span class="nav-link-indicator"></span>
        </router-link>
        <router-link class="nav-link nav-link--active" to="/blog">
          <span class="nav-link-text">Blog</span>
          <span class="nav-link-indicator"></span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  transform: translateY(-100%);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.nav--visible {
  transform: translateY(0);
}

.nav--scrolled {
  background: rgba(10, 10, 10, 0.95);
  box-shadow: 0 4px 20px rgba(0, 255, 65, 0.1);
}

.nav-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  position: relative;
}

/* Logo with glitch effect */
.nav-logo-container {
  position: relative;
}

.nav-logo {
  font-family: "JetBrains Mono", monospace;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
}

.nav-logo:hover {
  text-shadow: 0 0 10px var(--accent);
}

.nav-logo-text {
  position: relative;
  display: inline-block;
}

.nav-logo-text::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: var(--accent);
  opacity: 0;
  animation: glitch 0.3s ease-in-out;
  animation-play-state: paused;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  transform: translate(-2px, -2px);
  text-shadow: 2px 0 #ff3333;
}

.nav-logo:hover .nav-logo-text::before {
  animation-play-state: running;
}

@keyframes glitch {
  0%,
  100% {
    opacity: 0;
    transform: translate(0, 0);
  }
  20% {
    opacity: 1;
    transform: translate(-2px, 2px);
  }
  40% {
    opacity: 1;
    transform: translate(2px, -2px);
  }
  60% {
    opacity: 1;
    transform: translate(-2px, -2px);
  }
  80% {
    opacity: 1;
    transform: translate(2px, 2px);
  }
}

/* Desktop Navigation Links */
.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  background: none;
  border: none;
  color: var(--muted);
  font-size: 0.9rem;
  cursor: pointer;
  position: relative;
  padding: 0.5rem 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: "JetBrains Mono", monospace;
  overflow: hidden;
}

.nav-link::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 255, 65, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover .nav-link-text {
  color: var(--accent);
  text-shadow: 0 0 5px var(--accent);
}

.nav-link--active .nav-link-text {
  color: var(--accent);
}

.nav-link-text {
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.nav-link-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-50%);
}

.nav-link--active .nav-link-indicator {
  width: 80%;
  box-shadow: 0 0 10px var(--accent);
}

.nav-link:hover .nav-link-indicator {
  width: 60%;
}

/* Mobile Menu Button */
.nav-mobile-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 4px;
  z-index: 101;
}

.nav-mobile-toggle span {
  width: 20px;
  height: 2px;
  background: var(--accent);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.nav-mobile-toggle--active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.nav-mobile-toggle--active span:nth-child(2) {
  opacity: 0;
}

.nav-mobile-toggle--active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Menu Overlay */
.nav-mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 99;
}

.nav-mobile-menu--open {
  opacity: 1;
  visibility: visible;
}

.nav-mobile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
}

.nav-mobile-link {
  background: none;
  border: none;
  color: var(--muted);
  font-size: 1.2rem;
  font-family: "JetBrains Mono", monospace;
  cursor: pointer;
  padding: 1rem 2rem;
  position: relative;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s ease forwards;
}

.nav-mobile-link:hover .nav-mobile-link-text,
.nav-mobile-link--active .nav-mobile-link-text {
  color: var(--accent);
  text-shadow: 0 0 10px var(--accent);
}

.nav-mobile-link-text {
  transition: all 0.3s ease;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-content {
    padding: 0 1rem;
  }

  .nav-links {
    display: none;
  }

  .nav-mobile-toggle {
    display: flex;
  }

  .nav--minimal .nav-links {
    display: flex;
  }

  .nav--minimal .nav-mobile-toggle {
    display: none;
  }
}

@media (max-width: 480px) {
  .nav-content {
    height: 50px;
  }

  .nav-logo {
    font-size: 0.9rem;
  }
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Performance optimizations */
.nav-link,
.nav-logo,
.nav-mobile-toggle {
  -webkit-tap-highlight-color: transparent;
}

.nav {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
</style>
