<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  currentSearchTerm: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["query-change"]);

const searchTerm = ref<string>("");

watch(() => props.currentSearchTerm, (newVal) => {
  searchTerm.value = newVal || "";
}, { immediate: true });

const updateSearchTerm = () => {
  emit("query-change", searchTerm.value);
};
</script>

<template>
  <div class="columns is-centered">
    <input v-model="searchTerm" type="text" class="input is-primary is-rounded"
      style="max-width: 1000px; margin-top: 2rem" @keyup.enter="updateSearchTerm" />

  </div>
  <button @click="updateSearchTerm" class="button is-primary">
    Search
  </button>
</template>