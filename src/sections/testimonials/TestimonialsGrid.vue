<script setup lang="ts">
import Avatar from 'primevue/avatar'
import Card from 'primevue/card'

import PageContainer from '../../components/ui/PageContainer.vue'
import SectionHeading from '../../components/ui/SectionHeading.vue'

import type { Testimonial } from '../../types/site'

defineProps<{
  testimonials: Testimonial[]
}>()

function initials(name: string): string {
  return name
    .split(' ')
    .map((value) => value[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
</script>

<template>
  <section class="bg-white py-16 sm:py-20">
    <PageContainer>
      <div class="space-y-10">
        <SectionHeading
          title="What Teams Say"
          subtitle="Example testimonial structures you can replace with real, approved customer proof."
          align="center"
        />

        <div class="grid gap-4 lg:grid-cols-3">
          <Card
            v-for="item in testimonials"
            :key="`${item.name}-${item.company}`"
            class="h-full border border-slate-200 shadow-sm"
          >
            <template #content>
              <div class="space-y-5">
                <p class="text-sm leading-relaxed text-slate-700">
                  "{{ item.quote }}"
                </p>

                <div class="flex items-center gap-3">
                  <Avatar
                    :label="initials(item.name)"
                    shape="circle"
                    style="
                      background-color: var(--brand-primary-soft);
                      color: var(--brand-primary);
                    "
                  />
                  <div>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ item.name }}
                    </p>
                    <p class="text-sm text-slate-600">
                      {{ item.role }} at {{ item.company }}
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </PageContainer>
  </section>
</template>
