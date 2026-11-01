<script setup>
defineProps({
  /** { institute, course, dates, gpa?, coursework?[], notes[] } from src/data/education.js */
  edu: { type: Object, required: true }
})
</script>

<template>
  <li class="relative group">
    <div
      aria-hidden="true"
      class="absolute w-2.5 h-2.5 rounded-full -left-[30px] top-1.5 transition-colors duration-300 bg-theme-dot group-hover:bg-theme-accent"
    ></div>

    <div class="flex flex-col md:flex-row md:justify-between items-start gap-2 md:gap-4">
      <div class="mb-2 md:mb-0 flex-1">
        <h3 class="text-lg font-bold text-white tracking-wide">{{ edu.institute }}</h3>
        <p v-if="edu.gpa" class="text-sm mt-1">
          <span class="text-theme-secondary">GPA:</span> <span class="font-bold text-white">{{ edu.gpa }}</span>
        </p>
        <p v-if="edu.coursework?.length" class="text-xs mt-2 leading-relaxed text-gray-400">
          <span class="text-theme-secondary">Coursework:</span> {{ edu.coursework.join(', ') }}
        </p>
        <p
          v-for="note in edu.notes"
          :key="note"
          class="text-xs mt-2 flex items-start leading-relaxed text-theme-secondary/80"
        >
          <span class="mr-2 opacity-50 font-mono" aria-hidden="true">↳</span>
          {{ note }}
        </p>
      </div>

      <div class="flex flex-col md:items-end md:text-right flex-1">
        <span class="text-gray-300 font-medium">{{ edu.course }}</span>
        <span class="text-xs font-mono tracking-wider mt-1 whitespace-nowrap text-theme-accent">
          [{{ edu.dates }}]
        </span>
      </div>
    </div>
  </li>
</template>
