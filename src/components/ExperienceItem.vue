<script setup>
import TagList from './TagList.vue'

defineProps({
  /** { role, company, location, dates, bullets[], tags[] } from src/data/experience.js */
  job: { type: Object, required: true }
})
</script>

<template>
  <li class="relative group p-4 sm:pl-6 border border-gray-700 bg-gray-800/30">
    <div
      aria-hidden="true"
      class="absolute w-2.5 h-2.5 rounded-full -left-[23px] sm:-left-[31px] top-5 transition-colors duration-300 bg-theme-dot group-hover:bg-theme-accent"
    ></div>
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-x-4 gap-y-1">
      <h3 class="text-xl font-bold text-white">{{ job.role }}</h3>
      <span class="text-xs font-mono tracking-wider whitespace-nowrap text-theme-accent">[{{ job.dates }}]</span>
    </div>
    <p class="mt-1 mb-3">
      <span class="text-theme-secondary">{{ job.company }}</span>
      <span v-if="job.location" class="block sm:inline text-sm text-gray-400"
        ><span class="hidden sm:inline" aria-hidden="true"> · </span>{{ job.location }}</span
      >
    </p>
    <ul class="text-sm list-disc pl-5 space-y-1 mb-3">
      <li v-for="bullet in job.bullets" :key="bullet">{{ bullet }}</li>
    </ul>
    <TagList v-if="job.tags.length" :tags="job.tags" />
  </li>
</template>
