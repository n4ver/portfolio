<script setup>
defineProps({
  /** { title, outcome, tags[], repo, demo?, image? } from src/data/projects.js */
  project: { type: Object, required: true }
})
</script>

<template>
  <article
    class="bg-gray-800/30 border border-gray-700 p-6 transition-colors group flex flex-col hover:border-theme-accent"
  >
    <img
      v-if="project.image"
      :src="project.image"
      :alt="`Screenshot of ${project.title}`"
      width="1200"
      height="750"
      loading="lazy"
      class="mb-4 border border-gray-700"
    />
    <h3 class="text-lg font-bold text-white mb-1 group-hover:text-theme-accent">{{ project.title }}</h3>
    <p class="text-xs mb-4 font-bold tracking-wider uppercase text-theme-secondary">{{ project.tags.join(', ') }}</p>
    <p class="text-sm mb-6 flex-1">{{ project.outcome }}</p>
    <div class="flex flex-wrap gap-x-6 gap-y-2">
      <a
        :href="project.repo"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center text-sm font-bold hover:text-white transition-colors"
      >
        Access Source<span class="sr-only"> for {{ project.title }} on GitHub (opens in new tab)</span>
        <span class="ml-2 motion-safe:group-hover:translate-x-1 motion-safe:transition-transform" aria-hidden="true"
          >-></span
        >
      </a>
      <a
        v-if="project.demo"
        :href="project.demo"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center text-sm font-bold hover:text-white transition-colors"
      >
        Live Demo<span class="sr-only"> of {{ project.title }} (opens in new tab)</span>
        <span class="ml-2" aria-hidden="true">-></span>
      </a>
    </div>
  </article>
</template>
