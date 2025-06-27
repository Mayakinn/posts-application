<script setup lang="ts">
import PostList from "@/components/postComponents/PostList.vue";
import { getPosts } from "@/api/PostService";
import { type Post } from "@/typings/interface/Post";
import { ref, onMounted } from "vue";

const loading = ref<boolean>(true);
const posts = ref<Post[]>([]);
const empty = ref<boolean>(false);

onMounted(async () => {
  await getPosts().then(function (response) {
    loading.value = false;
    posts.value = response;
    if (posts.value == undefined) {
      empty.value = true;
    }
  });
});
</script>

<template>
  <div class="post">
    <div v-if="loading" class="title">Loading posts information</div>
    <div v-else-if="empty" class="title">Post list is empty</div>
    <div v-else><PostList :Posts="posts" /></div>
  </div>
</template>
