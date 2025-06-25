<script setup lang="ts">
import { onMounted, ref } from "vue";
import { type Author } from "@/typings/interface/Author";
import { getAuthors } from "@/api/AuthorService";
import AuthorList from "@/components/authorComponents/AuthorList.vue";

const loading = ref<boolean>(true);
const authors = ref<Author[]>([]);

onMounted(async () => {
  await getAuthors().then(function (response) {
    loading.value = false;
    authors.value = response;
  });
});
</script>

<template>
  <div class="Author">
    <div v-if="loading" class="title">Loading author information</div>
    <div v-else><AuthorList :Authors="authors" /></div>
  </div>
</template>

<style></style>
