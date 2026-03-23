<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionContent from 'primevue/accordioncontent'
import AccordionHeader from 'primevue/accordionheader'
import AccordionPanel from 'primevue/accordionpanel'

import PageContainer from '../../components/ui/PageContainer.vue'
import SectionHeading from '../../components/ui/SectionHeading.vue'

import type { FaqItem } from '../../types/site'

defineProps<{
  items: FaqItem[]
}>()
</script>

<template>
  <section class="py-16 sm:py-20">
    <PageContainer>
      <div class="space-y-10">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Common questions teams ask before starting a remodel project."
          align="center"
        />

        <Accordion
          value="0"
          class="rounded-xl border border-slate-200 bg-white"
        >
          <AccordionPanel
            v-for="(item, index) in items"
            :key="item.question"
            :value="String(index)"
          >
            <AccordionHeader>{{ item.question }}</AccordionHeader>
            <AccordionContent>
              <p class="text-sm leading-relaxed text-slate-600">
                {{ item.answer }}
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </PageContainer>
  </section>
</template>
