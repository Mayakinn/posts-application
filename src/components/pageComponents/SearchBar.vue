<script setup lang="ts">
const props = defineProps({
  currentSearchTerm: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="columns is-centered">
    <input
      type="text"
      class="input is-primary is-rounded"
      style="max-width: 1000px; margin-top: 2rem auto"
    />
  </div>
</template>
