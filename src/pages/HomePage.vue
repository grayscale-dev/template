<script setup lang="ts">
import { onMounted } from 'vue'

import { siteContent } from '../content/site-content'
import { applyPageSeo } from '../lib/seo'
import ContactSection from '../sections/contact/ContactSection.vue'
import CtaBanner from '../sections/cta/CtaBanner.vue'
import FaqList from '../sections/faq/FaqList.vue'
import FeaturesGrid from '../sections/features/FeaturesGrid.vue'
import HeroPrimary from '../sections/hero/HeroPrimary.vue'
import TestimonialsGrid from '../sections/testimonials/TestimonialsGrid.vue'

onMounted(() => {
  applyPageSeo({
    title: 'Home',
    description: siteContent.metadata.description
  })
})
</script>

<template>
  <HeroPrimary :content="siteContent.hero" />
  <FeaturesGrid :features="siteContent.features" />
  <TestimonialsGrid :testimonials="siteContent.testimonials" />
  <CtaBanner :content="siteContent.cta" />
  <FaqList :items="siteContent.faq" />
  <ContactSection :content="siteContent.contact" />
</template>
