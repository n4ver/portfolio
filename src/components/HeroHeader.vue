<script setup>
import ByteMiner from './ByteMiner.vue'
import ContactLinks from './ContactLinks.vue'
import { useSecretTheme } from '../composables/useSecretTheme.js'

defineProps({
  /** profile from src/data/profile.js */
  profile: { type: Object, required: true },
  /** First entry of src/data/experience.js */
  latestJob: { type: Object, required: true }
})

const { bytesMined, isCorrupted } = useSecretTheme()
</script>

<template>
  <header>
    <div class="flex items-baseline gap-3 mb-2">
      <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight">{{ profile.name }}</h1>
      <ByteMiner />
    </div>
    <p class="text-lg md:text-xl text-gray-300 mb-2">{{ profile.role }}</p>
    <p class="text-sm mb-2">
      <span class="text-theme-secondary">Latest:</span>
      {{ latestJob.role }} @ {{ latestJob.company }} ({{ latestJob.dates }})
    </p>
    <ul class="flex flex-wrap gap-x-2 text-sm text-gray-400 mb-6">
      <li v-for="(item, i) in profile.availability" :key="item">
        <span v-if="i > 0" aria-hidden="true" class="mr-2">·</span>{{ item }}
      </li>
    </ul>

    <ContactLinks :profile="profile" />

    <div role="status">
      <p v-if="isCorrupted" class="text-red-400 font-bold fade-in mt-6">
        [CONCEPTUALIZATION: Success] — The system is yours. You have extracted {{ bytesMined }} encrypted bytes.
      </p>
    </div>
  </header>
</template>

<style scoped>
/* Simple fade-in animation for the secret text */
@media (prefers-reduced-motion: no-preference) {
  .fade-in {
    animation: fadeIn 1s ease-in-out;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
