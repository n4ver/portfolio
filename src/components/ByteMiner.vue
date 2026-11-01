<script setup>
import { useSecretTheme } from '../composables/useSecretTheme.js'

const { mineBytes } = useSecretTheme()
</script>

<template>
  <button type="button" @click="mineBytes" aria-label="Mine an encrypted byte"
          class="text-4xl md:text-5xl font-bold leading-none px-1 cursor-pointer select-none motion-safe:animate-pulse text-theme-accent">
    <span aria-hidden="true">_</span>
  </button>
</template>
