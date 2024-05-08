<template>
  hasError: {{ hasError }}
  <slot v-if="hasError" name="fallback"></slot>
  <slot v-else></slot>
</template>
<script setup lang="ts">
import { ComponentPublicInstance, ref, onErrorCaptured } from 'vue';

const hasError = ref(false);

// 에러 캡처 시
onErrorCaptured((error: Error, compInst: ComponentPublicInstance | null, errorInfo: any) => {
  hasError.value = true;  
  console.error(error);
});
</script>
  
<style>
  
</style>