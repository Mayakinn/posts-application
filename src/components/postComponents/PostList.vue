<script setup lang="ts">
import type { Post } from "../../typings/interface/Post";
import PostCard from "./PostCard.vue";

const props = defineProps<{
  Posts: Post[];
}>();
</script>

<template>
  <div class="container" style="max-width: 1000px; margin: 0 auto">
    <div class="columns is-multiline is-centered">
      <div class="column is-full" v-for="post in props.Posts">
        <div key="author.id">
          <PostCard :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>
