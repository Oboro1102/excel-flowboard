<script setup lang="ts">
import { ref, toRefs } from 'vue'
const props = withDefaults(
  defineProps<{
    customizeClass?: string
    type?: 'button' | 'submit' | 'reset'
    label?: string
    icon?: string
    loading?: boolean
    disabled?: boolean
    draggable?: boolean
    outlined?: boolean
    text?: boolean
    severity?: 'danger' | 'warn' | 'success' | 'secondary'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    type: 'button',
    label: '',
    outlined: false,
    loading: false,
    draggable: false,
    disabled: false,
    text: false,
    size: 'sm',
  },
)
const { customizeClass, severity, icon, type, label, draggable, disabled, text, size } =
  toRefs(props)
const emit = defineEmits(['click'])
const clickAction = () => {
  emit('click')
}
const severityList = ref<{
  danger: string
  warn: string
  success: string
  secondary: string
}>({
  danger: `${text.value ? 'text-error' : 'bg-error'} hover:bg-errorLight disabled:bg-error'`,
  warn: `${text.value ? 'text-warning' : 'bg-warning'} hover:bg-warningLight disabled:bg-warning'`,
  success: `${text.value ? 'text-success' : 'bg-success'} hover:bg-successLight disabled:bg-success'`,
  secondary: `${text.value ? 'text-secondary' : 'bg-secondary'} hover:bg-secondaryLight disabled:bg-secondary'`,
})
</script>

<template>
  <button
    :type="type"
    class="animate flex items-center justify-center disabled:opacity-35"
    :class="[
      size === 'sm'
        ? 'px-2 py-1 text-[0.8125rem]'
        : size === 'md'
          ? 'px-4 py-2 text-sm'
          : 'px-5 py-3 text-base',
      text ? 'hover:text-white' : 'text-white',
      icon && label.length > 0 && 'gap-1.5',
      outlined ? 'rounded-full' : 'radius',
      severity
        ? severityList[severity]
        : `${text ? 'text-secondary' : 'bg-main'} hover:bg-mainLight disabled:bg-main`,
      customizeClass,
    ]"
    :disabled="disabled"
    :draggable="draggable"
    @click="clickAction"
  >
    <slot />
    <i v-if="icon" class="leading-none" :class="icon" />
    <span v-if="loading" class="loading" />
    <span v-text="label" />
  </button>
</template>
