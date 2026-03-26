<script setup>
import { ref, onMounted } from 'vue'

// --- PROJECT DATA ---
const projects = ref([
  {
    title: 'E-sports Stream Dashboard',
    tech: 'Python, Flask, WSGI, REST API',
    description: 'Created and deployed a web-based dashboard automating display of competitive Team Fortress 2 match logs for grassroots live streaming.',
    link: 'https://github.com/n4ver/N4TV'
  },
  {
    title: 'Unity Horror Game',
    tech: 'Unity, C#, Agile',
    description: 'Developed a first-person horror game featuring an inventory system, event triggers & state management.',
    link: 'https://github.com/n4ver/IM2073_horrorgame'
  },
  {
    title: 'E-Bookshop Website',
    tech: 'Java, MySQL, Tomcat',
    description: 'Designed and implemented a normalised database schema with a many-to-many relationship, using PreparedStatements to prevent SQL injection.',
    link: 'https://github.com/n4ver/IM2073_WebProject'
  }
])

// --- ACHIEVEMENTS DATA ---
const achievements = ref([
  { title: 'Selected Student Representative for NTU\'s IEM', event: 'EAB Accreditation Dialogue', year: '2026' },
  { title: 'Participant', event: 'National Olympiad in Informatics (NOI)', year: '2019' },
  { title: 'Merit Award', event: 'CB Paul Science Quiz', year: '2019' }
])

// --- EDUCATION DATA ---
const education = ref([
  {
    institute: 'Nanyang Technological University',
    course: 'BS in Information Engineering & Media',
    graduation: 'Expected May 2028',
    cca: 'dEEEveloper Sub-committee (Training & Development | Special Projects)'

  },
  {
    institute: 'Ngee Ann Polytechnic',
    course: 'Dip in Cybersecurity & Digital Forensics',
    graduation: 'May 2023',
    cca: ''
  }
])


// --- EASTER EGG: IDLE MECHANIC ---
const bytesMined = ref(0)
const isCorrupted = ref(false)

const mineBytes = () => {
  bytesMined.value++
  if (bytesMined.value >= 5) {
    isCorrupted.value = true // Triggers a theme change and uncovers a secret log
  }
}

// --- TYPEWRITER EFFECT ---
const fullText = "Start with the biggest letters in order to learn the characteristics of the style. Then work your way down."
const typedText = ref('')

onMounted(() => {
  let i = 0
  const interval = setInterval(() => {
    if (i < fullText.length) {
      typedText.value += fullText.charAt(i)
      i++
    } else {
      clearInterval(interval)
    }
  }, 40) // Typing speed in milliseconds

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // When the element is in view, remove the hidden state classes
        // and add the visible state classes
        entry.target.classList.remove('opacity-0', 'translate-y-10')
        entry.target.classList.add('opacity-100', 'translate-y-0')
        
        // Unobserve so the animation only happens once per page load
        observer.unobserve(entry.target) 
      }
    })
  }, { 
    threshold: 0.1 // Triggers when 10% of the element is visible
  })

  // Target all elements with the 'scroll-fade' class
  document.querySelectorAll('.scroll-fade').forEach((el) => {
    observer.observe(el)
  })

})

// --- INTERACTIVE COMMAND LINE ---
const terminalInput = ref('')
const terminalOutput = ref(['SYSTEM.STATUS: ONLINE. Type "help" for a list of commands.'])

