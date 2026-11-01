<script setup>
import SectionHeading from './SectionHeading.vue'

defineProps({
  /** { quote: { text, speaker, source }, text } from src/data/profile.js */
  summary: { type: Object, required: true }
})
</script>

<template>
  <section aria-labelledby="summary-heading">
    <SectionHeading id="summary-heading">Summary</SectionHeading>
    <figure class="mb-6 border-l-2 border-theme-secondary/60 pl-4">
      <blockquote class="italic text-gray-300">“{{ summary.quote.text }}”</blockquote>
      <figcaption class="mt-2 text-xs tracking-wider text-theme-secondary">
        — {{ summary.quote.speaker }}, <cite class="not-italic">{{ summary.quote.source }}</cite>
      </figcaption>
    </figure>
    <p class="leading-relaxed">{{ summary.text }}</p>
  </section>
</template>
