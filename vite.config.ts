import { defineConfig } from "vite";
import { patchCssModules } from "vite-css-modules";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tsconfigPaths(),
    patchCssModules(),
    svgr({
      include: "**/*.svg",
      svgrOptions: {
        exportType: "named",
      },
    }),
  ],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  build: {
    sourcemap: false,
    minify: "terser",
  },
  server: {
    port: 3000,
    // hmr: { overlay: false }, //TODO
  },
});
