<script setup>
import TagList from './TagList.vue'

defineProps({
  /** { role, company, dates, bullets[], tags[] } from src/data/experience.js */
  job: { type: Object, required: true }
})
</script>

<template>
  <article class="relative pl-6 pr-4 py-4 border-l border-gray-700 bg-gray-800/30">
    <div class="absolute w-3 h-3 bg-gray-600 rounded-full -left-[6.5px] top-5" aria-hidden="true"></div>
    <h3 class="text-xl font-bold text-white">{{ job.role }}</h3>
    <p class="mb-2 text-theme-secondary">{{ job.company }} | {{ job.dates }}</p>
    <ul class="text-sm list-disc pl-5 space-y-1 mb-3">
      <li v-for="bullet in job.bullets" :key="bullet">{{ bullet }}</li>
    </ul>
    <TagList v-if="job.tags.length" :tags="job.tags" />
  </article>
</template>
