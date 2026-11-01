<script setup>
import TagList from './TagList.vue'

defineProps({
  /** { role, company, dates, bullets[], tags[] } from src/data/experience.js */
  job: { type: Object, required: true }
})
</script>

<template>
  <li class="relative group pl-6 pr-4 py-4 border border-gray-700 bg-gray-800/30">
    <div aria-hidden="true" class="bg-gray-600 absolute w-2.5 h-2.5 rounded-full -left-[30px] top-1.5 transition-colors duration-300 bg-theme-dot group-hover:bg-theme-accent"></div>
    <div class="flex flex-col md:flex-row md:justify-between items-start gap-2 md:gap-4">
      <div class="mb-2 md:mb-0 flex-1">
        <h3 class="text-xl font-bold text-white">{{ job.role }}</h3>
        <p class="mb-2 text-theme-secondary">{{ job.company }} | {{ job.dates }}</p>
        <ul class="text-sm list-disc pl-5 space-y-1 mb-3">
        <li v-for="bullet in job.bullets" :key="bullet">{{ bullet }}</li>
        </ul>
        <TagList v-if="job.tags.length" :tags="job.tags" />
      </div>
    </div>
  </li>
</template>
