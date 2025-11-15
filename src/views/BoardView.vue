<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted } from 'vue'
import { ConnectionMode, useVueFlow, VueFlow, type Node, type Edge } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { panels } from '@/utils/dataMap'
import { Button } from 'primevue'
import LoadingArea from '@/components/LoadingArea.vue'
const MenuTop = defineAsyncComponent({
  loader: () => import('@/components/MenuTop.vue'),
  loadingComponent: LoadingArea,
})
const FooterBar = defineAsyncComponent({
  loader: () => import('@/components/FooterBar.vue'),
  loadingComponent: LoadingArea,
})
const PanelUnits = defineAsyncComponent({
  loader: () => import('@/components/flow/PanelUnits.vue'),
  loadingComponent: LoadingArea,
})
const FlowEdgeWithButton = defineAsyncComponent({
  loader: () => import('@/components/flow/FlowEdgeWithButton.vue'),
  loadingComponent: LoadingArea,
})
const FlowCardExcel = defineAsyncComponent({
  loader: () => import('@/components/flow/FlowCardExcel.vue'),
  loadingComponent: LoadingArea,
})
const FlowCardChart = defineAsyncComponent({
  loader: () => import('@/components/flow/FlowCardChart.vue'),
  loadingComponent: LoadingArea,
})
const FlowEdgeLine = defineAsyncComponent({
  loader: () => import('@/components/flow/FlowEdgeLine.vue'),
  loadingComponent: LoadingArea,
})
const { addEdges, toObject, fromObject } = useVueFlow()
// 流程圖相關
const flowInstance = ref<any | null>(null)
const nodes = ref<Node[]>([])
const edges = ref<Edge[]>([])
const edgeOnConnect = (params: any) => {
  addEdges({
    ...params,
    type: 'FlowEdgeWithButton',
    style: { strokeWidth: 2, stroke: 'var(--color-linkline)' },
    animated: true,
  })
}
// 控制面板相關
const boardZoom = (type: 'in' | 'out' | 'fit' = 'in') => {
  if (flowInstance.value) {
    switch (type) {
      case 'in':
        flowInstance.value.zoomIn({
          duration: 300,
        })
        break
      case 'out':
        flowInstance.value.zoomOut({
          duration: 300,
        })
        break
      case 'fit':
        flowInstance.value.fitView({
          duration: 300,
        })
        break

      default:
        flowInstance.value.fitView({
          duration: 300,
        })
        break
    }
  }
}
import { useGlobalStore } from '@/stores/index'
const globalStore = useGlobalStore()
const getBoardData = async () => {
  const existData = sessionStorage.getItem('boardConfigData')
  if (existData) {
    await fromObject(JSON.parse(existData))
    globalStore.boardConfigData = JSON.parse(existData)
  }
}
// const saveBoard = () => {
//   globalStore.saveBoard(JSON.stringify(toObject()))
// }
import useDragAndDrop from '@/composable/useDnD'
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

onMounted(() => {
  getBoardData()
})
</script>

<template>
  <MenuTop />
  <main class="relative h-dvh w-dvw" @drop="onDrop">
    <PanelUnits root-class="panel top-4 right-4 z-[51]!" />
    <div class="panel right-4 bottom-4 z-[51]!">
      <Button
        v-for="({ label, icon, actionKey }, index) in panels.control"
        :key="index"
        text
        size="small"
        severity="secondary"
        :icon="icon"
        v-tooltip.top="`${label}`"
        @click="boardZoom(actionKey as 'out' | 'in' | 'fit')"
      />
    </div>
    <!-- <div class="panel right-34 bottom-4 z-[51]!">
      <Button
        text
        size="small"
        severity="secondary"
        icon="bi bi-floppy"
        v-tooltip.top="'儲存工作區'"
        @click="saveBoard"
      />
    </div> -->
    <VueFlow
      ref="flowInstance"
      v-model:nodes="nodes"
      v-model:edges="edges"
      :connection-mode="ConnectionMode.Strict"
      elevate-edges-on-select
      @connect="edgeOnConnect"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
    >
      <Background pattern-color="var(--color-siteBgSub)" :gap="16" />
      <template #connection-line="props">
        <FlowEdgeLine v-bind="props" />
      </template>
      <template #edge-FlowEdgeWithButton="props">
        <FlowEdgeWithButton v-bind="props" />
      </template>
      <template #node-FlowCardExcel="props">
        <FlowCardExcel v-bind="props" />
      </template>
      <template #node-FlowCardChart="props">
        <FlowCardChart v-bind="props" />
      </template>
    </VueFlow>
  </main>
  <FooterBar />
</template>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
</style>
