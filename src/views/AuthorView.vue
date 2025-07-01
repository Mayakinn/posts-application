<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { type Author } from "@/typings/interface/Author";
import { getAuthors } from "@/api/AuthorService";
import AuthorList from "@/components/authorComponents/AuthorList.vue";
import Pagination from "@/components/pageComponents/Pagination.vue";
import SearchBar from "@/components/pageComponents/SearchBar.vue";

const loading = ref<boolean>(true);
const empty = ref<boolean>(false);
const authors = ref<Author[]>([]);
const totalItems = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(3);
const searchQuery = ref("");

async function loadData() {
  try {
    loading.value = true;
    empty.value = false;

    const authorData = await getAuthors(
      currentPage.value,
      itemsPerPage.value,
      searchQuery.value
    );

    if (authorData?.[0]?.length === 0) {
      empty.value = true;
    }

    authors.value = authorData?.[0] || [];
    totalItems.value = authorData?.[1] || 0;
  } catch (error) {
    empty.value = true;
  } finally {
    loading.value = false;
  }
}

function deleteModal(emit: number) {
  console.log(emit);
}

function onSearch(newQuery: string) {
  searchQuery.value = newQuery;
  currentPage.value = 1;
}

function onPageChange(page: number) {
  currentPage.value = page;
}

function printCorrectID(emitted: number) {
  console.log(emitted);
}

watch([searchQuery, currentPage], loadData);

onMounted(async () => {
  await loadData();
});
</script>

<template>
  <SearchBar @query-change="onSearch" />
  <div class="Author">
    <div v-if="loading" class="title">Loading author information</div>
    <div v-else-if="empty" class="title">Author list is empty</div>
    <div v-else>
      <AuthorList :Authors="authors" @delete-pressed="printCorrectID" />
      <div class="buttons is-centered mx-5 my-3">
        <Pagination
          :currentPage="currentPage"
          :totalItems="totalItems"
          :itemsPerPage="itemsPerPage"
          @page-change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
