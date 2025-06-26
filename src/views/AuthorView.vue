<script setup lang="ts">
import { onMounted, ref } from "vue";
import { type Author } from "@/typings/interface/Author";
import { getAuthors } from "@/api/AuthorService";
import AuthorList from "@/components/authorComponents/AuthorList.vue";
import Pagination from "@/components/pageComponents/Pagination.vue";

const loading = ref<boolean>(true);
const empty = ref<boolean>(false);
const authors = ref<Author[]>([]);

onMounted(async () => {
  await getAuthors().then(function (response) {
    loading.value = false;
    authors.value = response;
    if (authors.value == undefined) {
      empty.value = true;
    }
  });
});
</script>

<template>
  <div class="Author">
    <div v-if="loading" class="title">Loading author information</div>
    <div v-else-if="empty" class="title">Author list is empty</div>
    <div v-else>
      <AuthorList :Authors="authors" />
      <Pagination :data="authors" />
    </div>
  </div>
</template>

<style></style>
