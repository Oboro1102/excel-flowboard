<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="panel pointer-events-none bottom-4 left-4 px-2! text-[0.625rem] whitespace-nowrap text-(--p-button-text-secondary-color)"
  >
    &copy; 2025{{ currentYear > 2025 ? ` - ${currentYear}` : null }} Design & Coding by
    ツキノリュウ.
  </footer>
</template>
