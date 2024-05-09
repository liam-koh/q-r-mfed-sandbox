<template>
  <ModalWrapper :isOpen="props.isOpen" @hide="closeDialog">
    <div class="container">
      <button @click="() => emit('close')">close</button>
      <RemoteModuleRenderer :load-remote-module="loadRemoteModule" :props="{
        inputValue: input,
      }">
        <template #loading>
          <div>Loading...</div>
        </template>
        <template #error>
          <div>Error...</div>
        </template>
      </RemoteModuleRenderer>
      <input v-model="input" />
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import ModalWrapper from './ModalWrapper.vue';
const RemoteModuleRenderer = defineAsyncComponent(() => import('./RemoteModuleRenderer.vue'));

const loadRemoteModule = async () => {
  const res = (await import('home/Button')).default;
  return res;
};

const input = ref('');

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close', 'selectDevice']);

// 모달창 닫기
const closeDialog = () => {
  emit('close');
};

defineComponent({
  name: 'SelectDevice',
});
</script>

<style>
.container {
  background-color: white;
}
</style>
