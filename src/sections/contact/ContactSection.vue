<script setup lang="ts">
import { reactive, ref } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Textarea from 'primevue/textarea'

import type { ContactInfo } from '../../types/site'

defineProps<{
  content: ContactInfo
}>()

const submitted = ref(false)
const formState = reactive({
  name: '',
  email: '',
  message: ''
})

function submitForm(): void {
  submitted.value = true
  formState.name = ''
  formState.email = ''
  formState.message = ''
}
</script>

<template>
  <section class="py-16 sm:py-20">
    <div
      class="mx-auto grid w-full max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"
    >
      <Card class="border border-slate-200 shadow-sm">
        <template #content>
          <div class="space-y-4">
            <h3 class="text-2xl font-semibold text-slate-900">
              {{ content.headline }}
            </h3>
            <p class="text-sm leading-relaxed text-slate-600">
              {{ content.body }}
            </p>

            <div class="space-y-2 text-sm text-slate-700">
              <p>
                <span class="font-semibold text-slate-900">Email:</span>
                {{ content.email }}
              </p>
              <p>
                <span class="font-semibold text-slate-900">Phone:</span>
                {{ content.phone }}
              </p>
              <p>
                <span class="font-semibold text-slate-900">Hours:</span>
                {{ content.hours }}
              </p>
              <p class="font-semibold text-slate-900">Address:</p>
              <p
                v-for="line in content.addressLines"
                :key="line"
                class="text-slate-600"
              >
                {{ line }}
              </p>
            </div>
          </div>
        </template>
      </Card>

      <Card class="border border-slate-200 shadow-sm">
        <template #content>
          <form class="space-y-4" @submit.prevent="submitForm">
            <div class="space-y-2">
              <label for="name" class="text-sm font-medium text-slate-900"
                >Name</label
              >
              <InputText
                id="name"
                v-model="formState.name"
                class="w-full"
                required
              />
            </div>

            <div class="space-y-2">
              <label for="email" class="text-sm font-medium text-slate-900"
                >Email</label
              >
              <InputText
                id="email"
                v-model="formState.email"
                type="email"
                class="w-full"
                required
              />
            </div>

            <div class="space-y-2">
              <label for="message" class="text-sm font-medium text-slate-900"
                >Project Notes</label
              >
              <Textarea
                id="message"
                v-model="formState.message"
                rows="5"
                class="w-full"
                required
              />
            </div>

            <Button type="submit" label="Send Message" icon="pi pi-send" />

            <Message v-if="submitted" severity="success" :closable="false">
              Message captured locally. Connect `src/lib/supabase.ts` when you
              want live submissions.
            </Message>
          </form>
        </template>
      </Card>
    </div>
  </section>
</template>
