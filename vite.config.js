import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Required for Telegram Login popup to communicate with the page
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
  },
})
