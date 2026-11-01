import { ref, onMounted, getCurrentInstance } from 'vue'

// Shared, reactive view of the OS "reduce motion" setting.
// Starts false so the prerendered HTML and the first client render match;
// the real value is read once the calling component has mounted.
const prefersReducedMotion = ref(false)
let query = null

const sync = () => {
  if (!query) {
    query = window.matchMedia('(prefers-reduced-motion: reduce)')
    query.addEventListener('change', (e) => {
      prefersReducedMotion.value = e.matches
    })
  }
  prefersReducedMotion.value = query.matches
}

export function usePrefersReducedMotion() {
  // Registered before the caller's own onMounted hooks, so they see the real value
  if (getCurrentInstance()) onMounted(sync)
  return prefersReducedMotion
}
