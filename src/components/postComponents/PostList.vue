<script setup lang="ts">
import type { Post } from "../../typings/interface/Post";
import PostCard from "./PostCard.vue";
import { useRoute } from "vue-router";

const props = defineProps<{
  Posts: Post[];
}>();
</script>

<template>
  <div class="container" style="max-width: 1000px; margin: 0 auto">
    <div class="column is-full" v-for="post in props.Posts" :key="post.id">
      <PostCard :post="post" />
    </div>
    <router-view />
  </div>
</template>
