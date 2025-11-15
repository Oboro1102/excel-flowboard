import { ref } from 'vue'
import { defineStore } from 'pinia'
import { decodeString } from '@/utils/commonFunction.ts'

export const useGlobalStore = defineStore('global', () => {
  const userInfo = ref(
    sessionStorage.getItem('a7b3c9d1e5f8')
      ? decodeString(sessionStorage.getItem('a7b3c9d1e5f8') as string, 'z2y8x4w6v1u9')
      : '',
  )
  const updateUser = () => {
    userInfo.value = decodeString(sessionStorage.getItem('a7b3c9d1e5f8') as string, 'z2y8x4w6v1u9')
  }
  return {
    userInfo,
    updateUser,
  }
})
