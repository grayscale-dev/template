<script setup lang="ts">
import { onMounted } from 'vue'

import PageContainer from '../components/ui/PageContainer.vue'
import SectionHeading from '../components/ui/SectionHeading.vue'
import { siteContent } from '../content/site-content'
import { applyPageSeo } from '../lib/seo'
import ContactSection from '../sections/contact/ContactSection.vue'

const contactPage = siteContent.pages.contact

onMounted(() => {
  applyPageSeo({
    title: 'Contact',
    description: contactPage.intro
  })
})
</script>

<template>
  <PageContainer>
    <section class="pt-16 sm:pt-20">
      <SectionHeading
        :title="contactPage.title"
        :subtitle="contactPage.subtitle"
      />
      <p class="mt-5 max-w-3xl text-base leading-relaxed text-slate-700">
        {{ contactPage.intro }}
      </p>
    </section>
  </PageContainer>

  <ContactSection :content="siteContent.contact" />
</template>
