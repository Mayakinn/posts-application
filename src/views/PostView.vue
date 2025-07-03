<script setup lang="ts">
import PostCard from "@/components/postComponents/PostCard.vue";
import type { Post } from "@/typings/interface/Post";
import { onMounted, ref } from "vue";
import { getPost } from "@/api/PostService";
import { useRoute, useRouter } from "vue-router";
import FormModal from "@/components/modalComponents/FormModal.vue";
const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(true);
const empty = ref<boolean>(false);
const singlePost = ref<Post>();

const handleBackClick = () => {
  router.push("/");
};
const deleteModal = ref(false);

const showDeleteModal = () => {
  deleteModal.value = !deleteModal.value;
};
onMounted(async () => {
  await getPost(route.params.id as string).then(function (response) {
    loading.value = false;
    singlePost.value = response;
    if (singlePost.value == undefined) {
      empty.value = true;
    }
  });
});
</script>

<template>
  <div>
    <button @click="handleBackClick()" class="button is-primary">
      < Go back to list
    </button>
    <FormModal :isActive="deleteModal" @close-modal="showDeleteModal">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete</p>
      </header>
    </FormModal>
    <div style="max-width: 1000px; margin: 0 auto" class="columns">
      <div class="is-full">
        <div v-if="singlePost" :id="singlePost.id.toString()">
          <PostCard :post="singlePost" @delete-pressed="showDeleteModal" />
        </div>
        <div v-else-if="empty">Post by this ID is not found</div>
        <div v-else>Loading</div>
      </div>
    </div>
  </div>
</template>
