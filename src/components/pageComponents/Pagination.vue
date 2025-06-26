<script setup lang="ts">
import { computed, ref } from "vue";

const emit = defineEmits<{
  (PaginatedData: any[]): void;
}>();
const props = defineProps<{
  data: any[];
}>();

const currentPage = ref<number>(1);

const itemsPerPage = 2;

const totalPages = computed(() => Math.ceil(props.data.length / itemsPerPage));

const paginated = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return props.data.slice(start, start + itemsPerPage);
});
</script>

<template>
  <button
    class="button"
    v-for="page in totalPages"
    :key="page"
    :class="{ 'is-primary': currentPage === page }"
    @click="
      ((currentPage = page),
      $emit('PaginatedData', paginated),
      console.log('meow meow emitted'))
    "
  >
    {{ page }}
  </button>
</template>
