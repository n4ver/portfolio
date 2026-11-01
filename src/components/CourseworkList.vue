<script setup>
defineProps({
  /** Coursework entries from src/data/projects.js */
  items: { type: Array, required: true }
})
</script>

<template>
  <ul class="space-y-3">
    <li v-for="item in items" :key="item.title" class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 border-b border-gray-700/50 pb-2">
      <span>
        <a :href="item.repo" target="_blank" rel="noopener" class="font-bold text-white hover:underline">{{ item.title }}<span class="sr-only"> on GitHub (opens in new tab)</span></a>
        <span class="text-sm text-gray-400"> — {{ item.outcome }}</span>
      </span>
      <span class="text-xs whitespace-nowrap text-theme-secondary">{{ item.tags.join(', ') }}</span>
    </li>
  </ul>
</template>
