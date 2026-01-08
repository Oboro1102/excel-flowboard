<script setup lang="ts">
import { toRefs } from 'vue'
const props = withDefaults(
  defineProps<{
    showLogo?: boolean
  }>(),
  { showLogo: true },
)
const { showLogo } = toRefs(props)
</script>

<template>
  <main
    class="flex grow flex-col items-center justify-center bg-[url(https://unsplash.com/photos/seA-FPPXL-M/download?force=true&w=1920)] bg-cover bg-center p-4"
  >
    <div class="radius wrap--gap flex w-full max-w-md flex-col bg-white p-6 shadow-lg">
      <div v-if="showLogo" class="text-main mx-auto flex items-center gap-2">
        <span class="text-2xl font-semibold">Excel 圖表白板</span>
      </div>
      <slot name="form" />
    </div>
  </main>
</template>
