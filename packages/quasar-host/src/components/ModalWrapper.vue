<template>
  <q-dialog
    v-model="isOpen"
    :full-width="true"
    @update:model-value="
      (value) => {
        if (!value) hideAction();
      }
    "
  >
    <div class="discount-container">
      <slot></slot>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, defineComponent, defineProps } from 'vue';

interface IProps {
  isOpen: boolean;
}

const emit = defineEmits(['hide']);

const isOpen = computed(() => props.isOpen);

const hideAction = () => {
  emit('hide');
};

const props = defineProps<IProps>();
</script>

<style scoped>
/* .discount-container {
  font-size: 0.83vw;
  display: flex;
  flex-direction: column;
  align-items: center;
} */
.discount-container {
  width: auto !important;
  height: -webkit-fill-available;
  display: flex;
  align-items: center;
  font-size: 0.83vw;
}

/* .q-dialog--modal :deep(.q-dialog__backdrop) {
  background: rgba(0, 0, 0, 0.2);
} */
</style>
