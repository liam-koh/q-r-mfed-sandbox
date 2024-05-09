<template>
  <div class="layout-app">
    <!-- host app HOST-->
    <div class="app-label"># Hosting App [HOST]</div>
    <h1>Layout App 1</h1>
    <div class="remote-component">
      <!-- remote-component REMOTE -->
      <div class="app-label">#remote-component [REMOTE]</div>
      <RemoteModuleRenderer
        :load-remote-module="loadRemoteModule"
        :props="{
          inputValue: '',
        }"
      >
        <template #loading>
          <div>Loading...</div>
        </template>
        <template #error>
          <div>Error...</div>
        </template>
      </RemoteModuleRenderer>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const RemoteModuleRenderer = defineAsyncComponent(() =>
  import('./RemoteModuleRenderer.vue'),
);

const loadRemoteModule = async () => {
  const res = (await import('home/Button')).default;
  return res;
};
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
.remote-component {
  border: 1px solid blue;
  padding: 10px;
}
.layout-app {
  border: 1px solid green;
  padding: 10px;
}
.app-label {
  padding: 5px 2px;
  font-style: italic;
  font-size: 20px;
  color: gray;
}
</style>
