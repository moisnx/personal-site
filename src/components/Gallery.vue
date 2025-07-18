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
    <section class="section gallery-section" id="gallery">
      <div class="section-header">
        <h2 class="section-title">// gallery</h2>
        <div class="gallery-filters">
          <button
            @click="activeFilter = 'all'"
            :class="{ active: activeFilter === 'all' }"
            class="filter-btn"
          >
            all
          </button>
          <button
            @click="activeFilter = 'image'"
            :class="{ active: activeFilter === 'image' }"
            class="filter-btn"
          >
            images
          </button>
          <button
            @click="activeFilter = 'post-linked'"
            :class="{ active: activeFilter === 'post-linked' }"
            class="filter-btn"
          >
            posts
          </button>
        </div>
      </div>

      <!-- Minimal Gallery Grid -->
      <div class="gallery-grid">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="gallery-item"
          @click="openModal(item)"
        >
          <div class="gallery-frame">
            <img
              :src="item.thumbnail || item.image"
              :alt="item.alt || item.title"
              class="gallery-image"
            />
            <div class="gallery-label">
              <span class="item-title">{{ item.title }}</span>
              <span class="item-date">{{ formatDate(item.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Enhanced Modal -->
  <div v-if="selectedItem" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <!-- Close button -->
      <button class="modal-close" @click="closeModal">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Modal content -->
      <div class="modal-content">
        <!-- Image section -->
        <div class="modal-image-section">
          <div class="modal-image-container">
            <img
              :src="selectedItem.image"
              :alt="selectedItem.alt || selectedItem.title"
              class="modal-image"
            />
          </div>
        </div>

        <!-- Info section -->
        <div class="modal-info-section">
          <div class="modal-header">
            <h2 class="modal-title">{{ selectedItem.title }}</h2>
            <p class="modal-date">{{ formatDate(selectedItem.date) }}</p>
          </div>

          <div class="modal-body">
            <p v-if="selectedItem.description" class="modal-description">
              {{ selectedItem.description }}
            </p>

            <!-- Tags -->
            <div
              v-if="selectedItem.tags && selectedItem.tags.length"
              class="modal-tags"
            >
              <span
                v-for="tag in selectedItem.tags"
                :key="tag"
                class="modal-tag"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Image metadata -->
            <div
              v-if="
                selectedItem.type === 'image' && hasImageMetadata(selectedItem)
              "
              class="modal-metadata"
            >
              <h4 class="metadata-title">// technical details</h4>
              <div class="metadata-list">
                <div v-if="selectedItem.camera" class="metadata-row">
                  <span class="metadata-label">Camera</span>
                  <span class="metadata-value">{{ selectedItem.camera }}</span>
                </div>
                <div v-if="selectedItem.lens" class="metadata-row">
                  <span class="metadata-label">Lens</span>
                  <span class="metadata-value">{{ selectedItem.lens }}</span>
                </div>
                <div v-if="selectedItem.settings" class="metadata-row">
                  <span class="metadata-label">Settings</span>
                  <span class="metadata-value">{{
                    selectedItem.settings
                  }}</span>
                </div>
                <div v-if="selectedItem.location" class="metadata-row">
                  <span class="metadata-label">Location</span>
                  <span class="metadata-value">{{
                    selectedItem.location
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Link to blog post -->
            <div
              v-if="
                selectedItem.type === 'post-linked' && selectedItem.postSlug
              "
              class="modal-actions"
            >
              <button
                @click="goToPost(selectedItem.postSlug)"
                class="read-post-btn"
              >
                Read full post
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import { getGalleryItems } from "./gallery";

const router = useRouter();
const galleryItems = ref([]);
const selectedItem = ref(null);
const activeFilter = ref("all");

// Background images rotation
const evaImages = [
  "/eva-image-bg-2.jpeg",
  "/eva-image-bg-3.jpeg",
  "/eva-image-bg.jpg",
];
let currentImageIndex = 0;

const filteredItems = computed(() => {
  if (activeFilter.value === "all") {
    return galleryItems.value;
  }
  return galleryItems.value.filter((item) => item.type === activeFilter.value);
});

onMounted(() => {
  startImageRotation();
  galleryItems.value = getGalleryItems();
});

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

function openModal(item) {
  selectedItem.value = item;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  selectedItem.value = null;
  document.body.style.overflow = "auto";
}

function goToPost(slug) {
  router.push(`/blog/${slug}`);
}

function hasImageMetadata(item) {
  return item.camera || item.lens || item.settings || item.location;
}
</script>

<style scoped>
.gallery-section {
  margin-top: 10rem;
}

.gallery-filters {
  display: flex;
  gap: 1rem;
}

.filter-btn {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.8rem;
  background: var(--glass);
  border: 1px solid var(--border);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover,
.filter-btn.active {
  border-color: var(--accent);
  color: var(--accent);
}

/* Masonry Gallery Grid */
.gallery-grid {
  columns: 3;
  column-gap: 2rem;
  margin-top: 3rem;
  padding: 2rem 0;
}

.gallery-item {
  display: inline-block;
  width: 100%;
  margin-bottom: 2rem;
  cursor: pointer;
  will-change: transform;
  transition: transform 0.2s ease;
}

.gallery-item:hover {
  transform: translateY(-2px);
}

.gallery-frame {
  position: relative;
  background: var(--bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.gallery-item:hover .gallery-frame {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
}

.gallery-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.2s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.gallery-label {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1rem 1rem;
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease;
  gap: 1rem;
}

.gallery-item:hover .gallery-label {
  opacity: 1;
}

.item-title {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: white;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-date {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Enhanced Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.modal-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

.modal-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  max-height: 90vh;
}

.modal-image-section {
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.modal-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.modal-info-section {
  background: var(--bg);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.modal-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid var(--border);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--fg);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.modal-date {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9rem;
  color: var(--muted);
}

.modal-body {
  padding: 2rem;
  flex: 1;
}

.modal-description {
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.modal-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.modal-tag {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.8rem;
  background: var(--glass);
  border: 1px solid var(--border);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  color: var(--muted);
}

.modal-metadata {
  margin-bottom: 2rem;
}

.metadata-title {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9rem;
  color: var(--accent);
  margin-bottom: 1rem;
  font-weight: 500;
}

.metadata-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.metadata-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 4px;
}

.metadata-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.8rem;
  color: var(--muted);
  font-weight: 500;
}

.metadata-value {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.8rem;
  color: var(--fg);
  text-align: right;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: auto;
  padding-top: 2rem;
}

.read-post-btn {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9rem;
  background: var(--accent);
  color: var(--bg);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
}

.read-post-btn:hover {
  background: var(--accent-dim);
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 1024px) {
  .gallery-grid {
    columns: 2;
  }

  .modal-content {
    grid-template-columns: 1fr;
    max-height: none;
  }

  .modal-info-section {
    max-height: 40vh;
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    columns: 1;
    column-gap: 0;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-container {
    max-width: 95vw;
    max-height: 95vh;
  }

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.2rem;
  }

  .modal-image-section {
    min-height: 300px;
  }
}
</style>
