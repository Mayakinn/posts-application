<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import _ from "lodash";

const emit = defineEmits(["query-change"]);

const searchTerm = ref<string>("");

const updateSearchTerm = _.debounce(() => {
  emit("query-change", searchTerm.value);
}, 1000);
</script>

<template>
  <div class="columns is-centered">
    <input
      v-model="searchTerm"
      type="text"
      class="input is-primary is-rounded"
      style="max-width: 1000px; margin-top: 2rem"
      @input="updateSearchTerm"
    />
  </div>
</template>
