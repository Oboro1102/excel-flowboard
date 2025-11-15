<script setup lang="ts">
import LayoutFlowCard from '@/layout/LayoutFlowCard.vue'
import { ref, toRefs, watch, defineAsyncComponent } from 'vue'
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { handlerStyleOut } from '@/utils/dataMap'
import LoadingArea from '@/components/LoadingArea.vue'
import { toUnit } from '@primeuix/themes'
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
const selectedValue = ref<any[] | null>(null)
watch(selectedValue, () => {
  updateNodeData(id.value, {
    sheetSource: {
      source: selectedExcelSource.value,
      selectedSheet: selectedValue.value,
    },
  })
})
</script>

<template>
  <LayoutFlowCard :node-id="id" title="Excel 資料庫">
    <template #sourceHandle>
      <div class="relative">
        <Handle
          type="source"
          v-tooltip.right="'內容輸出'"
          :connectable="selectedValue ? selectedValue.length > 0 : false"
          :position="Position.Right"
          :style="handlerStyleOut"
        />
        <span
          v-if="!selectedValue"
          v-tooltip.top="'請先載入檔案並設定工作表'"
          class="text-error absolute -right-3 bottom-1/2 z-10 translate-y-1/2 text-2xl"
          ><i class="bi bi-x-lg"></i
        ></span>
      </div>
    </template>
    <UploaderExcel v-model:selected-value="selectedValue" />
  </LayoutFlowCard>
</template>
