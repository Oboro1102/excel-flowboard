<script setup lang="ts">
import { Button } from 'primevue'
import { toRefs } from 'vue'
import { useSessionStorage } from '@vueuse/core'
import { panels } from '@/utils/dataMap'

const props = withDefaults(
  defineProps<{
    rootClass?: string
  }>(),
  {},
)
const { rootClass } = toRefs(props)
// 拖曳相關
import useDragAndDrop from '@/composable/useDnD'
const { onDragStart } = useDragAndDrop()
// 選單相關
const collapseMenu = useSessionStorage('collapseMenu', false)
</script>

<template>
  <div
    class="wrap flex max-w-36 flex-col bg-white"
    :class="rootClass"
    v-tooltip.bottom="'拖曳元件至工作區來建立流程'"
  >
    <Button
      size="small"
      severity="secondary"
      text
      v-tooltip.right="`${collapseMenu ? '展開元件選單' : ''}`"
      :pt="collapseMenu ? undefined : { root: { class: 'justify-start!' } }"
      :icon="collapseMenu ? 'bi bi-chevron-left' : 'bi bi-chevron-right'"
      :label="collapseMenu ? undefined : '收合元件選單'"
      @click="collapseMenu = !collapseMenu"
    />
    <div class="bg-divide mx-auto my-0.5 h-px w-[calc(100%-0.25rem*3)]" />
    <div class="max-h-[calc(100dvh-26px-113px-24.5px-46px-1.25rem*4)] overflow-y-auto">
      <div v-for="(item, index) in Object.entries(panels.units)" :key="index" class="flex flex-col">
        <Button
          v-for="{ label, card, icon } in item[1]"
          :key="label"
          size="small"
          severity="secondary"
          text
          v-tooltip.right="`${collapseMenu ? label : ''}`"
          :icon="icon"
          :label="collapseMenu ? undefined : label"
          :draggable="true"
          :pt="collapseMenu ? undefined : { root: { class: 'justify-start!' } }"
          @dragstart="onDragStart($event, card)"
        />
      </div>
    </div>
  </div>
</template>
