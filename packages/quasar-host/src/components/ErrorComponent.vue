<template>
  <div>
    <h1>Counter: {{ count }}</h1>
    <div v-if="count > 3">
      {{ count.map((item) => item.create()) }}
    </div>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 10px;
}
button {
  padding: 5px 10px;
  margin-right: 10px;
}
</style>
