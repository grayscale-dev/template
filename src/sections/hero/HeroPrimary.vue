<script setup lang="ts">
import PageContainer from '../../components/ui/PageContainer.vue'
import PrimaryButton from '../../components/ui/PrimaryButton.vue'

import type { HeroContent } from '../../types/site'

defineProps<{
  content: HeroContent
}>()
</script>

<template>
  <section class="relative overflow-hidden py-20 sm:py-24">
    <div
      class="absolute inset-0 -z-10 bg-gradient-to-b from-[color:var(--brand-primary-soft)] to-slate-50"
      aria-hidden="true"
    />

    <PageContainer>
      <div class="mx-auto max-w-3xl space-y-8 text-center">
        <p
          v-if="content.eyebrow"
          class="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium"
          style="color: var(--brand-primary)"
        >
          {{ content.eyebrow }}
        </p>

        <h1
          class="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
        >
          {{ content.title }}
        </h1>

        <p class="text-lg leading-relaxed text-slate-600 sm:text-xl">
          {{ content.subtitle }}
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3">
          <PrimaryButton
            :label="content.primaryCta.label"
            :to="content.primaryCta.to"
          />
          <PrimaryButton
            v-if="content.secondaryCta"
            :label="content.secondaryCta.label"
            :to="content.secondaryCta.to"
            :href="content.secondaryCta.href"
            outlined
          />
        </div>
      </div>
    </PageContainer>
  </section>
</template>
