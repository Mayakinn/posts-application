<script setup lang="ts">
const props = defineProps<{
  isActive: boolean;
}>();

const emit = defineEmits(["close-modal"]);
</script>
<template>
  <div v-show="isActive" class="modal">
    <div class="modal-background">
      <div class="modal-content">
        <slot></slot>
      </div>
      <button
        @click="() => emit('close-modal')"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  </div>
</template>
