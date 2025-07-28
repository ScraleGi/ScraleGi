import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ScraleGi/projects/music_events_app/',
  plugins: [react()],
})