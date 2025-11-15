<script setup lang="ts">
import LayoutFlowCard from '@/layout/LayoutFlowCard.vue'
import { Button, Select, FloatLabel, useToast } from 'primevue'
import ApexCharts from 'apexcharts'
import { ref, toRefs, computed, watch, onMounted } from 'vue'
import { Handle, Position, useNodeConnections, useNodesData, useVueFlow } from '@vue-flow/core'
import { useTimeoutFn } from '@vueuse/core'
import { handlerStyleIn } from '@/utils/dataMap'
import { generateRandomColor } from '@/utils/commonFunction'

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

const connections = useNodeConnections({
  handleType: 'target',
})
const sourceData = useNodesData(() => connections.value.map((connection) => connection.source))
const isValidConnection = computed(() =>
  sourceData.value.length > 0
    ? sourceData.value[0]?.type === 'FlowCardExcel' && sourceData.value[0].data.output
    : false,
)
// 圖表相關
const chartConfig = ref({ type: '', x: '', y: '' })
const chartType = ref([
  {
    value: 'line',
    text: '線條圖',
  },
  {
    value: 'bar',
    text: '長條圖',
  },
  {
    value: 'pie',
    text: '圓餅圖',
  },
])
const linkDataSource = computed(() => sourceData.value[0]?.data.sheetSource.selectedSheet)
const columnOptions = computed(() =>
  sourceData.value[0]
    ? Object.keys(linkDataSource.value[0]).map((item) => ({
        text: item,
        value: item,
      }))
    : [],
)
const chartStageVisible = ref(false)
const chartStage = ref()
const chart = ref()
const toast = useToast()
const generateChart = () => {
  const { type, x, y } = chartConfig.value
  if (
    type.length < 1 ||
    (type.length > 0 && type !== 'pie' && (x.length < 1 || y.length < 1)) ||
    (type === 'pie' && x.length < 1)
  ) {
    toast.add({
      severity: 'warn',
      summary: '圖表產生失敗',
      detail: '請完成圖表設定',
      life: 1500,
    })
    return
  }
  const options = {
    series: ['bar', 'line'].includes(type)
      ? [
          {
            name: y,
            data: linkDataSource.value.map((item: { [y: string]: number }) => item[y]),
          },
        ]
      : linkDataSource.value.map((item: { [x: string]: number }) => item[x]),
    labels: ['pie'].includes(type) ? linkDataSource.value.map(() => x) : [],
    legend: {
      show: false,
    },
    chart: {
      type: type,
      height: 300,
      fontFamily: 'Noto Sans TC',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: generateRandomColor(
      ['pie'].includes(type)
        ? linkDataSource.value.map((item: { [x: string]: number }) => item[x]).length
        : 1,
    ),
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 1.5,
    },
    grid: {
      borderColor: 'var(--color-siteBg)',
    },
    xaxis: {
      categories: linkDataSource.value.map((item: { [x: string]: number }) => item[x]),
      title: {
        text: x,
        style: {
          fontFamily: 'Noto Sans TC',
          cssClass: 'text-xs font-medium',
        },
      },
    },
    yaxis: {
      title: {
        text: y,
        style: {
          fontFamily: 'Noto Sans TC',
          cssClass: 'text-xs font-medium',
        },
      },
    },
  }
  const { start } = useTimeoutFn(() => {
    if (chart.value) {
      chart.value.updateOptions(options)
    } else {
      chart.value = new ApexCharts(chartStage.value, options)
      chart.value.render()
    }
  }, 25)
  chartStageVisible.value = true
  start()
  updateNodeData(id.value, { chartData: { config: chartConfig.value } })
}

watch(connections, () => {
  Object.assign(chartConfig.value, { type: '', x: '', y: '' })
  chartStage.value = undefined
  chartStageVisible.value = false
})

// 存檔相關
import { useGlobalStore } from '@/stores/index'
const globalStore = useGlobalStore()
const existNodeData = computed(() =>
  globalStore.boardConfigData
    ? globalStore.boardConfigData.nodes.find((item: { id: string }) => item.id === id.value)
    : null,
)
onMounted(async () => {
  if (existNodeData.value) {
    const { config } = existNodeData.value.data.chartData
    Object.assign(chartConfig.value, config)
    generateChart()
  }
})
</script>

<template>
  <LayoutFlowCard :node-id="id" title="圖表檢視">
    <template #targetHandle>
      <div class="relative">
        <Handle
          type="target"
          v-tooltip.left="'內容接收'"
          :connectable="1"
          :position="Position.Left"
          :style="handlerStyleIn"
        />
      </div>
    </template>
    <template #titleAdditional>
      <span
        v-if="sourceData.length > 0 && sourceData[0]?.type !== 'FlowCardExcel'"
        class="text-error text-xs"
        >連結元件類型錯誤，請連結Excel 資料庫元件</span
      >
      <span v-if="columnOptions.length < 1" class="text-error text-xs"
        >請先設定 Excel 資料庫的工作表並進行節點的連接</span
      >
    </template>
    <div class="wrap--gap grid grid-cols-2">
      <FloatLabel variant="on" :pt="{ root: { class: 'col-span-2' } }">
        <Select
          size="small"
          inputId="chartType"
          :options="chartType"
          optionLabel="text"
          optionValue="value"
          :pt="{ root: { class: 'nodrag nowheel w-full' } }"
          :disabled="!isValidConnection"
          v-model="chartConfig.type"
        />
        <label for="chartType" class="form__label">圖表類型</label>
      </FloatLabel>
      <FloatLabel
        v-if="['bar', 'line', 'pie'].includes(chartConfig.type)"
        variant="on"
        :pt="{ root: { class: ['pie'].includes(chartConfig.type) && 'col-span-2' } }"
      >
        <Select
          size="small"
          inputId="chartConfigX"
          :options="columnOptions.filter((item) => item.value !== chartConfig.y)"
          optionLabel="text"
          optionValue="value"
          :pt="{ root: { class: 'nodrag nowheel w-full' } }"
          v-model="chartConfig.x"
        />
        <label for="chartConfigX" class="form__label">{{
          `維度${['bar', 'line'].includes(chartConfig.type) ? '（X 軸）' : ''}`
        }}</label>
      </FloatLabel>
      <FloatLabel
        v-if="['bar', 'line'].includes(chartConfig.type)"
        variant="on"
        :pt="{ root: { class: ['pie'].includes(chartConfig.type) && 'col-span-2' } }"
      >
        <Select
          size="small"
          inputId="chartConfigY"
          :options="columnOptions.filter((item) => item.value !== chartConfig.x)"
          optionLabel="text"
          optionValue="value"
          :pt="{ root: { class: 'nodrag nowheel w-full' } }"
          v-model="chartConfig.y"
        />
        <label for="chartConfigY" class="form__label">{{
          `指標${['bar', 'line'].includes(chartConfig.type) ? '（Y 軸）' : ''}`
        }}</label>
      </FloatLabel>
    </div>
    <div
      v-show="chartStageVisible"
      ref="chartStage"
      class="nodrag nowheel border-divide radius w-136 border pr-4 pl-2"
    />
    <Button
      size="small"
      label="產生圖表"
      icon="bi bi-stars"
      :disabled="!isValidConnection"
      @click="generateChart"
    />
  </LayoutFlowCard>
</template>
