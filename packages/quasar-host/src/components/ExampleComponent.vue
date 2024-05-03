<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
    <button
      @click="
        () => {
          openModal = true;
        }
      "
    >
      open modal
    </button>

    <ExampleModal
      :isOpen="openModal"
      @close="
        () => {
          openModal = false;
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Todo, Meta } from './models';
import RemoteModuleRenderer from './RemoteModuleRenderer.vue';
import ExampleModal from './ExampleModal.vue';

const loadRemoteModule = async () => {
  const res = (await import('home/Button')).default;
  return res;
};

const openModal = ref(false);

interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  todos: () => [],
});

const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}

const todoCount = computed(() => props.todos.length);
</script>
