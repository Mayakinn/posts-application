<script setup lang="ts">
import type { Post } from "../../typings/interface/Post";
import FormModal from "../modalComponents/FormModal.vue";
import PostCard from "./PostCard.vue";
const props = defineProps<{
  Posts: Post[] | undefined;
}>();
const emit = defineEmits(["delete-pressed-card", "edit-pressed-card"]);

function editPressed(emitted: number | string) {
  emit("edit-pressed-card", emitted);
}

function deletionPressed(emitted: number | string) {
  emit("delete-pressed-card", emitted);
}
</script>

<template>
  <div class="container" style="max-width: 1000px; margin: 0 auto">
    <div class="column is-full" v-for="post in props.Posts" :key="post.id">
      <PostCard
        :post="post"
        @edit-pressed-card="editPressed"
        @delete-pressed-card="deletionPressed"
      />
    </div>
  </div>
</template>
