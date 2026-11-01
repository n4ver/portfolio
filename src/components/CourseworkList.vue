<script setup>
import TagList from './TagList.vue'

defineProps({
  /** Coursework entries from src/data/projects.js */
  items: { type: Array, required: true }
})
</script>

<template>
  <ul class="space-y-4">
    <li v-for="item in items" :key="item.title" class="border-b border-gray-700/50 pb-3">
      <p class="mb-2">
        <a
          :href="item.repo"
          target="_blank"
          rel="noopener"
          class="font-bold text-white underline underline-offset-4 hover:text-theme-accent"
          >{{ item.title }}<span class="sr-only"> on GitHub (opens in new tab)</span></a
        >
        <span class="text-sm text-gray-400"> — {{ item.outcome }}</span>
      </p>
      <TagList :tags="item.tags" />
    </li>
  </ul>
</template>
