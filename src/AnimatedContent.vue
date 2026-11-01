<script setup lang="ts">
import { onMounted, onUnmounted, watch, useTemplateRef } from 'vue';
import { usePrefersReducedMotion } from './composables/usePrefersReducedMotion.js';

// Fade-up reveal on first scroll into view. Content is visible by default and is
// only hidden once the observer is confirmed active, so a failed script never
// leaves a blank page. Styles live in style.css (.reveal-pending / .reveal-in).

interface AnimatedContentProps {
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
}

const props = withDefaults(defineProps<AnimatedContentProps>(), {
  distance: 100,
  duration: 0.8,
  delay: 0,
  threshold: 0.1
});

const containerRef = useTemplateRef<HTMLDivElement>('containerRef');
const reducedMotion = usePrefersReducedMotion();
let observer: IntersectionObserver | null = null;

const reveal = () => {
  observer?.disconnect();
  observer = null;
  containerRef.value?.classList.replace('reveal-pending', 'reveal-in');
};

onMounted(() => {
  const el = containerRef.value;
  if (!el || reducedMotion.value || !('IntersectionObserver' in window)) return;

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) reveal();
    },
    { threshold: props.threshold }
  );
  observer.observe(el);
  el.classList.add('reveal-pending');
});

watch(reducedMotion, (reduce) => {
  if (reduce) reveal();
});

onUnmounted(() => {
  observer?.disconnect();
  observer = null;
});
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
