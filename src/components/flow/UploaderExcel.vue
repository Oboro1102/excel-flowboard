<script setup lang="ts">
import { Select, FloatLabel } from 'primevue'
import { ref, toRefs, computed, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    rootClass?: string
  }>(),
  {},
)
const { rootClass } = toRefs(props)
const selectedValue = defineModel<any[] | null>('selectedValue', { required: true })
const fileData = ref({
  type: '',
  name: '',
})
const sheetsData = ref()
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
const selectedSheet = ref<string | null>(null)
const updateSelectedOption = (value: any[]) => {
  selectedValue.value = value
}
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
const onFileDirectUpload = async (event: Event) => {
  const { files } = event.target as HTMLInputElement
  if (!files || !files.length) return
  const { name, type } = files[0]
  Object.assign(fileData.value, { name, type })
  sheetsData.value = await readExcelFile(files[0])
}

watch(selectedSheet, (value) => {
  if (value) updateSelectedOption(sheetsData.value[value])
})
</script>

<template>
  <div class="wrap--gap flex flex-col" :class="rootClass">
    <slot name="header" />
    <label
      class="border-divide radius nodrag animate flex w-full cursor-pointer flex-col items-center gap-2 border p-4 hover:animate-pulse"
    >
      <strong v-if="fileData.name.length > 0" class="text-sm" v-text="fileData.name" />
      <span v-else class="inline-flex gap-2 text-4xl">
        <i class="bi bi-filetype-csv leading-none" />
        <i class="bi bi-filetype-xls leading-none" />
        <i class="bi bi-filetype-xlsx leading-none" />
      </span>
      <span class="text-xs"><strong class="text-main text-sm">點擊</strong>上傳檔案</span>
      <input
        type="file"
        hidden
        multiple
        accept="text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        @change="(event) => onFileDirectUpload(event)"
      />
    </label>
    <FloatLabel variant="on" v-if="sheetsData">
      <Select
        size="small"
        inputId="sheetsList"
        :options="sheetsList"
        optionLabel="text"
        optionValue="value"
        class="nodrag nowheel w-full"
        v-model="selectedSheet"
      />
      <label for="sheetsList" class="form__label">工作表</label>
    </FloatLabel>
  </div>
</template>
