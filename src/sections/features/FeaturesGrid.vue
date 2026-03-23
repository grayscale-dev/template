<script setup lang="ts">
import Card from 'primevue/card'

import PageContainer from '../../components/ui/PageContainer.vue'
import SectionHeading from '../../components/ui/SectionHeading.vue'

import type { FeatureBlock } from '../../types/site'

withDefaults(
  defineProps<{
    features: FeatureBlock[]
    title?: string
    subtitle?: string
  }>(),
  {
    title: 'Core Capabilities',
    subtitle:
      'A flexible component foundation for modern marketing site remodels.'
  }
)
</script>

<template>
  <section class="py-16 sm:py-20">
    <PageContainer>
      <div class="space-y-10">
        <SectionHeading :title="title" :subtitle="subtitle" align="center" />

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            v-for="feature in features"
            :key="feature.title"
            class="h-full border border-slate-200 shadow-sm"
          >
            <template #content>
              <div class="space-y-3">
                <div
                  class="text-2xl"
                  :class="feature.icon"
                  style="color: var(--brand-primary)"
                />
                <h3 class="text-lg font-semibold text-slate-900">
                  {{ feature.title }}
                </h3>
                <p class="text-sm leading-relaxed text-slate-600">
                  {{ feature.description }}
                </p>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </PageContainer>
  </section>
</template>
