<script setup>
import { computed, defineAsyncComponent, ref, onMounted } from 'vue'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion.js'
import { useSecretTheme } from '../composables/useSecretTheme.js'

// WebGL background: split into its own chunk and mounted after first paint
const ThreadsBackground = defineAsyncComponent(() => import('./ThreadsBackground.vue'))

// Stable per-theme settings, so the shader's watcher only fires on a theme change
const NORMAL = Object.freeze({ color: Object.freeze([1, 1, 1]), amplitude: 5, distance: 0 })
const CORRUPTED = Object.freeze({ color: Object.freeze([1, 0.35, 0.35]), amplitude: 14, distance: 0.45 })

const { isCorrupted } = useSecretTheme()
const reducedMotion = usePrefersReducedMotion()
const threadsReady = ref(false)
const lowPowerTouch = ref(false)
const webglFailed = ref(false)
const showFallback = computed(() => reducedMotion.value || lowPowerTouch.value || webglFailed.value)
const showThreads = computed(() => threadsReady.value && !showFallback.value)
const settings = computed(() => (isCorrupted.value ? CORRUPTED : NORMAL))

onMounted(() => {
  lowPowerTouch.value = window.matchMedia('(pointer: coarse)').matches && (navigator.hardwareConcurrency ?? 8) <= 4
  const whenIdle = window.requestIdleCallback ?? ((cb) => window.setTimeout(cb, 200))
  whenIdle(() => { threadsReady.value = true })
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
    <div v-if="showFallback" class="threads-fallback absolute inset-0"></div>
    <ThreadsBackground v-if="showThreads" class="absolute inset-0 h-full w-full opacity-50"
      @unsupported="webglFailed = true"
      :color="settings.color"
      :amplitude="settings.amplitude"
      :distance="settings.distance"
      :enableMouseInteraction="isCorrupted"
    />
  </div>
</template>

<style scoped>
/* Static stand-in when the WebGL background is skipped */
.threads-fallback {
  background: radial-gradient(ellipse 70% 50% at 75% 35%, rgb(var(--glow)), transparent 70%);
}
</style>
