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
    <!-- Terminal -->
    <div class="terminal">
      <div class="terminal-header">
        <div class="terminal-dots">
          <div class="dot red"></div>
          <div class="dot yellow"></div>
          <div class="dot green"></div>
        </div>
        <div class="terminal-title" :class="{ glitch: showGlitch }">
          error@nerv:~$
        </div>
      </div>
      <div class="terminal-content">
        <div>
          <span class="prompt">error@nerv:~$</span>
          <span class="command" id="typed-text">{{ typedText }}</span>
          <span class="cursor" :style="{ opacity: showCursor ? 1 : 0 }">|</span>
        </div>
        <div class="output" v-show="showOutput">
          <div class="error">bash: /404: No such file or directory</div>

          <div class="ascii-art">
            <pre>
    ┌─────────────────────────────────────┐
    │           ERROR CODE: 404           │
    │      PAGE NOT FOUND IN SYSTEM      │
    └─────────────────────────────────────┘
                    
         ⚠️  NERV SYSTEM ALERT  ⚠️
         
    The requested resource could not be
    located in the MAGI database.
            </pre>
          </div>

          <div class="warning">
            WARNING: Attempting to access restricted area
          </div>
          <div>Scanning available directories...</div>

          <div class="file-listing">
            <div class="file-item">
              <span class="file-perms">drwxr-xr-x</span>
              <router-link to="/" class="file-name">home/</router-link>
            </div>

            <div class="file-item">
              <span class="file-perms">drwxr-xr-x</span>
              <router-link to="/blog" class="file-name">blog/</router-link>
            </div>
          </div>

          <div class="navigation-help">
            <div class="success">AVAILABLE COMMANDS:</div>
            <div>
              • <span class="command">cd /</span> - Return to main directory
            </div>
            <div>
              • <span class="command">help</span> - Show navigation options
            </div>
            <div>• <span class="command">exit</span> - Return to safety</div>
            <br />
          </div>

          <div style="margin-top: 20px">
            <div class="prompt">error@nerv:~$</div>
            <span class="cursor" :style="{ opacity: showCursor ? 1 : 0 }"
              >|</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: #ff4444;
  font-weight: bold;
}

.warning {
  color: #ffaa00;
}

.success {
  color: #44ff44;
}

.file-listing {
  margin: 10px 0;
  padding-left: 20px;
}

.file-item {
  display: flex;
  margin: 5px 0;
  font-family: monospace;
}

.file-perms {
  color: #888888;
  width: 120px;
}

.file-name {
  color: #00aaff;
  text-decoration: underline;
  transition: all 0.3s ease;
}

.file-name:hover {
  color: #44ff44;
  text-shadow: 0 0 10px currentColor;
}

.ascii-art {
  font-family: monospace;
  font-size: 12px;
  line-height: 1.2;
  color: #ff4444;
  margin: 20px 0;
  text-align: center;
}

.navigation-help {
  margin-top: 20px;
  padding: 15px;
  background: rgba(0, 255, 0, 0.1);
  border-left: 3px solid #00ff00;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Navbar from "../components/Navbar.vue";

// Terminal typing animation
const typedText = ref("");
const showCursor = ref(true);
const showOutput = ref(false);
const showGlitch = ref(false);
const command = "ls /404/requested_page";
let currentIndex = 0;

// Status bar variables
const syncRatio = ref(400);
const angelsDetected = ref(false);

// Background images
const evaImages = [
  "/eva-image-bg-2.jpeg",
  "/eva-image-bg-3.jpeg",
  "/eva-image-bg.jpg",
];
const currentImageIndex = ref(0);

// Intervals
let cursorInterval;
let statusInterval;
let imageInterval;
let glitchInterval;

// Initialize everything when component mounts
onMounted(() => {
  typeCommand();
  startStatusUpdates();
  startImageRotation();
  startCursorBlink();
  startGlitchEffect();
  addKeyboardShortcuts();
  addMouseEffects();
});

// Clean up intervals when component unmounts
onUnmounted(() => {
  if (cursorInterval) clearInterval(cursorInterval);
  if (statusInterval) clearInterval(statusInterval);
  if (imageInterval) clearInterval(imageInterval);
  if (glitchInterval) clearInterval(glitchInterval);
});

// Terminal typing animation
async function typeCommand() {
  // Type the command
  for (let i = 0; i <= command.length; i++) {
    typedText.value = command.slice(0, i);
    await sleep(80);
  }

  // Wait a bit then show output
  await sleep(800);
  showOutput.value = true;

  // Add glitch effect after output appears
  setTimeout(() => {
    showGlitch.value = true;
    setTimeout(() => {
      showGlitch.value = false;
    }, 300);
  }, 1500);
}

// Sleep utility function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Status bar updates
function startStatusUpdates() {
  statusInterval = setInterval(() => {
    // Update sync ratio
    syncRatio.value = Math.floor(Math.random() * 100) + 350;

    // Randomly detect angels (rare event)
    angelsDetected.value = Math.random() < 0.1;
  }, 3000);
}

// Background image rotation
function startImageRotation() {
  imageInterval = setInterval(() => {
    if (evaImages.length > 1) {
      currentImageIndex.value =
        (currentImageIndex.value + 1) % evaImages.length;
    }
  }, 8000);
}

// Cursor blinking animation
function startCursorBlink() {
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value;
  }, 500);
}

// Random glitch effect
function startGlitchEffect() {
  glitchInterval = setInterval(() => {
    if (Math.random() < 0.1) {
      showGlitch.value = true;
      setTimeout(() => {
        showGlitch.value = false;
      }, 300);
    }
  }, 5000);
}

// Add keyboard shortcuts
function addKeyboardShortcuts() {
  const handleKeydown = (e) => {
    // Press 'h' to go home
    if (e.key === "h" || e.key === "H") {
      window.location.href = "/";
    }

    // Press 'r' to reload/retry
    if (e.key === "r" || e.key === "R") {
      window.location.reload();
    }

    // Press 'b' to go back
    if (e.key === "b" || e.key === "B") {
      window.history.back();
    }
  };

  document.addEventListener("keydown", handleKeydown);

  // Clean up event listener
  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown);
  });
}

// Add mouse effects
function addMouseEffects() {
  const handleMouseMove = (e) => {
    // Subtle parallax effect for grid
    const grid = document.querySelector(".grid-overlay");
    if (grid) {
      const x = (e.clientX / window.innerWidth) * 10;
      const y = (e.clientY / window.innerHeight) * 10;
      grid.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  document.addEventListener("mousemove", handleMouseMove);

  // Clean up event listener
  onUnmounted(() => {
    document.removeEventListener("mousemove", handleMouseMove);
  });
}
</script>
