<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'

import type { NavItem } from '../../types/site'

defineProps<{
  siteName: string
  navItems: NavItem[]
}>()

const mobileMenuOpen = ref(false)
const route = useRoute()

function isActive(path: string): boolean {
  return route.path === path
}

function closeMobileMenu(): void {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur"
  >
    <div
      class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
    >
      <RouterLink
        to="/"
        class="text-lg font-semibold tracking-tight text-slate-900"
      >
        {{ siteName }}
      </RouterLink>

      <nav class="hidden items-center gap-1 md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
          :class="
            isActive(item.to)
              ? 'bg-slate-900 text-white'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          "
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <RouterLink to="/contact" class="hidden md:inline-flex">
          <Button label="Start Project" size="small" />
        </RouterLink>

        <Button
          icon="pi pi-bars"
          text
          rounded
          aria-label="Open navigation menu"
          class="md:hidden"
          @click="mobileMenuOpen = true"
        />
      </div>
    </div>

    <Drawer
      v-model:visible="mobileMenuOpen"
      header="Navigation"
      position="right"
    >
      <nav class="flex flex-col gap-2 pt-2">
        <RouterLink
          v-for="item in navItems"
          :key="`mobile-${item.to}`"
          :to="item.to"
          class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
          :class="
            isActive(item.to)
              ? 'bg-slate-900 text-white'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          "
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </RouterLink>

        <RouterLink to="/contact" class="mt-2" @click="closeMobileMenu">
          <Button label="Start Project" class="w-full" />
        </RouterLink>
      </nav>
    </Drawer>
  </header>
</template>
