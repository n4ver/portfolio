import { ref } from 'vue'

// Shared, reactive view of the OS "reduce motion" setting.
const query = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null

const prefersReducedMotion = ref(query ? query.matches : false)

if (query) {
  query.addEventListener('change', (e) => {
    prefersReducedMotion.value = e.matches
  })
}

export function usePrefersReducedMotion() {
  return prefersReducedMotion
}
