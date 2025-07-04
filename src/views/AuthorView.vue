<script setup lang="ts">
import { onMounted, ref, shallowRef, watch, type Component } from "vue";
import { type Author } from "@/typings/interface/Author";
import { getAuthors } from "@/api/AuthorService";
import AuthorList from "@/components/authorComponents/AuthorList.vue";
import Pagination from "@/components/pageComponents/Pagination.vue";
import SearchBar from "@/components/pageComponents/SearchBar.vue";
import FormModal from "@/components/modalComponents/FormModal.vue";
import AuthorDeleteForm from "@/components/formComponents/AuthorDeleteForm.vue";
import AuthorCreateForm from "@/components/formComponents/AuthorCreateForm.vue";
import { useAuthStore } from "@/store/AuthStore";
import AuthorEditForm from "@/components/formComponents/AuthorEditForm.vue";

const loading = ref<boolean>(true);
const empty = ref<boolean>(false);
const authors = ref<Author[]>([]);
const totalItems = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(3);
const searchQuery = ref("");
const currentForm = shallowRef<Component>();
const formModalActive = ref(false);
const authorId = ref<number | string>(0);
const auth = useAuthStore();
async function loadData() {
  try {
    loading.value = true;
    empty.value = false;

    const authorData = await getAuthors(
      currentPage.value,
      itemsPerPage.value,
      searchQuery.value
    );

    if (authorData?.[1] === 0) {
      empty.value = true;
    }

    authors.value = authorData?.[0] || [];
    totalItems.value = authorData?.[1] || 0;
  } catch (error) {
    loading.value = false;
  } finally {
    if (totalItems.value == 0) {
      empty.value = true;
    }

    loading.value = false;
  }
}

function deleteModal(emit: number | string) {
  currentForm.value = AuthorDeleteForm;
  formModalActive.value = true;
  authorId.value = emit;
}

function addModal() {
  currentForm.value = AuthorCreateForm;
  formModalActive.value = true;
}

function editModal(emit: number | string) {
  currentForm.value = AuthorEditForm;
  formModalActive.value = true;
  authorId.value = emit;
}

function onSearch(newQuery: string) {
  searchQuery.value = newQuery;
  currentPage.value = 1;
}

function onPageChange(page: number) {
  currentPage.value = page;
}

const closeModal = () => {
  formModalActive.value = false;
  authorId.value = 0;
};
function closeModalAfterForm(flag: boolean) {
  formModalActive.value = false;
  authorId.value = 0;
  if (flag) {
    return;
  } else loadData();
}

watch([searchQuery, currentPage], loadData);

onMounted(async () => {
  await loadData();
});
</script>

<template>
  <button
    v-if="auth.jwtToken != null"
    class="button is-primary"
    @click="addModal"
  >
    Add an Author
  </button>
  <div class="Author">
    <SearchBar @query-change="onSearch" />

    <FormModal :isActive="formModalActive" @close-modal="closeModal">
      <component
        :authorId="authorId"
        @close-pressed="closeModalAfterForm"
        :is="currentForm"
      ></component>
    </FormModal>

    <div v-if="loading" class="title">Loading author information</div>
    <div v-else-if="empty" class="title">Author list is empty</div>
    <div v-else>
      <AuthorList
        :Authors="authors"
        @delete-pressed-card="deleteModal"
        @edit-pressed-card="editModal"
      />
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
