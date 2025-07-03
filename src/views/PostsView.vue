<script setup lang="ts">
import PostList from "@/components/postComponents/PostList.vue";
import { getPosts } from "@/api/PostService";
import { type Post } from "@/typings/interface/Post";
import { ref, onMounted, watch, shallowRef, type Component } from "vue";
import Pagination from "@/components/pageComponents/Pagination.vue";
import SearchBar from "@/components/pageComponents/SearchBar.vue";
import PostCreateForm from "@/components/formComponents/PostCreateForm.vue";
import { useAuthStore } from "@/store/AuthStore";
import FormModal from "@/components/modalComponents/FormModal.vue";
import PostEditForm from "@/components/formComponents/PostEditForm.vue";

const loading = ref<boolean>(true);
const posts = ref<Post[]>([]);
const empty = ref<boolean>(false);
const totalItems = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const searchQuery = ref<string>("");
const currentForm = shallowRef<Component>();
const formModalActive = ref(false);
const auth = useAuthStore();
const postId = ref<string | number>(0);

async function loadData() {
  try {
    loading.value = true;
    empty.value = false;

    const postsData = await getPosts(
      currentPage.value,
      itemsPerPage.value,
      searchQuery.value
    );

    if (postsData?.[1] === 0) {
      empty.value = true;
    }

    posts.value = postsData?.[0] || [];
    totalItems.value = postsData?.[1] || 0;
  } catch (error) {
    loading.value = false;
  } finally {
    if (totalItems.value == 0) {
      empty.value = true;
    }
    loading.value = false;
  }
}

function addModal() {
  currentForm.value = PostCreateForm;
  formModalActive.value = true;
}

const closeModal = () => {
  formModalActive.value = false;
};

function editModal(emit: number | string) {
  currentForm.value = PostEditForm;
  formModalActive.value = true;
  postId.value = emit;
}

const closeModalAfterForm = () => {
  formModalActive.value = false;
  postId.value = 0;
  loadData();
};

function onSearch(newQuery: string) {
  searchQuery.value = newQuery;
  currentPage.value = 1;
}

function onPageChange(page: number) {
  currentPage.value = page;
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
    Add a post
  </button>
  <SearchBar @query-change="onSearch" />
  <FormModal :isActive="formModalActive" @close-modal="closeModal">
    <component
      @close-pressed="closeModalAfterForm"
      :is="currentForm"
      :postId="postId"
    ></component>
  </FormModal>
  <div class="post">
    <div v-if="loading" class="title">Loading posts information</div>
    <div v-else-if="empty" class="title">Post list is empty</div>
    <div v-else>
      <PostList :Posts="posts" @edit-pressed-card="editModal" />
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
