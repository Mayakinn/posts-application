<script setup lang="ts">
const props = defineProps<{
  isActive: Boolean;
}>();

const emit = defineEmits(["close-modal"]);
</script>
<template>
  <div :class="['modal', { 'is-active': isActive }]">
    <div class="modal-background">
      <div class="modal-card">
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
