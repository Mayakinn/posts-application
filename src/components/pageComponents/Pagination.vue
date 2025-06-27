<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, onMounted } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["page-change"]);

const pages = ref<number[]>([]);

const calculatePages = () => {
  const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);
  pages.value = [];
  const startPage = Math.max(1, props.currentPage - 5);
  const endPage = Math.min(props.currentPage + 5, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pages.value.push(i);
  }
};

onMounted(() => {
  calculatePages();
});

watch([() => props.currentPage, () => props.totalItems], () => {
  calculatePages();
});

const changePage = (page: number) => {
  emit("page-change", page);
};
</script>

<template>
  <div>
    <button
      class="button"
      :disabled="props.currentPage === 1"
      @click="changePage(props.currentPage - 1)"
    >
      Previous
    </button>

    <span v-for="page in pages" :key="page">
      <button
        class="button"
        :class="{ 'button is-primary': page === props.currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </span>

    <button
      class="button"
      :disabled="
        props.currentPage === Math.ceil(props.totalItems / props.itemsPerPage)
      "
      @click="changePage(props.currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>
