<script setup>
/*
 * Fade-up reveal on first scroll into view.
 * Originally adapted from Vue Bits' AnimatedContent (https://github.com/DavidHDev/vue-bits),
 * Copyright (c) 2025 David Haz, MIT + Commons Clause, see ./LICENSE-vue-bits.md.
 * Rewritten without GSAP: content is visible by default and is only hidden once the
 * observer is confirmed active, so a failed script never leaves a blank page.
 * Styles live in style.css (.reveal-pending / .reveal-in).
 */
import { onMounted, onUnmounted, watch, useTemplateRef } from 'vue'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion.js'

const props = defineProps({
  /** Start offset in px */
  distance: { type: Number, default: 100 },
  /** Seconds */
  duration: { type: Number, default: 0.8 },
  /** Seconds */
  delay: { type: Number, default: 0 },
  /** Fraction of the element that must be visible */
  threshold: { type: Number, default: 0.1 }
})

const containerRef = useTemplateRef('containerRef')
const reducedMotion = usePrefersReducedMotion()
let observer = null

const reveal = () => {
  observer?.disconnect()
  observer = null
  containerRef.value?.classList.replace('reveal-pending', 'reveal-in')
}

onMounted(() => {
  const el = containerRef.value
  if (!el || reducedMotion.value || !('IntersectionObserver' in window)) return
  // Already on screen (prerendered and visible): don't hide it again after hydration
  if (el.getBoundingClientRect().top < window.innerHeight) return

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) reveal()
    },
    { threshold: props.threshold }
  )
  observer.observe(el)
  el.classList.add('reveal-pending')
})

watch(reducedMotion, (reduce) => {
  if (reduce) reveal()
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <div
    ref="containerRef"
    :style="{
      '--reveal-distance': `${props.distance}px`,
      '--reveal-duration': `${props.duration}s`,
      '--reveal-delay': `${props.delay}s`
    }"
  >
    <slot />
  </div>
</template>
