<script setup>
defineProps({
  /** Used as the heading id; sections point at it with aria-labelledby */
  id: { type: String, required: true }
})
</script>

<template>
  <h2 :id="id" class="text-2xl font-bold mb-6 flex items-center text-theme-accent">
    <span class="mr-2" aria-hidden="true">/></span> <slot />
  </h2>
</template>
