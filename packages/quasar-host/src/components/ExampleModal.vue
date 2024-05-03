<template>
  <ModalWrapper :isOpen="props.isOpen" @hide="closeDialog">
    <div class="container">
      <button @click="() => emit('close')">close</button>
      <RemoteModuleRenderer
        :load-remote-module="loadRemoteModule"
        :remote-props="{}"
      />
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import ModalWrapper from './ModalWrapper.vue';
import RemoteModuleRenderer from './RemoteModuleRenderer.vue';

const loadRemoteModule = async () => {
  const res = (await import('home/Button')).default;
  return res;
};

const props = defineProps<{
  carrier: string;
  isOpen: boolean;
  productId: number;
  onClickInventoryCheck: () => void;
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
