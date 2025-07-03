<script setup lang="ts">
import { deletePost } from "@/api/PostService";

const props = defineProps<{
  postId: number | string;
}>();
const emit = defineEmits(["close-pressed"]);

async function handleDelete(postId: number | string) {
  await deletePost(postId);
  emit("close-pressed");
}
</script>

<template>
  <header class="modal-card-head">
    <p class="modal-card-title">Are you sure you want to delete the post?</p>
  </header>
  <footer class="modal-card-foot">
    <button @click="handleDelete(postId)" class="button is-primary">
      Delete post
    </button>
  </footer>
</template>
