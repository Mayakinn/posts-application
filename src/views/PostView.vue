<script setup lang="ts">
import PostCard from "@/components/postComponents/PostCard.vue";
import type { Post } from "@/typings/interface/Post";
import { onMounted, ref, shallowRef, type Component } from "vue";
import { getPost } from "@/api/PostService";
import { useRoute, useRouter } from "vue-router";
import FormModal from "@/components/modalComponents/FormModal.vue";
import PostCreateForm from "@/components/formComponents/PostCreateForm.vue";
import PostDeleteForm from "@/components/formComponents/PostDeleteForm.vue";
import PostEditForm from "@/components/formComponents/PostEditForm.vue";

const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(true);
const empty = ref<boolean>(false);
const singlePost = ref<Post>();
const currentForm = shallowRef<Component>();
const formModalActive = ref(false);
const postId = ref<string | number>(0);

async function loadData() {
  await getPost(route.params.id as string).then(function (response) {
    loading.value = false;
    singlePost.value = response;
    if (singlePost.value == undefined) {
      empty.value = true;
    }
  });
}

const handleBackClick = () => {
  router.push("/");
};

const showDeleteModal = (emit: number | string) => {
  currentForm.value = PostDeleteForm;
  postId.value = emit;
  formModalActive.value = !formModalActive.value;
};

const showEditModal = (emit: number | string) => {
  currentForm.value = PostEditForm;
  postId.value = emit;
  formModalActive.value = !formModalActive.value;
};

function closeModalAfterForm(flag: boolean) {
  formModalActive.value = false;
  postId.value = 0;
  if (flag) {
    return;
  } else if (currentForm.value == PostDeleteForm) {
    router.push("/");
    return;
  }
  loadData();
}

const closeModal = () => {
  formModalActive.value = false;
};

onMounted(async () => {
  await loadData();
});
</script>

<template>
  <div>
    <button @click="handleBackClick()" class="button is-primary">
      < Go back to list
    </button>
    <FormModal :isActive="formModalActive" @close-modal="closeModal">
      <component
        :is="currentForm"
        @close-pressed="closeModalAfterForm"
        :postId="postId"
      ></component>
    </FormModal>
    <div class="container" style="max-width: 1000px; margin: 0 auto">
      <div class="column is-full">
        <div v-if="singlePost" :id="singlePost.id.toString()">
          <PostCard
            :post="singlePost"
            @delete-pressed-card="showDeleteModal"
            @edit-pressed-card="showEditModal"
          />
        </div>
        <div v-else-if="empty">Post by this ID is not found</div>
        <div v-else>Loading</div>
      </div>
    </div>
  </div>
</template>
