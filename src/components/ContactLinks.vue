<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** profile from src/data/profile.js */
  profile: { type: Object, required: true }
})

const links = computed(() => [
  { label: props.profile.email, href: `mailto:${props.profile.email}` },
  { label: 'LinkedIn', href: props.profile.links.linkedin, external: true },
  { label: 'GitHub', href: props.profile.links.github, external: true },
  { label: 'Resume (PDF)', href: props.profile.links.resume, external: true }
])
</script>

<template>
  <nav aria-label="Contact">
    <ul class="flex flex-wrap gap-3">
      <li v-for="link in links" :key="link.href">
        <a :href="link.href"
           :target="link.external ? '_blank' : undefined"
           :rel="link.external ? 'noopener' : undefined"
           class="inline-flex items-center px-4 py-2 text-sm font-bold border transition-colors border-theme-accent/60 text-theme-link hover:bg-theme-accent hover:text-theme-on-accent">
          {{ link.label }}<span v-if="link.external" class="sr-only"> (opens in new tab)</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
