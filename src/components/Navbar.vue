<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
// const route = useRoute();

defineProps<{
  variant?: "home" | "blog" | "gallery";
}>();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const scrollToSection = (sectionId: string) => {
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

const handleNavClick = (target: string, variant?: string) => {
  if (variant === "home") {
    // On home page, scroll to sections
    if (target === "blog") {
      scrollToSection("blog");
    } else if (target === "gallery") {
      router.push("/gallery");
    }
  } else {
    // On other pages, navigate to routes
    router.push(`/${target}`);
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav class="nav" :class="{ 'nav--scrolled': isScrolled }">
    <div class="nav-container">
      <!-- Logo -->
      <a href="/" class="nav-logo">
        <span class="nav-logo-text" data-text="moisxn@nerv:~$">
          moisxn@nerv:~$
        </span>
      </a>

      <!-- Desktop Navigation -->
      <div class="nav-links">
        <button class="nav-link" @click="handleNavClick('gallery', variant)">
          Gallery
        </button>
        <button class="nav-link" @click="handleNavClick('blog', variant)">
          Blog
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="nav-toggle"
        @click="toggleMobileMenu"
        :class="{ 'nav-toggle--active': isMobileMenuOpen }"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="nav-menu" :class="{ 'nav-menu--open': isMobileMenuOpen }">
      <button class="nav-menu-link" @click="handleNavClick('gallery', variant)">
        Gallery
      </button>
      <button class="nav-menu-link" @click="handleNavClick('blog', variant)">
        Blog
      </button>
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
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  transition: all 0.3s ease;
}

.nav--scrolled {
  background: rgba(10, 10, 10, 0.95);
  box-shadow: 0 2px 20px rgba(0, 255, 65, 0.08);
}

.nav-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

/* Logo */
.nav-logo {
  font-family: "JetBrains Mono", monospace;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--accent);
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
}

.nav-logo:hover {
  text-shadow: 0 0 8px var(--accent);
}

.nav-logo-text {
  position: relative;
}

.nav-logo-text::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  color: var(--accent);
  opacity: 0;
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
  transform: translate(-1px, -1px);
  text-shadow: 1px 0 #ff3333;
  transition: opacity 0.2s ease;
}

.nav-logo:hover .nav-logo-text::before {
  opacity: 1;
  animation: glitch 0.3s ease;
}

@keyframes glitch {
  0%,
  100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-1px, 1px);
  }
  50% {
    transform: translate(1px, -1px);
  }
  75% {
    transform: translate(-1px, -1px);
  }
}

/* Desktop Links */
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
  font-family: "JetBrains Mono", monospace;
  cursor: pointer;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: var(--accent);
}

.nav-link:hover::after {
  width: 100%;
}

/* Mobile Toggle */
.nav-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  gap: 4px;
}

.nav-toggle span {
  width: 18px;
  height: 2px;
  background: var(--accent);
  transition: all 0.3s ease;
  border-radius: 1px;
}

.nav-toggle--active span:first-child {
  transform: rotate(45deg) translate(4px, 4px);
}

.nav-toggle--active span:last-child {
  transform: rotate(-45deg) translate(4px, -4px);
}

/* Mobile Menu */
.nav-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  transform: translateY(-10px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.nav-menu--open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.nav-menu-link {
  display: block;
  width: 100%;
  background: none;
  border: none;
  color: var(--muted);
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9rem;
  padding: 0.75rem 1.5rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-menu-link:hover {
  color: var(--accent);
  background: rgba(0, 255, 65, 0.05);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
    height: 50px;
  }

  .nav-links {
    display: none;
  }

  .nav-toggle {
    display: flex;
  }

  .nav-logo {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    height: 45px;
  }

  .nav-logo {
    font-size: 0.8rem;
  }
}

/* Performance */
.nav {
  will-change: background-color, box-shadow;
}

.nav-link,
.nav-logo,
.nav-toggle {
  -webkit-tap-highlight-color: transparent;
}
</style>
