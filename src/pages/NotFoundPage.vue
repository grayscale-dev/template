<script setup lang="ts">
import { onMounted } from 'vue'

import PageContainer from '../components/ui/PageContainer.vue'
import PrimaryButton from '../components/ui/PrimaryButton.vue'
import { applyPageSeo } from '../lib/seo'

onMounted(() => {
  applyPageSeo({
    title: 'Page Not Found',
    description: 'The requested page could not be found.'
  })
})
</script>

<template>
  <section class="py-24">
    <PageContainer>
      <div class="mx-auto max-w-2xl space-y-6 text-center">
        <p class="text-sm font-medium uppercase tracking-wider text-slate-500">
          404
        </p>
        <h1 class="text-4xl font-semibold tracking-tight text-slate-900">
          Page not found
        </h1>
        <p class="text-base leading-relaxed text-slate-600">
          The page you requested does not exist or may have been moved.
        </p>
        <PrimaryButton label="Back to Home" to="/" />
      </div>
    </PageContainer>
  </section>
</template>
