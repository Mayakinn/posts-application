<script setup lang="ts">
import type { Post } from "@/typings/interface/Post";
import { computed } from "vue";

const props = defineProps<{
  post: Post;
}>();

const createdOrUpdatedDate = computed(() => {
  return new Date(props.post.created_at) >= new Date(props.post.updated_at)
    ? `Created at: ${new Date(props.post.created_at).toLocaleString()}`
    : `Last update at: ${new Date(props.post.updated_at).toLocaleString()}`;
});
</script>
<template>
  <div class="card" @click="() => console.log('going to post')">
    <header class="card-header">
      <p class="card-header-title">{{ post.title }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        Author: {{ post.author.name }} {{ post.author.surname }}
      </div>
      <p>{{ createdOrUpdatedDate }} <br /></p>
    </div>
    <footer class="card-footer">
      <button class="card-footer-item">Edit</button>
      <button class="card-footer-item">Delete</button>
    </footer>
  </div>
</template>
