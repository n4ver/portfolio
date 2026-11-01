<script setup>
import TerminalPrompt from './TerminalPrompt.vue'

defineProps({
  profile: { type: Object, required: true },
  projects: { type: Array, required: true },
  skills: { type: Array, required: true },
  terminal: { type: Object, required: true }
})
</script>

<template>
  <footer class="mt-24 pt-8 border-t border-gray-700 font-mono text-sm">
    <TerminalPrompt :profile="profile" :projects="projects" :skills="skills" :terminal="terminal" />

    <div class="mt-4 flex justify-between text-gray-400">
      <p>SYSTEM.VERSION: 1.0.0</p>
      <div class="space-x-4">
        <a :href="profile.links.github" target="_blank" rel="noopener" class="hover:text-white transition-colors">GitHub<span class="sr-only"> (opens in new tab)</span></a>
      </div>
    </div>
    <p class="mt-2 text-xs text-gray-400">
      Background adapted from
      <a href="https://vue-bits.dev" target="_blank" rel="noopener" class="underline hover:text-white transition-colors">Vue Bits<span class="sr-only"> (opens in new tab)</span></a>
    </p>
  </footer>
</template>