const executeCommand = () => {
  const cmd = terminalInput.value.trim().toLowerCase()
  if (!cmd) return
  
  terminalOutput.value.push(`> ${cmd}`)

  switch (cmd) {
    case 'help':
      terminalOutput.value.push('Available commands: help, whoami, clear, sudo rm -rf /')
      break
    case 'whoami':
      terminalOutput.value.push('Nicholas Chng. Information Engineering & Media student at NTU.')
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
  
  // Keep only the last 5 lines to prevent UI overflow
  if (terminalOutput.value.length > 6) {
    terminalOutput.value = terminalOutput.value.slice(-6)
  }
  terminalInput.value = ''
}
</script>

<template>
  <div :class="['min-h-screen w-full transition-colors duration-1000', isCorrupted ? 'bg-[#2a0f0f] text-red-200' : 'bg-terminal-bg text-gray-300']">
    <div class="p-8 md:p-16 max-w-4xl mx-auto">
      <header class="mb-16 border-b border-gray-700 pb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          Nicholas Chng 
          <span @click="mineBytes" 
                :class="['animate-pulse cursor-pointer select-none', isCorrupted ? 'text-red-500' : 'text-terminal-green']">_</span>
        </h1> 
        <h2 class="text-xl text-gray-400 mb-6">Bachelor of Information Engineering @ NTU</h2> 
        
        <div class="bg-gray-800/50 p-4 border-l-4 border-terminal-accent font-serif italic space-y-2 min-h-32">
          <p>
            <span :class="['font-bold not-italic', isCorrupted ? 'text-red-500' : 'text-terminal-accent']">[LOGIC: Challenging]</span> 
            — {{ typedText }}<span v-if="typedText.length < fullText.length" class="animate-pulse">|</span>
          </p>
          
          <p v-if="isCorrupted" class="text-red-400 font-bold fade-in mt-2">
            [CONCEPTUALIZATION: Success] — The system is yours. You have extracted {{ bytesMined }} encrypted bytes.
          </p>
        </div>
      </header>

      <main class="space-y-16">
        
        <section class="scroll-fade opacity-0 translate-y-10 transition-all duration-700 ease-out">
          <h3 :class="['text-2xl font-boldmb-6 flex items-center', isCorrupted ? 'text-red-500' : 'text-terminal-green']">
            <span class="mr-2">/></span> Work_Experience
          </h3>
          
          <div class="space-y-8">
            <div class="relative pl-6 border-l border-gray-700">
              <div class="absolute w-3 h-3 bg-gray-600 rounded-full -left-[6.5px] top-1.5"></div>
              <h4 class="text-xl font-bold text-white">Singapore Armed Forces</h4> <p class="text-terminal-accent mb-2">Signal Storeman | Aug 2023 - Aug 2025</p> <p class="text-sm">Built Excel-based automation systems to track inventory, improving fulfilment lead times and accuracy by 20%.</p> </div>
            
            <div class="relative pl-6 border-l border-gray-700">
              <div class="absolute w-3 h-3 bg-gray-600 rounded-full -left-[6.5px] top-1.5"></div>
              <h4 class="text-xl font-bold text-white">Toppan Ecquaria</h4> <p class="text-terminal-accent mb-2">QA Intern | Sep 2022 - Jan 2023</p> <p class="text-sm">Devised automation scripts in Visual Basic and Excel to streamline data tracking, reducing manual entry errors and improving bug-reporting turnaround by 40%.</p> </div>
          </div>
        </section>

        <section class="scroll-fade opacity-0 translate-y-10 transition-all duration-700 ease-out delay-100">
          <h3 :class="['text-2xl font-bold mb-6 flex items-center', isCorrupted ? 'text-red-500' : 'text-terminal-green']">
            <span class="mr-2">/></span> Project_Vault
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="project in projects" :key="project.title" 
                :class="['bg-gray-800/30 border border-gray-700 p-6 transition-colors group', isCorrupted ? 'hover:border-red-500' : 'hover:border-terminal-green']">
              <h4 :class="['text-lg font-bold text-white mb-1', isCorrupted ? 'group-hover:text-red-500' : 'group-hover:text-terminal-green']">{{ project.title }}</h4>
              <p :class="['text-xs mb-4 font-bold tracking-wider uppercase', isCorrupted ? 'text-red-400' : 'text-terminal-accent']">{{ project.tech }}</p>
              <p class="text-sm mb-6">{{ project.description }}</p>
              <a :href="project.link" target="_blank" class="inline-flex items-center text-sm font-bold hover:text-white transition-colors">
                Access Source <span class="ml-2 group-hover:translate-x-1 transition-transform">-></span>
              </a>
            </div>
          </div>
        </section>

        <section class="scroll-fade opacity-0 translate-y-10 transition-all duration-700 ease-out delay-200">
          <h3 :class="['text-2xl font-bold mb-6 flex items-center', isCorrupted ? 'text-red-500' : 'text-terminal-green']">
            <span class="mr-2">/></span> Accolades
          </h3>
          <ul class="space-y-3">
            <li v-for="award in achievements" :key="award.title" class="flex flex-col sm:flex-row sm:justify-between border-b border-gray-700/50 pb-2">
              <span class="font-bold text-white">{{ award.title }}</span>
              <span class="text-sm text-gray-400">{{ award.event }} <span class="text-terminal-accent ml-2">[{{ award.year }}]</span></span>
            </li>
          </ul>
        </section>

        <section class="scroll-fade opacity-0 translate-y-10 transition-all duration-700 ease-out delay-200">
          <h3 :class="['text-2xl font-bold mb-6 flex items-center', isCorrupted ? 'text-red-500' : 'text-terminal-green']">
            <span class="mr-2">/></span> Education
          </h3>
          
          <ul class="space-y-8 relative border-l border-gray-700/50 pl-6 ml-2">
            
            <li v-for="edu in education" :key="edu.institute" class="relative group">
              <div :class="['absolute w-2.5 h-2.5 rounded-full -left-[30px] top-1.5 transition-colors duration-300', isCorrupted ? 'bg-red-500' : 'bg-gray-600 group-hover:bg-terminal-green']"></div>

              <div class="flex flex-col md:flex-row md:justify-between items-start gap-2 md:gap-4">
                
                <div class="mb-2 md:mb-0 flex-1">
                  <h4 class="text-lg font-bold text-white tracking-wide">{{ edu.institute }}</h4>
                  <p v-if="edu.cca" :class="['text-xs mt-2 flex items-start leading-relaxed', isCorrupted ? 'text-red-400/80' : 'text-terminal-accent/80']">
                    <span class="mr-2 opacity-50 font-mono">↳</span> 
                    {{ edu.cca }}
                  </p>
                </div>

                <div class="flex flex-col md:items-end md:text-right flex-1">
                  <span class="text-gray-300 font-medium">{{ edu.course }}</span>
                  <span :class="['text-xs font-mono tracking-wider mt-1 whitespace-nowrap', isCorrupted ? 'text-red-500' : 'text-terminal-green']">
                    [{{ edu.graduation }}]
                  </span>
                </div>
                
              </div>
            </li>
            
          </ul>
        </section>

      </main>

      <footer class="mt-24 pt-8 border-t border-gray-700 font-mono text-sm">
        <div class="bg-black/50 p-4 rounded-md border border-gray-800">
          <div class="mb-2 space-y-1 h-32 overflow-y-auto flex flex-col justify-end">
            <p v-for="(line, index) in terminalOutput" :key="index" :class="isCorrupted ? 'text-red-400' : 'text-gray-400'">
              {{ line }}
            </p>
          </div>
          <div class="flex items-center">
            <span :class="['mr-2', isCorrupted ? 'text-red-500' : 'text-terminal-green']">guest@n4ver:~$</span>
            <input 
              v-model="terminalInput" 
              @keyup.enter="executeCommand"
              type="text" 
              class="bg-transparent border-none outline-none flex-1 text-white"
              placeholder="enter command..."
              autocomplete="off"
              spellcheck="false"
            />
          </div>
        </div>
        
        <div class="mt-4 flex justify-between text-gray-500">
          <p>SYSTEM.VERSION: 1.0.0</p>
          <div class="space-x-4">
            <a href="https://github.com/n4ver" target="_blank" class="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Simple fade-in animation for the secret text */
.fade-in {
  animation: fadeIn 1s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>