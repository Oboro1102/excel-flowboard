<script setup lang="ts">
import { toRefs } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import { Button } from 'primevue'

const props = withDefaults(
  defineProps<{
    rootClass?: string
    nodeId: string
    title?: string
    useDelete?: boolean
  }>(),
  { useDelete: true },
)
const { rootClass, nodeId, useDelete } = toRefs(props)
const { removeNodes } = useVueFlow()
</script>

<template>
  <div class="flex min-w-80 items-center" :class="rootClass">
    <slot name="targetHandle" />
    <div class="card__wrap">
      <div class="wrap--gap flex items-center">
        <span class="card__title" v-text="title" />
        <slot name="titleAdditional" />
        <div class="ml-auto">
          <slot name="controls" />
          <Button
            v-if="useDelete"
            size="small"
            text
            rounded
            v-tooltip.top="'刪除元件'"
            severity="secondary"
            icon="bi bi-trash"
            :pt="{ icon: { class: 'text-base!' } }"
            @click="removeNodes(nodeId)"
          />
        </div>
      </div>
      <slot />
    </div>
    <slot name="sourceHandle" />
  </div>
</template>
