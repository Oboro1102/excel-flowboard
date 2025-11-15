<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button, TieredMenu, useToast, Dialog, FloatLabel, Password, Message } from 'primevue'
import { API } from '@/api/index'
const { $reset } = useVueFlow()

const router = useRouter()
const toast = useToast()

const settingModeOn = ref(false)
const openFilesModeOn = ref(false)
const systemMenu = ref()
const systemMenuItems = ref([
  {
    label: '開新檔案',
    icon: 'bi bi-plus-lg',
    command: () => {
      sessionStorage.clear()
      $reset()
    },
  },
  {
    label: '更新密碼',
    icon: 'bi bi-shield-lock',
    command: () => {
      settingModeOn.value = true
    },
  },
  {
    label: '登出',
    icon: 'bi bi-box-arrow-right',
    command: () => {
      sessionStorage.clear()
      router.push({ name: 'Login' })
    },
  },
])
const toggle = (event: any) => {
  systemMenu.value.toggle(event)
}

import { useVueFlow } from '@vue-flow/core'
import { useGlobalStore } from '@/stores/index'
const globalStore = useGlobalStore()
// 表單驗證相關
const showErrorInfo = ref({ personal: false, password: false })
// 更新密碼提交相關
const userId = computed(() => globalStore.userInfo.id)
const password = ref('')
const confirmPassword = ref('')
const apiLoading = ref(false)
const updatePassword = async () => {
  if (
    password.value.length < 1 ||
    (password.value.length > 0 && confirmPassword.value.length < 1) ||
    (password.value.length > 0 && password.value !== confirmPassword.value)
  ) {
    showErrorInfo.value.password = true
    return
  } else {
    showErrorInfo.value.password = false
  }
  try {
    apiLoading.value = true
    const respond = await API.AUTH.POST_UPDATE_PASSWORD({
      id: userId.value,
      password: password.value,
    })
    if (respond.data.success) {
      toast.add({
        severity: 'info',
        summary: '更新密碼',
        detail: '更新成功',
        life: 1500,
      })
      sessionStorage.clear()
      router.push({ name: 'Login' })
    } else {
      toast.add({
        severity: 'warn',
        summary: '更新失敗',
        detail: respond.data.error,
        life: 3000,
      })
    }
    apiLoading.value = false
  } catch (error: any) {
    const { response } = error
    toast.add({
      severity: 'error',
      summary: '請求失敗',
      detail: response.data.message,
      life: 3000,
    })
    apiLoading.value = false
  }
}
</script>

<template>
  <header class="panel top-4 left-4 flex-col whitespace-nowrap">
    <Button
      size="small"
      severity="secondary"
      text
      v-tooltip.right="'系統選單'"
      icon="bi-three-dots-vertical"
      @click="toggle"
    />
    <TieredMenu
      ref="systemMenu"
      :model="systemMenuItems"
      popup
      :pt="{
        root: { class: 'text-sm top-3.5! left-17!' },
        itemContent: { class: 'text-[var(--p-button-text-secondary-color)]!' },
      }"
    />
    <Dialog
      v-model:visible="settingModeOn"
      dismissableMask
      modal
      header="更新密碼"
      :draggable="false"
      position="top"
      :pt="{ root: { class: 'w-full max-w-md' } }"
    >
      <form class="wrap--gap mt-2 flex flex-col" @submit.prevent="updatePassword">
        <FloatLabel variant="on">
          <Password
            inputId="password"
            fluid
            :feedback="false"
            toggleMask
            :invalid="showErrorInfo.password && password.length < 1"
            :inputProps="{ autocomplete: 'false' }"
            v-model="password"
          />
          <label for="password" class="form__label form__label--whitMessage"
            >新密碼<Message
              v-if="showErrorInfo.password && password.length < 1"
              severity="error"
              variant="simple"
              size="small"
              :pt="{ text: { class: '!text-[0.625rem]' } }"
              >請輸入密碼</Message
            ></label
          >
        </FloatLabel>
        <FloatLabel variant="on">
          <Password
            inputId="confirmPassword"
            fluid
            :feedback="false"
            toggleMask
            :invalid="showErrorInfo.password && password.length > 0 && password !== confirmPassword"
            :inputProps="{ autocomplete: 'false' }"
            v-model="confirmPassword"
          />
          <label for="password" class="form__label form__label--whitMessage"
            >確認密碼<Message
              v-if="showErrorInfo.password && password.length > 0 && password !== confirmPassword"
              severity="error"
              variant="simple"
              size="small"
              :pt="{ text: { class: '!text-[0.625rem]' } }"
              >密碼不一致請重新輸入</Message
            ></label
          >
        </FloatLabel>
      </form>
      <template #footer>
        <Button
          label="關閉"
          text
          size="small"
          severity="secondary"
          @click="settingModeOn = false"
          autofocus
        />
        <Button
          label="更新"
          size="small"
          :disabled="apiLoading"
          @click="updatePassword"
          autofocus
        />
      </template>
    </Dialog>
  </header>
</template>
