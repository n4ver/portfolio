<script setup>
import TagList from './TagList.vue'

defineProps({
  /** { group, items[] } from src/data/skills.js */
  group: { type: Object, required: true }
})
</script>

<template>
  <div>
    <dt class="text-sm font-bold text-white mb-2">{{ group.group }}</dt>
    <dd>
      <TagList :tags="group.items" />
    </dd>
  </div>
</template>
