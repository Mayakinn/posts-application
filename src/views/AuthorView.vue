<script setup lang="ts">
import { onMounted, ref } from "vue";
import { type Author } from "@/typings/interface/Author";
import { getAuthors } from "@/api/AuthorService";
import AuthorList from "@/components/authorComponents/AuthorList.vue";
import Pagination from "@/components/pageComponents/Pagination.vue";

const loading = ref<boolean>(true);
const empty = ref<boolean>(false);
const authors = ref<[Author[], number] | undefined>(undefined);
const totalItems = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(3);

const fetchAuthors = async (newPage: number) => {
  currentPage.value = newPage;
  const response = await getAuthors(currentPage.value);
  if (response) {
    authors.value = response;
    totalItems.value = response[1];
    loading.value = false;
  } else {
    empty.value = true;
  }
};

onMounted(async () => {
  await fetchAuthors(currentPage.value);
});
</script>

<template>
  <div class="Author">
    <div v-if="loading" class="title">Loading author information</div>
    <div v-else-if="empty" class="title">Author list is empty</div>
    <div v-else>
      <AuthorList :Authors="authors?.[0]" />
      <div class="buttons is-centered mx-5 my-3">
        <Pagination
          :currentPage="currentPage"
          :totalItems="totalItems"
          :itemsPerPage="itemsPerPage"
          @page-change="fetchAuthors"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
