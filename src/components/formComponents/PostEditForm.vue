<script setup lang="ts">
import { editPost, getPost } from "@/api/PostService";
import type { Post } from "@/typings/interface/Post";
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps<{
  postId: number | string;
}>();
const postData = ref<Post>();
const inputedTitle = ref("");
const inputedBody = ref("");
const loading = ref<boolean>(true);
const emit = defineEmits(["close-pressed"]);

async function handleEditPost() {
  if (postData.value != null)
    await editPost(
      props.postId,
      inputedTitle.value.trim(),
      inputedBody.value.trim(),
      postData.value.created_at,
      postData.value.authorId
    );
  console.log("it passed");
  inputedTitle.value = "";
  inputedBody.value = "";
  emit("close-pressed");
}

watch(
  () => props.postId,
  () => {
    if (props.postId != 0) loadData();
  }
);

const isEdited = computed(() => {
  return (
    inputedTitle.value !== postData.value?.title ||
    inputedBody.value !== postData.value?.body
  );
});

async function loadData() {
  loading.value = true;
  postData.value = await getPost(props.postId).then();
  if (postData.value != null) {
    inputedTitle.value = postData.value.title;
    inputedBody.value = postData.value.body;
  } else {
    inputedTitle.value = "";
    inputedBody.value = "";
  }
}

onMounted(async () => {
  await loadData();
});
</script>

<template>
  <form @submit.prevent="handleEditPost">
    <header class="modal-card-head">
      <p class="modal-card-title">Post Editing</p>
    </header>
    <div class="modal-card-body">
      Post title:
      <input
        v-model="inputedTitle"
        type="text"
        class="input is-primary is-rounded"
        required
        style="max-width: 1000px"
      />
      Post body:
      <textarea
        class="textarea is-primary"
        v-model="inputedBody"
        type="text"
        required
        style="max-width: 1000px"
      ></textarea>
      <br />
    </div>
    <footer class="modal-card-foot">
      <input
        class="button"
        type="submit"
        value="Submit"
        :disabled="!isEdited"
      />
    </footer>
  </form>
</template>
