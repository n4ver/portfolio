<script setup>
import ScrollReveal from './components/ScrollReveal.vue'
import SiteBackground from './components/SiteBackground.vue'
import HeroHeader from './components/HeroHeader.vue'
import SectionHeading from './components/SectionHeading.vue'
import SkillGroup from './components/SkillGroup.vue'
import ExperienceItem from './components/ExperienceItem.vue'
import ProjectCard from './components/ProjectCard.vue'
import CourseworkList from './components/CourseworkList.vue'
import EducationItem from './components/EducationItem.vue'
import SiteFooter from './components/SiteFooter.vue'
import { profile, terminal } from './data/profile.js'
import { experience } from './data/experience.js'
import { projects, coursework } from './data/projects.js'
import { education } from './data/education.js'
import { skills } from './data/skills.js'
</script>

<template>
  <div class="relative min-h-screen w-full overflow-x-hidden transition-colors duration-1000 text-theme-text">
    <SiteBackground />
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-20 focus:px-4 focus:py-2 focus:bg-terminal-bg focus:text-white"
      >Skip to content</a
    >
    <div class="p-6 md:p-16 max-w-4xl mx-auto">
      <ScrollReveal :delay="0.05" :distance="60" class="mb-16 border-b border-gray-700 pb-8">
        <HeroHeader :profile="profile" />
      </ScrollReveal>

      <main id="main" tabindex="-1" class="space-y-16 focus:outline-none">
        <ScrollReveal :delay="0.1" :distance="60">
          <section aria-labelledby="experience-heading">
            <SectionHeading id="experience-heading">Experience</SectionHeading>
            <ul class="space-y-8 relative border-l border-gray-700/50 pl-4 ml-1 sm:pl-6 sm:ml-2">
              <ExperienceItem v-for="job in experience" :key="job.company" :job="job" />
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal :delay="0.15" :distance="60">
          <section aria-labelledby="projects-heading">
            <SectionHeading id="projects-heading">Projects</SectionHeading>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectCard
                v-for="project in projects"
                :key="project.title"
                :project="project"
                :class="{ 'md:col-span-2': project.featured }"
              />
            </div>
            <h3 class="text-lg font-bold text-white mt-10 mb-4">Course projects</h3>
            <CourseworkList :items="coursework" />
          </section>
        </ScrollReveal>

        <ScrollReveal :delay="0.1" :distance="60">
          <section aria-labelledby="skills-heading">
            <SectionHeading id="skills-heading">Skills</SectionHeading>
            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SkillGroup v-for="group in skills" :key="group.group" :group="group" />
            </dl>
          </section>
        </ScrollReveal>
        <ScrollReveal :delay="0.25" :distance="60">
          <section aria-labelledby="education-heading">
            <SectionHeading id="education-heading">Education</SectionHeading>
            <ul class="space-y-8 relative border-l border-gray-700/50 pl-4 ml-1 sm:pl-6 sm:ml-2">
              <EducationItem v-for="edu in education" :key="edu.institute" :edu="edu" />
            </ul>
          </section>
        </ScrollReveal>
      </main>

      <ScrollReveal :delay="0.3" :distance="50">
        <SiteFooter :profile="profile" :projects="projects" :skills="skills" :terminal="terminal" />
      </ScrollReveal>
    </div>
  </div>
</template>
