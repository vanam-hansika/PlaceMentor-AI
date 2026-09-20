import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'PlaceMentor AI',
        short_name: 'PlaceMentor',
        description: 'AI-Powered Placement Preparation PWA with Gemini AI & Neko Companion',
        theme_color: '#4F46E5',
        background_color: '#F8FAFC',
        display: 'standalone'
      }
    })
  ],
})
