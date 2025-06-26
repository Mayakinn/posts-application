<script setup lang="ts">
import type { Post } from "@/typings/interface/Post";
import { useRouter } from "vue-router";

const props = defineProps<{
  post: Post;
}>();

const router = useRouter();
</script>
<template>
  <div
    class="card"
    @click="router.push({ name: 'post', params: { id: post.id } })"
  >
    <header class="card-header">
      <p class="card-header-title">{{ post.title }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        Author: {{ post.author.name }} {{ post.author.surname }}
      </div>
      <p>
        Created/Last updated at:
        {{ new Date(post.created_at).toLocaleString() }} <br />
      </p>
    </div>
    <footer class="card-footer">
      <button class="card-footer-item">Edit</button>
      <button class="card-footer-item">Delete</button>
    </footer>
  </div>
</template>
