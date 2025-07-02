<script setup lang="ts">
import { deleteAuthor } from "@/api/AuthorService";

const props = defineProps<{
  authorId: number;
}>();
const emit = defineEmits(["close-pressed"]);

async function handleDelete(authorId: number) {
  await deleteAuthor(authorId);
  emit("close-pressed");
}
</script>

<template>
  <header class="modal-card-head">
    <p class="modal-card-title">Are you sure you want to delete an author?</p>
  </header>
  <footer class="modal-card-foot">
    <button @click="handleDelete(authorId)" class="button is-primary">
      Delete Author
    </button>
  </footer>
</template>
