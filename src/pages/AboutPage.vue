<script setup lang="ts">
import { onMounted } from 'vue'
import Tag from 'primevue/tag'

import PageContainer from '../components/ui/PageContainer.vue'
import SectionHeading from '../components/ui/SectionHeading.vue'
import { siteContent } from '../content/site-content'
import { applyPageSeo } from '../lib/seo'

const about = siteContent.pages.about

onMounted(() => {
  applyPageSeo({
    title: 'About',
    description: `${about.subtitle} ${siteContent.metadata.description}`
  })
})
</script>

<template>
  <section class="py-16 sm:py-20">
    <PageContainer>
      <div class="space-y-10">
        <SectionHeading :title="about.title" :subtitle="about.subtitle" />

        <div class="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div class="space-y-5">
            <p
              v-for="paragraph in about.paragraphs"
              :key="paragraph"
              class="text-base leading-relaxed text-slate-700"
            >
              {{ paragraph }}
            </p>
          </div>

          <aside
            class="space-y-3 rounded-xl border border-slate-200 bg-white p-5"
          >
            <h3 class="text-base font-semibold text-slate-900">
              Implementation Priorities
            </h3>
            <div class="flex flex-wrap gap-2">
              <Tag
                v-for="highlight in about.highlights"
                :key="highlight"
                :value="highlight"
                severity="secondary"
              />
            </div>
          </aside>
        </div>
      </div>
    </PageContainer>
  </section>
</template>
