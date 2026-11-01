<script setup>
import AnimatedContent from "./AnimatedContent.vue";
import { computed, defineAsyncComponent, ref, watch, onMounted, onUnmounted } from 'vue';
import { profile, terminal } from './data/profile.js';
import { experience } from './data/experience.js';
import { projects, coursework } from './data/projects.js';
import { education } from './data/education.js';
import { skills } from './data/skills.js';
import { usePrefersReducedMotion } from './composables/usePrefersReducedMotion.js';

// WebGL background: split into its own chunk and mounted after first paint
const Threads = defineAsyncComponent(() => import('./Threads.vue'))

const reducedMotion = usePrefersReducedMotion()
const threadsReady = ref(false)
const lowPowerTouch = ref(false)
const webglFailed = ref(false)
const showFallback = computed(() => reducedMotion.value || lowPowerTouch.value || webglFailed.value)
const showThreads = computed(() => threadsReady.value && !showFallback.value)

onMounted(() => {
  lowPowerTouch.value = window.matchMedia('(pointer: coarse)').matches && (navigator.hardwareConcurrency ?? 8) <= 4
  const whenIdle = window.requestIdleCallback ?? ((cb) => window.setTimeout(cb, 200))
  whenIdle(() => { threadsReady.value = true })
})

const latestJob = experience[0]

const contactLinks = [
  { label: profile.email, href: `mailto:${profile.email}` },
  { label: 'LinkedIn', href: profile.links.linkedin, external: true },
  { label: 'GitHub', href: profile.links.github, external: true },
  { label: 'Resume (PDF)', href: profile.links.resume, external: true }
]

// --- EASTER EGG: IDLE MECHANIC ---
const bytesMined = ref(0)
const isCorrupted = ref(false)

const mineBytes = () => {
  bytesMined.value++
  if (bytesMined.value >= 5) {
    isCorrupted.value = true // Triggers a theme change and uncovers a secret log
  }
}

const threadAmplitude = computed(() => (isCorrupted.value ? 14 : 5))
const threadDistance = computed(() => (isCorrupted.value ? 0.45 : 0))
const threadMouseInteraction = computed(() => isCorrupted.value)

// Page background follows the theme (see style.css)
watch(isCorrupted, (corrupted) => {
  if (corrupted) document.documentElement.dataset.theme = 'corrupted'
  else delete document.documentElement.dataset.theme
})

const headingClass = computed(() => ['text-2xl font-bold mb-6 flex items-center', isCorrupted.value ? 'text-red-500' : 'text-terminal-green'])
const tagClass = computed(() => ['text-xs px-2 py-0.5 border', isCorrupted.value ? 'border-red-500/40 text-red-300' : 'border-terminal-accent/40 text-terminal-accent'])

// --- TYPEWRITER EFFECT (terminal boot line) ---
const fullText = terminal.bootLine.text
const typedText = ref('')

let typewriterTimer = null

onMounted(() => {
  if (reducedMotion.value) {
    typedText.value = fullText
    return
  }
  typewriterTimer = window.setInterval(() => {
    const nextIndex = typedText.value.length
    if (reducedMotion.value) {
      // Preference turned on mid-typing: show the full line and stop
      typedText.value = fullText
      clearInterval(typewriterTimer)
      typewriterTimer = null
    } else if (nextIndex < fullText.length) {
      typedText.value += fullText.charAt(nextIndex)
    } else if (typewriterTimer) {
      clearInterval(typewriterTimer)
      typewriterTimer = null
    }
  }, 40) // Typing speed in milliseconds
})

onUnmounted(() => {
  if (typewriterTimer) {
    clearInterval(typewriterTimer)
    typewriterTimer = null
  }
})

// --- INTERACTIVE COMMAND LINE ---
const terminalInput = ref('')
const terminalOutput = ref([terminal.welcome])

