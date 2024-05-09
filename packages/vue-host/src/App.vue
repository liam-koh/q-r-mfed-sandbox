<template>
  <div>
    <!-- <RemoteModuleRenderer
      :loadRemoteModule="loadRemoteModule"
      :props="{
        inputValue: input,
      }"
    >
      <template #loading>
        <div>Loading...</div>
      </template>
      <template #error>
        <div>Error...</div>
      </template>
    </RemoteModuleRenderer> -->
  </div>
</template>
<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue';
// const RemoteModuleRenderer = defineAsyncComponent(
//   () => import('./RemoteModuleRenderer.vue'),
// );

const loadRemoteModule = async () => {
  const res = (await import('home/Button')).default;
  return res;
};

var _defineComponent = defineComponent({
  name: 'App',
});

export default _defineComponent;
</script>
