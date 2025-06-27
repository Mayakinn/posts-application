<script setup lang="ts">
import PostList from "@/components/postComponents/PostList.vue";
import { getPosts } from "@/api/PostService";
import { type Post } from "@/typings/interface/Post";
import { ref, onMounted, computed } from "vue";
import Pagination from "@/components/pageComponents/Pagination.vue";

const loading = ref<boolean>(true);
const posts = ref<[Post[], number] | undefined>(undefined);
const empty = ref<boolean>(false);
const totalItems = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const fetchPosts = async (newPage: number) => {
  currentPage.value = newPage;
  const response = await getPosts(currentPage.value, itemsPerPage.value);
  if (response) {
    posts.value = response;
    totalItems.value = response[1];
    loading.value = false;
  } else {
    empty.value = true;
  }
};

onMounted(async () => {
  await fetchPosts(currentPage.value);
});
</script>

<template>
  <div class="post">
    <div v-if="loading" class="title">Loading posts information</div>
    <div v-else-if="empty" class="title">Post list is empty</div>
    <div v-else>
      <PostList :Posts="posts?.[0]" />
      <div class="buttons is-centered mx-5 my-3">
        <Pagination
          :currentPage="currentPage"
          :totalItems="totalItems"
          :itemsPerPage="itemsPerPage"
          @page-change="fetchPosts"
        />
      </div>
    </div>
  </div>
</template>
