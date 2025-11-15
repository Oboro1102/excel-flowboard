<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from 'primevue'
import LoadingArea from '@/components/LoadingArea.vue'
const LayoutLogin = defineAsyncComponent({
  loader: () => import('@/layout/LayoutLogin.vue'),
  loadingComponent: LoadingArea,
})
const router = useRouter()
</script>

<template>
  <LayoutLogin :show-logo="false">
    <template #form>
      <div class="wrap--gap flex flex-col">
        <h1
          class="from-main to-sub bg-gradient-to-br bg-clip-text text-center text-7xl! leading-relaxed font-black! text-transparent"
        >
          Oops!
        </h1>
        <p class="text-2xl font-medium">
          您欲前往的頁面<strong class="text-error">不存在</strong>或<strong class="text-error"
            >無權訪問</strong
          >，如有問題請聯絡管理員<span class="inline-block rotate-[10deg]">！</span>
        </p>
        <Button label="回到首頁" @click="router.push({ name: 'Index' })" />
      </div>
    </template>
  </LayoutLogin>
</template>
