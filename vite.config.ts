import { defineConfig, loadEnv, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: mode === 'production' ? (env.BASE_URL || './') : './',
    plugins: [react()],
    resolve: { 
      alias: { 
        "@": path.resolve(__dirname, "./src") 
      } 
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode !== 'production',
      minify: mode === 'production' ? 'esbuild' : false,
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});