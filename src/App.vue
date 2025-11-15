<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toast, ConfirmDialog } from 'primevue'
</script>

<template>
  <Toast position="top-center" :pt="{ root: { class: 'max-w-fit leading-none' } }" />
  <ConfirmDialog />
  <RouterView />
</template>
