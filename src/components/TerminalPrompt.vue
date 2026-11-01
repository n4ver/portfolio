<script setup>
import { ref } from 'vue'
import TypewriterText from './TypewriterText.vue'

const props = defineProps({
  /** profile from src/data/profile.js */
  profile: { type: Object, required: true },
  projects: { type: Array, required: true },
  skills: { type: Array, required: true },
  /** { bootLine: { tag, text }, welcome } from src/data/profile.js */
  terminal: { type: Object, required: true }
})

const MAX_LINES = 6

let nextLineId = 0
const line = (text) => ({ id: nextLineId++, text })

const terminalInput = ref('')
const terminalOutput = ref([line(props.terminal.welcome)])

const commands = {
  help: () => ['Available commands: help, whoami, contact, resume, projects, skills, clear, sudo rm -rf /'],
  whoami: () => [`${props.profile.name}. ${props.profile.role}.`],
  contact: () => [
    `email:    ${props.profile.email}`,
    `linkedin: ${props.profile.links.linkedin}`,
    `github:   ${props.profile.links.github}`
  ],
  resume: () => {
    window.open(props.profile.links.resume, '_blank', 'noopener')
    return [`Opening ${props.profile.links.resume} in a new tab...`]
  },
  projects: () => props.projects.map((p) => `${p.title}: ${p.repo}`),
  skills: () => props.skills.map((s) => `${s.group}: ${s.items.join(', ')}`),
  'sudo rm -rf /': () => ['ERR: Permission denied. Nice try. Incident logged.']
}

const executeCommand = () => {
  const raw = terminalInput.value.trim()
  if (!raw) return
  const cmd = raw.toLowerCase()
  terminalInput.value = ''

  if (cmd === 'clear') {
    terminalOutput.value = []
    return
  }

  const output = Object.hasOwn(commands, cmd) ? commands[cmd]() : [`Command not found: ${raw}`]
  // Keep only the last MAX_LINES lines to prevent UI overflow
  terminalOutput.value = [...terminalOutput.value, line(`> ${raw}`), ...output.map(line)].slice(-MAX_LINES)
}
</script>

<template>
  <div class="bg-black/50 p-4 rounded-md border border-gray-800">
    <p class="mb-2 text-theme-muted">
      <span class="font-bold text-theme-emphasis">{{ terminal.bootLine.tag }}</span>
      — <TypewriterText :text="terminal.bootLine.text" />
    </p>
    <div
      role="log"
      aria-live="polite"
      aria-label="Terminal output"
      class="mb-2 space-y-1 h-32 overflow-y-auto flex flex-col justify-end"
    >
      <p v-for="entry in terminalOutput" :key="entry.id" class="break-words text-theme-log">
        {{ entry.text }}
      </p>
    </div>
    <form class="flex items-center" @submit.prevent="executeCommand">
      <label for="terminal-input" class="sr-only">Terminal command (type help for a list)</label>
      <span class="mr-2 text-theme-accent" aria-hidden="true">guest@n4ver:~$</span>
      <input
        id="terminal-input"
        v-model="terminalInput"
        type="text"
        class="bg-transparent border-none flex-1 min-w-0 text-white placeholder:text-gray-400"
        placeholder="enter command..."
        autocomplete="off"
        spellcheck="false"
      />
    </form>
  </div>
</template>
