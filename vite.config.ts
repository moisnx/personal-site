import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-md";
import code from "@yankeeinlondon/code-builder";
import link from "@yankeeinlondon/link-builder";
import meta from "@yankeeinlondon/meta-builder";
import githubAlerts from "markdown-it-github-alerts";
import vercel from "vite-plugin-vercel";
import Pages from "vite-plugin-pages";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vercel({
      rewrites: [
        {
          source: "/(.*)",
          destination: "/index.html",
        },
      ],
    }),
    Pages(),
    vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    Markdown({
      // Optional: Configure markdown-it options
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        md.use(githubAlerts);
      },
      builders: [code(), link(), meta()],
    }),
  ],
});
