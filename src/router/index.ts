// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },

  //   Blog
  {
    path: "/blog/",
    name: "Blog",
    component: () => import("../views/Blog.vue"),
    meta: {
      title: "Blog",
    },
  },

  {
    path: "/gallery",
    name: "Gallery",
    component: () => import("../components/Gallery.vue"),
    meta: {
      title: "Gallery",
    },
  },
  {
    path: "/blog/:slug",
    name: "BlogPost",
    component: () => import("../views/BlogPost.vue"),
  },

  //   404
  {
    path: "/:catchAll(.*)*", // This regex pattern matches any path
    name: "NotFound",
    component: () => import("../views/404.vue"),
    meta: {
      title: "Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Global navigation guard to update title
router.beforeEach((to, _from, next) => {
  const title =
    typeof to.meta.title === "string" ? to.meta.title : "moisxn@nerv:~$ whoami";
  document.title = title;
  next();
});

export default router;
