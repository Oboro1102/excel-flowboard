<script setup lang="ts">
import LayoutFlowCard from '@/layout/LayoutFlowCard.vue'
import { Button, Dialog, FloatLabel, Select, FileUpload, useToast } from 'primevue'
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
const toast = useToast()
const sourceExcelList = ref([])
const selectedExcelSource = ref()
const sheetsData = ref<{ [index: string]: any }[] | any>([])
const sheetsList = computed(() => {
  const result: { text: string; value: string }[] = []
  if (sheetsData.value) {
    const source = Object.keys(sheetsData.value)
    for (let index = 0; index < source.length; index++) {
      const element = source[index]
      result.push({ text: element, value: element })
    }
  }
  return result
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedValue = ref<any[] | null>(null)
watch(selectedValue, (value) => {
  updateNodeData(id.value, {
    sheetSource: {
      source: selectedExcelSource.value,
      selectedSheet: selectedValue.value,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    output: sheetsData.value[value as any] ?? [],
    isValid: value ? true : false,
  })
})
const showUploadDialog = ref(false)
const uploadFiles = ref([])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const previewUploadFiles = (event: { files: any }) => {
  const { files } = event
  if (!files || !files.length) return
  uploadFiles.value = files
  console.log(files)
}
// -- 前端使用
const readExcelFile = async (file: File) => {
  const url = URL.createObjectURL(file)
  const result = await fetch(url)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const data = window.XLSX.read(buffer, {
        type: 'binary',
        codepage: 65001,
      })
      const source: { [index: string]: { [index: string]: string } } = {}
      for (let index = 0; index < data.SheetNames.length; index++) {
        source[data.SheetNames[index]] = window.XLSX.utils.sheet_to_json(
          data.Sheets[data.SheetNames[index]],
        )
      }
      return source
    })
  return result
}
const onFileDirectUpload = async () => {
  if (uploadFiles.value.length < 1) {
    toast.add({
      severity: 'warn',
      summary: '上傳失敗',
      detail: '請先選擇欲上傳的檔案',
      life: 1500,
    })
    return
  }
  sheetsData.value = await readExcelFile(uploadFiles.value[0])
  showUploadDialog.value = false
}

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
    <template #controls>
      <Button
        size="small"
        text
        rounded
        severity="secondary"
        v-tooltip.top="'上傳檔案'"
        icon="bi bi-cloud-arrow-up"
        :pt="{ icon: { class: 'text-base!' } }"
        @click="showUploadDialog = true"
      />
      <Dialog
        v-model:visible="showUploadDialog"
        header="上傳檔案"
        position="top"
        blockScroll
        modal
        dismissableMask
        :closeOnEscape="false"
        :draggable="false"
        :pt="{ root: { class: 'min-w-96' } }"
      >
        <FileUpload
          mode="basic"
          name="excel[]"
          :multiple="true"
          :custom-upload="true"
          auto
          choose-icon="bi bi-plus-lg"
          choose-label="選擇檔案"
          :choose-button-props="{
            severity: 'secondary',
            size: 'small',
            fluid: true,
          }"
          accept="text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :maxFileSize="1000000"
          @select="previewUploadFiles"
        />
        <div v-if="uploadFiles.length > 0" class="wrap border-divide radius mt-2 w-full border">
          <div
            v-for="({ name }, index) in uploadFiles"
            :key="index"
            class="flex w-full items-center gap-1"
          >
            <i class="bi bi-files" />
            <span v-text="name" />
            <Button
              size="small"
              rounded
              text
              icon="bi bi-x-lg"
              v-tooltip.top="'移除'"
              :pt="{ root: { class: 'size-7! ml-auto' } }"
              severity="secondary"
              @click="uploadFiles.splice(index, 1)"
            />
          </div>
        </div>
        <template #footer>
          <Button
            size="small"
            label="上傳檔案"
            fluid
            severity="success"
            @click="onFileDirectUpload"
          />
        </template>
      </Dialog>
    </template>
    <UploaderExcel v-model:selected-value="selectedValue" />
    <FloatLabel variant="on">
      <Select
        size="small"
        inputId="sourceExcelList"
        :options="sourceExcelList"
        optionLabel="text"
        optionValue="value"
        class="nodrag nowheel w-full"
        v-model="selectedExcelSource"
      />
      <label for="sourceExcelList" class="form__label">來源檔案</label>
    </FloatLabel>
    <FloatLabel variant="on" v-if="selectedValue || Object.values(sheetsData).length > 0">
      <Select
        size="small"
        inputId="sheetsList"
        :options="sheetsList"
        optionLabel="text"
        optionValue="value"
        class="nodrag nowheel w-full"
        v-model="selectedValue"
      />
      <label for="sheetsList" class="form__label">工作表</label>
    </FloatLabel>
  </LayoutFlowCard>
</template>
