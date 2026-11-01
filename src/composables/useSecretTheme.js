import { ref, watch } from 'vue'

// Easter egg: an incremental "byte miner". Every press mines a byte; at 5 the
// site switches to the corrupted theme and stays there while mining continues.
const CORRUPTION_THRESHOLD = 5

const bytesMined = ref(0)
const isCorrupted = ref(false)

const mineBytes = () => {
  bytesMined.value++
  if (bytesMined.value >= CORRUPTION_THRESHOLD) {
    isCorrupted.value = true
  }
}

// Theme tokens in style.css switch on html[data-theme="corrupted"]
if (typeof document !== 'undefined') {
  watch(isCorrupted, (corrupted) => {
    if (corrupted) document.documentElement.dataset.theme = 'corrupted'
    else delete document.documentElement.dataset.theme
  })
}

export function useSecretTheme() {
  return { bytesMined, isCorrupted, mineBytes }
}
