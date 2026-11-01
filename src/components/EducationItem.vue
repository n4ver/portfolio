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
      class="absolute w-2.5 h-2.5 rounded-full -left-[22px] sm:-left-[30px] top-2 transition-colors duration-300 bg-theme-dot group-hover:bg-theme-accent"
    ></div>

    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-x-4 gap-y-1">
      <h3 class="text-lg font-bold text-white tracking-wide">{{ edu.institute }}</h3>
      <span class="text-xs font-mono tracking-wider whitespace-nowrap text-theme-accent">[{{ edu.dates }}]</span>
    </div>

    <p class="mt-1 flex flex-wrap gap-x-2 text-gray-300">
      <span>{{ edu.course }}</span>
      <template v-if="edu.gpa">
        <span class="hidden sm:inline text-gray-500" aria-hidden="true">·</span>
        <span
          ><span class="text-theme-secondary">GPA</span> <span class="font-bold text-white">{{ edu.gpa }}</span></span
        >
      </template>
    </p>

    <dl
      v-if="edu.coursework?.length || edu.notes.length"
      class="mt-4 grid gap-y-3 text-sm leading-relaxed sm:grid-cols-[7rem_1fr] sm:gap-x-4"
    >
      <template v-if="edu.coursework?.length">
        <dt class="text-xs uppercase tracking-wider text-theme-secondary sm:pt-0.5">Coursework</dt>
        <dd class="text-gray-400">{{ edu.coursework.join(' · ') }}</dd>
      </template>
      <template v-if="edu.notes.length">
        <dt class="text-xs uppercase tracking-wider text-theme-secondary sm:pt-0.5">Activities</dt>
        <dd>
          <ul class="space-y-1.5 text-gray-400">
            <li v-for="note in edu.notes" :key="note" class="flex gap-2">
              <span class="opacity-50" aria-hidden="true">↳</span>
              <span>{{ note }}</span>
            </li>
          </ul>
        </dd>
      </template>
    </dl>
  </li>
</template>
