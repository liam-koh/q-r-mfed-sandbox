<template>
  <div v-if="error">
    <p>module load failed</p>
  </div>
  <div v-else ref="root"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onUpdated, watch } from 'vue';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import React from 'react';

/**
 * React Remote Module props
 * @param remoteProps: remote 컴포넌트로 전달할 props
 * @param loadRemoteModule: module load 함수
 */
const props = defineProps({
  remoteProps: {
    type: Object,
    required: true,
  },
  loadRemoteModule: {
    type: Function,
    required: true,
  },
});

const reactRoot = ref(null);
const root = ref(null);
const error = ref(null);
const ReactComponent = ref(null);

function updateReactComponent() {
  console.log('$$$$ update');
  if (!!error.value || !ReactComponent.value) return;
  const { remoteProps } = props;

  if (!reactRoot.value) {
    reactRoot.value = createRoot(root.value!);
  }
  reactRoot.value.render(
    React.createElement(ReactComponent.value, {
      remoteProps: {
        ...remoteProps,
      },
    }),
  );
}

function unmountReactComponent() {
  console.log('$$$$ unmount');
  root.value && ReactDOM.unmountComponentAtNode(root.value);
  reactRoot.value && reactRoot.value.unmount();
  reactRoot.value = null;
}

onMounted(() => {
  console.log('$$$$ mounted');
  updateReactComponent();

});
onUpdated(() => {
  console.log('$$$$ updated');
  updateReactComponent();
});

onBeforeUnmount(unmountReactComponent);

if (props.loadRemoteModule) {
  props
    .loadRemoteModule()
    .then((b: any) => {
      ReactComponent.value = b;
      updateReactComponent();
    })
    .catch((e: any) => {
      console.error('Remote Module Load Error ', e);
      error.value = e;
    });
}
</script>
<style>
/* .module-container {
  display: inline-flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  justify-content: center;
} */
</style>
