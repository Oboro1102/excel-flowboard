<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { FloatLabel, InputText, Password, Button, Message, useToast } from 'primevue'
import { API } from '@/api/index'
import { encodeString } from '@/utils/commonFunction.ts'
import LayoutLogin from '@/layout/LayoutLogin.vue'

const toast = useToast()
const router = useRouter()

const user = ref({
  account: 'odt123',
  password: '1q2w3e4r',
})
// 表單驗證相關
const lockFormSubmit = computed(
  () => user.value.password.length < 1 || user.value.account.length < 1,
)
const showErrorInfo = ref(false)
const validateForm = (key: string) => {
  const errorMessage: { [index: string]: string } = {
    account: [user.value.account.length < 1 ? '請輸入帳號' : ''].join(' ').trim(),
    password: [user.value.password.length < 1 ? '請輸入密碼' : ''].join(' ').trim(),
  }
  return errorMessage[key]
}
// 表單提交相關
import { useGlobalStore } from '@/stores/index'
const globalStore = useGlobalStore()
const loading = ref(false)
const login = async () => {
  if (lockFormSubmit.value) {
    showErrorInfo.value = true
    return
  } else {
    showErrorInfo.value = false
  }
  try {
    loading.value = true
    const loginInfo = await API.AUTH.POST_LOGIN(user.value)
    const { data } = loginInfo.data
    const key = crypto.randomUUID()
    sessionStorage.setItem('z2y8x4w6v1u9', key)
    sessionStorage.setItem('a7b3c9d1e5f8', encodeString(data, key))
    globalStore.updateUser()
    loading.value = false
    return router.push({ name: 'Index' })
  } catch (error: any) {
    const { response } = error
    toast.add({
      severity: 'error',
      summary: '登入異常',
      detail: response.data.message,
      life: 3000,
    })
    loading.value = false
  }
}
</script>

<template>
  <LayoutLogin>
    <template #form>
      <form class="wrap--gap flex flex-col" @submit.prevent="login">
        <FloatLabel variant="on">
          <InputText
            id="username"
            fluid
            autocomplete="true"
            :invalid="showErrorInfo && validateForm('account')!.length > 0"
            v-model="user.account"
          />
          <label for="username" class="form__label form__label--whitMessage">
            <i class="bi bi-person"></i>
            <span>帳號</span>
            <Message
              v-if="showErrorInfo && validateForm('account')!.length > 0"
              severity="error"
              variant="simple"
              size="small"
              :pt="{ text: { class: '!text-[0.625rem]' } }"
              >{{ validateForm('account') }}</Message
            >
          </label>
        </FloatLabel>
        <FloatLabel variant="on">
          <Password
            inputId="password"
            fluid
            :feedback="false"
            toggleMask
            :inputProps="{ autocomplete: 'false' }"
            :invalid="showErrorInfo && validateForm('password')!.length > 0"
            v-model="user.password"
          />
          <label for="password" class="form__label form__label--whitMessage">
            <i class="bi bi-key"></i>
            <span>密碼</span>
            <Message
              v-if="showErrorInfo && validateForm('password')!.length > 0"
              severity="error"
              variant="simple"
              size="small"
              :pt="{ text: { class: '!text-[0.625rem]' } }"
              >{{ validateForm('password') }}</Message
            >
          </label>
        </FloatLabel>
        <div class="flex items-center justify-end">
          <Button
            size="small"
            text
            severity="secondary"
            :pt="{ root: { class: 'text-xs!' } }"
            label="會員註冊"
            @click="router.push({ name: 'Register' })"
          />
        </div>
        <Button type="submit" label="登入" :loading="loading" />
      </form>
    </template>
  </LayoutLogin>
</template>
