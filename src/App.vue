<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'

import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'
import { siteContent } from './content/site-content'
import { remodelConfig } from './lib/config'

const siteName = computed(
  () => remodelConfig.siteName || siteContent.metadata.siteName
)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader :site-name="siteName" :nav-items="siteContent.navItems" />

    <main class="flex-1">
      <RouterView />
    </main>

    <AppFooter :site-name="siteName" :footer="siteContent.footer" />
  </div>
</template>
