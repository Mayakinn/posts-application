<script setup lang="ts">
import type { Post } from "@/typings/interface/Post";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();

const props = defineProps<{
  post: Post;
}>();

const isPostRoute = computed(() => !!route.params.id);
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
      Author: {{ post.author.name }} {{ post.author.surname }}
      <p>
        Created/Last updated at:
        {{ new Date(post.created_at).toLocaleString() }} <br />
      </p>
    </div>
    <div v-if="isPostRoute">
      <div class="card-content">{{ post.body }}</div>
      <footer class="card-footer">
        <button class="card-footer-item">Edit</button>
        <button class="card-footer-item">Delete</button>
      </footer>
    </div>
  </div>
</template>
