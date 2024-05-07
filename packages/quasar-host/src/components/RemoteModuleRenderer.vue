<template>
  <div v-if="error">
    <p>module load failed</p>
  </div>
  <div v-else ref="root"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onUpdated, watch } from 'vue';
import ReactDOM from 'react-dom';
import { Root, createRoot } from 'react-dom/client';
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

const reactRoot = ref<Root | null>(null);
const root = ref(null);
const error = ref<Error>(); // error 저장
const remoteModule = ref<Root | null>(null); // entry의 react module str

const updateReactComponent = () => {
  console.log('$$$$ update', root.value);
  if (!!error.value || !remoteModule.value) return;

  if (!reactRoot.value) {
    reactRoot.value = createRoot(root.value);
  }
  reactRoot.value.render(
    React.createElement(remoteModule.value, {
      props: {
        ...props,
      },
    })
  );
};

onMounted(() => {
  if (remoteModule.value) return;
  props
    .loadRemoteModule()
    .then((b: any) => {
      remoteModule.value = b;
      updateReactComponent();
    })
    .catch((e: Error) => {
      console.error('Remote Module Load Error ', e);
      error.value = e;
    });
});

watch(() => props, updateReactComponent);

onBeforeUnmount(() => {
  root.value && ReactDOM.unmountComponentAtNode(root.value);
  reactRoot.value && reactRoot.value.unmount();
  reactRoot.value = null;
});
</script>
<style>
/* .module-container {
  display: inline-flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  justify-content: center;
} */
</style>
