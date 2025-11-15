<script setup lang="ts">
import LayoutFlowCard from '@/layout/LayoutFlowCard.vue'
import { ref, toRefs, computed, watch, onMounted, defineAsyncComponent } from 'vue'
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { handlerStyleOut } from '@/utils/dataMap'
import LoadingArea from '@/components/LoadingArea.vue'
const UploaderExcel = defineAsyncComponent({
  loader: () => import('@/components/flow/UploaderExcel.vue'),
  loadingComponent: LoadingArea,
})

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})
const { id } = toRefs(props)
const { updateNodeData } = useVueFlow()
const selectedExcelSource = ref()
const sheetsData = ref<{ [index: string]: any }[] | any>([])
const selectedValue = ref<any[] | null>(null)
watch(selectedValue, (value) => {
  updateNodeData(id.value, {
    sheetSource: {
      source: selectedExcelSource.value,
      selectedSheet: selectedValue.value,
    },
    output: sheetsData.value[value as any] ?? [],
    isValid: value ? true : false,
  })
})

// 存檔相關
// 紀錄資料庫選擇項目
// import { useGlobalStore } from '@/stores/index'
// const globalStore = useGlobalStore()
// const existNodeData = computed(() =>
//   globalStore.boardConfigData.nodes.find((item: { id: string }) => item.id === id.value),
// )
// onMounted(async () => {
//   if (existNodeData.value) {
//     const { sheetSource } = existNodeData.value.data
//     selectedExcelSource.value = sheetSource.source
//     selectedValue.value = sheetSource.selectedSheet
//   }
// })
</script>

<template>
  <LayoutFlowCard :node-id="id" title="Excel 資料庫">
    <template #sourceHandle>
      <div class="relative">
        <Handle
          type="source"
          v-tooltip.right="'內容輸出'"
          :position="Position.Right"
          :style="handlerStyleOut"
        />
      </div>
    </template>
    <UploaderExcel v-model:selected-value="selectedValue" />
  </LayoutFlowCard>
</template>
