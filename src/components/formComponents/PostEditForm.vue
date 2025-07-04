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
const flag = ref<boolean>(true);
const cantSubmit = ref<boolean>(false);

async function handleEditPost() {
  if (validateBeforeSubmit()) {
    if (postData.value != null) {
      const response = await editPost(
        props.postId,
        inputedTitle.value.trim(),
        inputedBody.value.trim(),
        postData.value.created_at,
        postData.value.authorId
      );
      if (response == null) {
        cantSubmit.value = false;
        inputedTitle.value = "";
        inputedBody.value = "";
        emit("close-pressed", flag);
        return;
      }
    }
    cantSubmit.value = false;
    inputedTitle.value = "";
    inputedBody.value = "";
    emit("close-pressed");
  } else {
    cantSubmit.value = true;
  }
}

watch(
  () => props.postId,
  () => {
    if (props.postId != 0) loadData();
  }
);

function validateBeforeSubmit() {
  if (!isInputed.value) {
    cantSubmit.value = true;
    return false;
  }
  if (inputedTitle.value.length >= 21 || inputedBody.value.length >= 501) {
    cantSubmit.value = true;
    return false;
  }
  if (!isEdited.value) {
    cantSubmit.value = true;
    return false;
  }
  cantSubmit.value = false;
  return true;
}

const titleLettersLimit = computed(() => {
  return inputedTitle.value.trim().length <= 49;
});
const bodyLettersLimit = computed(() => {
  return inputedBody.value.trim().length <= 499;
});
const isEdited = computed(() => {
  return (
    inputedTitle.value !== postData.value?.title ||
    inputedBody.value !== postData.value?.body
  );
});

const isInputed = computed(() => {
  return inputedTitle.value.trim() !== "" && inputedBody.value.trim() !== "";
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
        maxlength="50"
        style="max-width: 1000px"
      />
      Post body:
      <textarea
        class="textarea is-primary"
        v-model="inputedBody"
        type="text"
        required
        maxlength="500"
        style="max-width: 1000px"
      ></textarea>
      <br />
    </div>
    <footer class="modal-card-foot">
      <input
        class="button"
        type="submit"
        value="Submit"
        :disabled="!isEdited || !isInputed"
      />
    </footer>
    <p v-show="!titleLettersLimit">
      Title length limit reached. (Max. 60 symbols)
    </p>
    <p v-show="!bodyLettersLimit">
      Post body length limit reached. (Max. 500 symbols)
    </p>
    <p v-show="cantSubmit">Can't submit, too many symbols!!!</p>
  </form>
</template>
