import { ViteSSG } from 'vite-ssg/single-page'
import './style.css'
import App from './App.vue'

// Prerendered to dist/index.html at build time, hydrated in the browser
export const createApp = ViteSSG(App)
