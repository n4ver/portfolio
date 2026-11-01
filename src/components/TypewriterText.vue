<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion.js'

const props = defineProps({
  text: { type: String, required: true },
  /** Milliseconds per character */
  speed: { type: Number, default: 40 }
})

const reducedMotion = usePrefersReducedMotion()
// Full text in the prerendered HTML (readable without JS); typing starts after mount
const typedText = ref(props.text)
let timer = null

const stop = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  if (reducedMotion.value) return
  typedText.value = ''
  timer = window.setInterval(() => {
    const nextIndex = typedText.value.length
    if (reducedMotion.value) {
      // Preference turned on mid-typing: show the full line and stop
      typedText.value = props.text
      stop()
    } else if (nextIndex < props.text.length) {
      typedText.value += props.text.charAt(nextIndex)
    } else {
      stop()
    }
  }, props.speed)
})

onUnmounted(stop)
</script>

<template>
  <span
    >{{ typedText
    }}<span v-if="typedText.length < text.length" class="motion-safe:animate-pulse" aria-hidden="true">|</span></span
  >
</template>
