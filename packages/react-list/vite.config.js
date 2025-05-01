import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      output: {
        globals: {
          react: "react",
          "react/jsx-runtime": "jsxRuntime",
        },
        exports: "named",
      },
    },
    lib: {
      entry: [`src/index.js`],
      name: "ReactList",
      fileName: "react-list",
    },
  },
});
