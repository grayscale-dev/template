<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    align?: 'left' | 'center'
  }>(),
  {
    subtitle: '',
    align: 'left'
  }
)

const alignmentClass = computed(() =>
  props.align === 'center' ? 'text-center' : 'text-left'
)
</script>

<template>
  <div :class="['space-y-3', alignmentClass]">
    <h2
      class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="mx-auto max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