const executeCommand = () => {
  const cmd = terminalInput.value.trim().toLowerCase()
  if (!cmd) return

  terminalOutput.value.push(`> ${cmd}`)

  switch (cmd) {
    case 'help':
      terminalOutput.value.push('Available commands: help, whoami, contact, resume, projects, skills, clear, sudo rm -rf /')
      break
    case 'whoami':
      terminalOutput.value.push(`${profile.name}. ${profile.role}.`)
      break
    case 'contact':
      terminalOutput.value.push(
        `email:    ${profile.email}`,
        `linkedin: ${profile.links.linkedin}`,
        `github:   ${profile.links.github}`
      )
      break
    case 'resume':
      window.open(profile.links.resume, '_blank', 'noopener')
      terminalOutput.value.push(`Opening ${profile.links.resume} in a new tab...`)
      break
    case 'projects':
      terminalOutput.value.push(...projects.map(p => `${p.title}: ${p.repo}`))
      break
    case 'skills':
      terminalOutput.value.push(...skills.map(s => `${s.group}: ${s.items.join(', ')}`))
      break
    case 'clear':
      terminalOutput.value = []
      break
    case 'sudo rm -rf /':
      terminalOutput.value.push('ERR: Permission denied. Nice try. Incident logged.')
      break
    default:
      terminalOutput.value.push(`Command not found: ${cmd}`)
  }

  // Keep only the last 6 lines to prevent UI overflow
  if (terminalOutput.value.length > 6) {
    terminalOutput.value = terminalOutput.value.slice(-6)
  }
  terminalInput.value = ''
}
</script>

