<template>
  <div>lazy component {{ res }}</div>
  <slot></slot>
</template>
  
<script setup lang='ts'>

const props = defineProps<{
  res: string;
  timout: number;
}>();

// await for 1 second
const res = await new Promise((resolve) => setTimeout(() => resolve(props.res), props.timout));
</script>
  
<style>
  
</style>