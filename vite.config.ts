import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin(), TanStackRouterVite()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src/"),
    },
  },
});
