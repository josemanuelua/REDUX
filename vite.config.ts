import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/conig/
export default defineConfig(({ mode }) => {
  // Cargamos variables de entorno según el mode
  // (staging, production, etc.)
  // process requiere npm install -D @types/node
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_APP_BASE_URL || '/',
    build: {
      outDir: 'docs',
      },
    plugins: [react()],
  }
})

