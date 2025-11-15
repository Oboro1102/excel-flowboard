<script setup lang="ts">
import { Button } from 'primevue'
import { ref, computed } from 'vue'
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  useVueFlow,
  type EdgeProps,
} from '@vue-flow/core'
import { OnClickOutside } from '@vueuse/components'

const props = defineProps<EdgeProps>()

const { removeEdges, onEdgeClick } = useVueFlow()

const path = computed(() => getSmoothStepPath(props))
const showPanel = ref(false)
onEdgeClick((params) => {
  const { edge } = params
  if (edge.id === props.id) {
    showPanel.value = true
  }
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <BaseEdge :id="id" :style="style" :path="path[0]" :marker-end="markerEnd" />
  <EdgeLabelRenderer>
    <Transition name="slideDown" mode="out-in">
      <OnClickOutside
        v-if="showPanel"
        @trigger="showPanel = false"
        :style="{
          pointerEvents: 'all',
          position: 'absolute',
          transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
        }"
        class="nodrag nopan"
      >
        <Button
          severity="danger"
          v-tooltip.top="'解除連結'"
          rounded
          size="small"
          icon="bi bi-x-lg"
          :pt="{ root: { class: 'p-0! size-6!' } }"
          @click="removeEdges(id)"
        />
      </OnClickOutside>
    </Transition>
  </EdgeLabelRenderer>
</template>
