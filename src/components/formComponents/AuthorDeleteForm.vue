<script setup lang="ts">
import { deleteAuthor } from "@/api/AuthorService";
import { ref } from "vue";

const props = defineProps<{
  authorId: number | string;
}>();
const emit = defineEmits(["close-pressed"]);
const flag = ref<boolean>(true);

async function handleDelete(authorId: number | string) {
  const response = await deleteAuthor(authorId);
  if (response == null) {
    emit("close-pressed", flag.value);
    return;
  }
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
