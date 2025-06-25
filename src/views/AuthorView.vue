<script setup lang="ts">
import { onMounted, ref } from "vue";
import { type Author } from "@/typings/interface/Author";
import { getAuthors } from "@/api/AuthorService";
import AuthorList from "@/components/authorComponents/AuthorList.vue";

const loading = ref<boolean>(true);
const authors = ref<Author[]>([]);

onMounted(async () => {
  authors.value = await getAuthors();
});
</script>

<template>
  <div class="Author">
    <h1>This is an Author page</h1>
    <AuthorList :Authors="authors" />
  </div>
</template>

<style></style>
