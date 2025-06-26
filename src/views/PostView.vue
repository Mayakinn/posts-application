<script setup lang="ts">
import PostCard from "@/components/postComponents/PostCard.vue";
import type { Post } from "@/typings/interface/Post";
import { onMounted, ref } from "vue";
import { getPost } from "@/api/PostService";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(true);
const empty = ref<boolean>(false);
const singlePost = ref<Post>();

const handleBackClick = () => {
  router.go(-1);
};

onMounted(async () => {
  const id = route.params.id as string;
  try {
    const response = await getPost(id);
    singlePost.value = response;
    empty.value = !response;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <button @click="handleBackClick()" class="button is-primary">
    < Go back
  </button>
  <PostCard v-if="singlePost" :post="singlePost" />
  <div v-else>Loading.....</div>
</template>
