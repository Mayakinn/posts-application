<script setup lang="ts">
import { computed } from "vue";
import type { Post } from "../../typings/interface/Post";
import PostCard from "./PostCard.vue";
import { useRoute } from "vue-router";
const route = useRoute();

const props = defineProps<{
  Posts: Post[];
}>();

const isPostRoute = computed(() => !!route.params.id);
</script>

<template>
  <div class="container" style="max-width: 1000px; margin: 0 auto">
    <div v-if="!isPostRoute" class="columns is-multiline is-centered">
      <div class="column is-full" v-for="post in props.Posts" :key="post.id">
        <PostCard :post="post" />
      </div>
    </div>

    <router-view />
  </div>
</template>
