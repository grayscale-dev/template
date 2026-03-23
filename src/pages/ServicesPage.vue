<script setup lang="ts">
import { onMounted } from 'vue'
import Card from 'primevue/card'

import PageContainer from '../components/ui/PageContainer.vue'
import PrimaryButton from '../components/ui/PrimaryButton.vue'
import SectionHeading from '../components/ui/SectionHeading.vue'
import { siteContent } from '../content/site-content'
import { applyPageSeo } from '../lib/seo'

const servicesPage = siteContent.pages.services

onMounted(() => {
  applyPageSeo({
    title: 'Services',
    description: servicesPage.intro
  })
})
</script>

<template>
  <section class="py-16 sm:py-20">
    <PageContainer>
      <div class="space-y-10">
        <SectionHeading
          :title="servicesPage.title"
          :subtitle="servicesPage.subtitle"
        />

        <p class="max-w-3xl text-base leading-relaxed text-slate-700">
          {{ servicesPage.intro }}
        </p>

        <div class="grid gap-4 md:grid-cols-2">
          <Card
            v-for="service in servicesPage.services"
            :key="service.name"
            class="h-full border border-slate-200 shadow-sm"
          >
            <template #title>
              <h3 class="text-lg font-semibold text-slate-900">
                {{ service.name }}
              </h3>
            </template>
            <template #content>
              <p class="text-sm leading-relaxed text-slate-600">
                {{ service.summary }}
              </p>
            </template>
          </Card>
        </div>

        <div>
          <PrimaryButton label="Discuss Your Project" to="/contact" />
        </div>
      </div>
    </PageContainer>
  </section>
</template>
