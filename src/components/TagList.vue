<script setup>
defineProps({
  tags: { type: Array, required: true }
})
</script>

<template>
  <ul class="flex flex-wrap gap-2">
    <li v-for="tag in tags" :key="tag" class="text-xs px-2 py-0.5 border border-theme-tag-border/40 text-theme-tag">{{ tag }}</li>
  </ul>
</template>
