import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode}) => ({
  plugins: [react()],
  base: "/",
  define: {
    __ALLOW_TAG_GRAPH_MMD_GENERATION__: JSON.stringify(mode === "development"),
  },
}))