<template>
  <div :class="['relative min-h-screen w-full overflow-x-hidden transition-colors duration-1000', isCorrupted ? 'text-red-200' : 'text-gray-300']">
    <div class="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div v-if="showFallback" :class="['absolute inset-0', isCorrupted ? 'threads-fallback-corrupted' : 'threads-fallback']"></div>
      <Threads v-if="showThreads" class="absolute inset-0 h-full w-full opacity-50"
        @unsupported="webglFailed = true"
        :color="isCorrupted ? [1, 0.35, 0.35] : [1, 1, 1]"
        :amplitude="threadAmplitude"
        :distance="threadDistance"
        :enableMouseInteraction="threadMouseInteraction"
      />
    </div>
      <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-20 focus:px-4 focus:py-2 focus:bg-terminal-bg focus:text-white">Skip to content</a>
      <div class="p-6 md:p-16 max-w-4xl mx-auto">
      <AnimatedContent :delay="0.05" :distance="60" class="mb-16 border-b border-gray-700 pb-8">
      <header>
        <div class="flex items-baseline gap-3 mb-2">
          <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight">{{ profile.name }}</h1>
          <button type="button" @click="mineBytes" aria-label="Mine an encrypted byte"
                  :class="['text-4xl md:text-5xl font-bold leading-none px-1 cursor-pointer select-none motion-safe:animate-pulse', isCorrupted ? 'text-red-500' : 'text-terminal-green']">
            <span aria-hidden="true">_</span>
          </button>
        </div>
        <p class="text-lg md:text-xl text-gray-300 mb-2">{{ profile.role }}</p>
        <p class="text-sm mb-2">
          <span :class="isCorrupted ? 'text-red-400' : 'text-terminal-accent'">Latest:</span>
          {{ latestJob.role }} @ {{ latestJob.company }} ({{ latestJob.dates }})
        </p>
        <ul class="flex flex-wrap gap-x-2 text-sm text-gray-400 mb-6">
          <li v-for="(item, i) in profile.availability" :key="item">
            <span v-if="i > 0" aria-hidden="true" class="mr-2">·</span>{{ item }}
          </li>
        </ul>

        <nav aria-label="Contact">
          <ul class="flex flex-wrap gap-3">
            <li v-for="link in contactLinks" :key="link.href">
              <a :href="link.href"
                 :target="link.external ? '_blank' : undefined"
                 :rel="link.external ? 'noopener' : undefined"
                 :class="['inline-flex items-center px-4 py-2 text-sm font-bold border transition-colors', isCorrupted ? 'border-red-500/60 hover:bg-red-500 hover:text-black' : 'border-terminal-green/60 text-terminal-green hover:bg-terminal-green hover:text-terminal-bg']">
                {{ link.label }}<span v-if="link.external" class="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <div role="status">
          <p v-if="isCorrupted" class="text-red-400 font-bold fade-in mt-6">
            [CONCEPTUALIZATION: Success] — The system is yours. You have extracted {{ bytesMined }} encrypted bytes.
          </p>
        </div>
      </header>
      </AnimatedContent>

      <main id="main" tabindex="-1" class="space-y-16 focus:outline-none">
        <AnimatedContent :delay="0.1" :distance="60">
        <section aria-labelledby="skills-heading">
          <h2 id="skills-heading" :class="headingClass">
            <span class="mr-2" aria-hidden="true">/></span> Skills
          </h2>
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div v-for="group in skills" :key="group.group">
              <dt class="text-sm font-bold text-white mb-2">{{ group.group }}</dt>
              <dd class="flex flex-wrap gap-2">
                <span v-for="item in group.items" :key="item" :class="tagClass">{{ item }}</span>
              </dd>
            </div>
          </dl>
        </section>
        </AnimatedContent>

        <AnimatedContent :delay="0.1" :distance="60">
        <section aria-labelledby="experience-heading">
          <h2 id="experience-heading" :class="headingClass">
            <span class="mr-2" aria-hidden="true">/></span> Experience
          </h2>

          <div class="space-y-8">
            <article v-for="job in experience" :key="job.company" class="relative pl-6 pr-4 py-4 border-l border-gray-700 bg-gray-800/30">
              <div class="absolute w-3 h-3 bg-gray-600 rounded-full -left-[6.5px] top-5" aria-hidden="true"></div>
              <h3 class="text-xl font-bold text-white">{{ job.role }}</h3>
              <p :class="['mb-2', isCorrupted ? 'text-red-400' : 'text-terminal-accent']">{{ job.company }} | {{ job.dates }}</p>
              <ul class="text-sm list-disc pl-5 space-y-1 mb-3">
                <li v-for="bullet in job.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
              <ul v-if="job.tags.length" class="flex flex-wrap gap-2">
                <li v-for="tag in job.tags" :key="tag" :class="tagClass">{{ tag }}</li>
              </ul>
            </article>
          </div>
        </section>
        </AnimatedContent>

        <AnimatedContent :delay="0.15" :distance="60">
        <section aria-labelledby="projects-heading">
          <h2 id="projects-heading" :class="headingClass">
            <span class="mr-2" aria-hidden="true">/></span> Projects
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article v-for="project in projects" :key="project.title"
                :class="['bg-gray-800/30 border border-gray-700 p-6 transition-colors group flex flex-col', isCorrupted ? 'hover:border-red-500' : 'hover:border-terminal-green']">
              <img v-if="project.image" :src="project.image" :alt="`Screenshot of ${project.title}`" width="1200" height="750" loading="lazy" class="mb-4 border border-gray-700">
              <h3 :class="['text-lg font-bold text-white mb-1', isCorrupted ? 'group-hover:text-red-500' : 'group-hover:text-terminal-green']">{{ project.title }}</h3>
              <p :class="['text-xs mb-4 font-bold tracking-wider uppercase', isCorrupted ? 'text-red-400' : 'text-terminal-accent']">{{ project.tags.join(', ') }}</p>
              <p class="text-sm mb-6 flex-1">{{ project.outcome }}</p>
              <div class="flex flex-wrap gap-x-6 gap-y-2">
                <a :href="project.repo" target="_blank" rel="noopener" class="inline-flex items-center text-sm font-bold hover:text-white transition-colors">
                  Access Source<span class="sr-only"> for {{ project.title }} on GitHub (opens in new tab)</span> <span class="ml-2 motion-safe:group-hover:translate-x-1 motion-safe:transition-transform" aria-hidden="true">-></span>
                </a>
                <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" class="inline-flex items-center text-sm font-bold hover:text-white transition-colors">
                  Live Demo<span class="sr-only"> of {{ project.title }} (opens in new tab)</span> <span class="ml-2" aria-hidden="true">-></span>
                </a>
              </div>
            </article>
          </div>

          <h3 class="text-lg font-bold text-white mt-10 mb-4">Coursework</h3>
          <ul class="space-y-3">
            <li v-for="item in coursework" :key="item.title" class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 border-b border-gray-700/50 pb-2">
              <span>
                <a :href="item.repo" target="_blank" rel="noopener" class="font-bold text-white hover:underline">{{ item.title }}<span class="sr-only"> on GitHub (opens in new tab)</span></a>
                <span class="text-sm text-gray-400"> — {{ item.outcome }}</span>
              </span>
              <span :class="['text-xs whitespace-nowrap', isCorrupted ? 'text-red-400' : 'text-terminal-accent']">{{ item.tags.join(', ') }}</span>
            </li>
          </ul>
        </section>
        </AnimatedContent>

        <AnimatedContent :delay="0.25" :distance="60">
        <section aria-labelledby="education-heading">
          <h2 id="education-heading" :class="headingClass">
            <span class="mr-2" aria-hidden="true">/></span> Education
          </h2>

          <ul class="space-y-8 relative border-l border-gray-700/50 pl-6 ml-2">

            <li v-for="edu in education" :key="edu.institute" class="relative group">
              <div aria-hidden="true" :class="['absolute w-2.5 h-2.5 rounded-full -left-[30px] top-1.5 transition-colors duration-300', isCorrupted ? 'bg-red-500' : 'bg-gray-600 group-hover:bg-terminal-green']"></div>

              <div class="flex flex-col md:flex-row md:justify-between items-start gap-2 md:gap-4">

                <div class="mb-2 md:mb-0 flex-1">
                  <h3 class="text-lg font-bold text-white tracking-wide">{{ edu.institute }}</h3>
                  <p v-for="note in edu.notes" :key="note" :class="['text-xs mt-2 flex items-start leading-relaxed', isCorrupted ? 'text-red-400/80' : 'text-terminal-accent/80']">
                    <span class="mr-2 opacity-50 font-mono" aria-hidden="true">↳</span>
                    {{ note }}
                  </p>
                </div>

                <div class="flex flex-col md:items-end md:text-right flex-1">
                  <span class="text-gray-300 font-medium">{{ edu.course }}</span>
                  <span :class="['text-xs font-mono tracking-wider mt-1 whitespace-nowrap', isCorrupted ? 'text-red-500' : 'text-terminal-green']">
                    [{{ edu.dates }}]
                  </span>
                </div>

              </div>
            </li>

          </ul>
        </section>
        </AnimatedContent>

      </main>

      <AnimatedContent :delay="0.3" :distance="50">
      <footer class="mt-24 pt-8 border-t border-gray-700 font-mono text-sm">
        <div class="bg-black/50 p-4 rounded-md border border-gray-800">
          <p :class="['mb-2', isCorrupted ? 'text-red-300' : 'text-gray-400']">
            <span :class="['font-bold', isCorrupted ? 'text-red-500' : 'text-terminal-accent']">{{ terminal.bootLine.tag }}</span>
            — {{ typedText }}<span v-if="typedText.length < fullText.length" class="motion-safe:animate-pulse" aria-hidden="true">|</span>
          </p>
          <div role="log" aria-live="polite" aria-label="Terminal output" class="mb-2 space-y-1 h-32 overflow-y-auto flex flex-col justify-end">
            <p v-for="(line, index) in terminalOutput" :key="index" :class="['break-words', isCorrupted ? 'text-red-400' : 'text-gray-400']">
              {{ line }}
            </p>
          </div>
          <form class="flex items-center" @submit.prevent="executeCommand">
            <label for="terminal-input" class="sr-only">Terminal command (type help for a list)</label>
            <span :class="['mr-2', isCorrupted ? 'text-red-500' : 'text-terminal-green']" aria-hidden="true">guest@n4ver:~$</span>
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

        <div class="mt-4 flex justify-between text-gray-400">
          <p>SYSTEM.VERSION: 1.0.0</p>
          <div class="space-x-4">
            <a :href="profile.links.github" target="_blank" rel="noopener" class="hover:text-white transition-colors">GitHub<span class="sr-only"> (opens in new tab)</span></a>
          </div>
        </div>
      </footer>
      </AnimatedContent>
      </div>
  </div>
</template>

<style scoped>
/* Simple fade-in animation for the secret text */
@media (prefers-reduced-motion: no-preference) {
  .fade-in {
    animation: fadeIn 1s ease-in-out;
  }
}

/* Static stand-in when the WebGL background is skipped */
.threads-fallback {
  background: radial-gradient(ellipse 70% 50% at 75% 35%, rgb(255 255 255 / 0.05), transparent 70%);
}

.threads-fallback-corrupted {
  background: radial-gradient(ellipse 70% 50% at 75% 35%, rgb(255 90 90 / 0.08), transparent 70%);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
