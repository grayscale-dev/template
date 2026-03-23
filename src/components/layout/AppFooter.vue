<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { FooterData } from '../../types/site'

defineProps<{
  siteName: string
  footer: FooterData
}>()
</script>

<template>
  <footer class="border-t border-slate-200 bg-white">
    <div
      class="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8"
    >
      <div class="space-y-3">
        <h2 class="text-lg font-semibold text-slate-900">{{ siteName }}</h2>
        <p class="text-sm leading-relaxed text-slate-600">
          {{ footer.legal }}
        </p>
      </div>

      <div
        v-for="column in footer.columns"
        :key="column.title"
        class="space-y-3"
      >
        <h3
          class="text-sm font-semibold uppercase tracking-wide text-slate-900"
        >
          {{ column.title }}
        </h3>

        <ul class="space-y-2">
          <li
            v-for="link in column.links"
            :key="`${column.title}-${link.label}`"
          >
            <RouterLink
              v-if="link.to"
              :to="link.to"
              class="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              {{ link.label }}
            </RouterLink>
            <a
              v-else-if="link.href"
              :href="link.href"
              class="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              {{ link.label }}
            </a>
            <span v-else class="text-sm text-slate-500">{{ link.label }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-slate-200">
      <div
        class="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"
      >
        <span>{{ footer.copyright }}</span>
        <span>Built for repeatable website remodel workflows.</span>
      </div>
    </div>
  </footer>
</template>
