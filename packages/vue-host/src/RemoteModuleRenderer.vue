<template>
  <div v-if="error" class="mfed-container">
    <slot name="error" />
  </div>
  <div v-else-if="isLoading" class="mfed-container">
    <slot name="loading" />
  </div>
  <div ref="root" class="mfed-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, onUpdated, watch } from 'vue';
import { createRoot } from 'react-dom/client';
import React from 'react';

/**
 * React Remote Module props
 * @param props: remote 컴포넌트로 전달할 props
 * @param loadRemoteModule: module load 함수
 */
const props = defineProps({
  props: {
    type: Object,
    required: true,
  },
  loadRemoteModule: {
    type: Function,
    required: true,
  },
});

const reactRoot = ref(null); // react root
const root = ref(null);
const error = ref(); // error 저장
const remoteModule = ref(null); // entry의 react module str
const isLoading = ref(true);

const updateReactComponent = () => {
  console.log('$$$$ update', root.value);
  if (!!error.value || !remoteModule.value || !root.value) return;

  if (!reactRoot.value) {
    reactRoot.value = createRoot(root.value); // bundle의 element를 넣음
  }
  // root에서 컴포넌트 초기화 진행
  reactRoot.value.render(
    // TODO: update시에도 써도 되는지 체크
    React.createElement(remoteModule.value, {
      ...props.props,
    })
  );
};

onMounted(() => {
  if (remoteModule.value) return;
  props
    .loadRemoteModule()
    .then((b) => {
      remoteModule.value = b;
      updateReactComponent();
    })
    .catch((e) => {
      console.error('Remote Module Load Error ', e);
      error.value = e;
    })
    .finally(() => {
      isLoading.value = false;
    });
});

watch(() => props.props, updateReactComponent, { deep: true, immediate: true });

onBeforeUnmount(() => {
  reactRoot.value && reactRoot.value.unmount();
  reactRoot.value = null;
});
</script>
<style scoped>
.mfed-container {
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
