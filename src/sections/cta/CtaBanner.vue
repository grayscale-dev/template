<script setup lang="ts">
import Card from 'primevue/card'

import PageContainer from '../../components/ui/PageContainer.vue'
import PrimaryButton from '../../components/ui/PrimaryButton.vue'

import type { CtaContent } from '../../types/site'

defineProps<{
  content: CtaContent
}>()
</script>

<template>
  <section class="py-16 sm:py-20">
    <PageContainer>
      <Card
        class="border-0 shadow-none"
        style="background-color: var(--brand-secondary)"
      >
        <template #content>
          <div class="space-y-6 rounded-2xl p-8 text-white sm:p-12">
            <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
              {{ content.title }}
            </h2>
            <p
              class="max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg"
            >
              {{ content.body }}
            </p>
            <PrimaryButton
              :label="content.action.label"
              :to="content.action.to"
              :href="content.action.href"
            />
          </div>
        </template>
      </Card>
    </PageContainer>
  </section>
</template>
