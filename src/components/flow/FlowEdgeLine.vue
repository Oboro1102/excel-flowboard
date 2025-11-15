<script setup lang="ts">
defineProps({
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <g>
    <path
      class="vue-flow__connection animated"
      fill="none"
      stroke="var(--color-linkline)"
      :stroke-width="2"
      :d="`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`"
    />
    <circle
      :cx="targetX"
      :cy="targetY"
      fill="#ffffff"
      :r="6"
      stroke="var(--color-linkline)"
      :stroke-width="1.5"
    />
  </g>
</template>
