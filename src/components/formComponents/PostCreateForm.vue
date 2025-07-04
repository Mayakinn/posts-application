<script setup lang="ts">
import { createAuthor, getAuthorsForDropdown } from "@/api/AuthorService";
import { createPost } from "@/api/PostService";
import type { Author } from "@/typings/interface/Author";
import { isNumber } from "lodash";
import { computed, onMounted, ref } from "vue";

const props = defineProps<{
  postId: number | string;
}>();

const inputedTitle = ref<string>("");
const inputedBody = ref<string>("");
const selectedAuthor = ref<Author>();
const authorList = ref<Author[]>();
const emit = defineEmits(["close-pressed"]);
const flag = ref<boolean>(true);

const isInputed = computed(() => {
  return inputedTitle.value.trim() !== "" && inputedBody.value.trim() !== "";
});

const titleLettersLimit = computed(() => {
  return inputedTitle.value.trim().length <= 49;
});
const bodyLettersLimit = computed(() => {
  return inputedBody.value.trim().length <= 499;
});

async function handleCreatePost() {
  if (selectedAuthor.value?.id != null) {
    const response = await createPost(
      inputedTitle.value.trim(),
      inputedBody.value.trim(),
      selectedAuthor.value?.id
    );
    if (response == null) {
      inputedTitle.value = "";
      inputedBody.value = "";
      selectedAuthor.value = undefined;
      emit("close-pressed", flag);
      return;
    }
  }
  inputedTitle.value = "";
  inputedBody.value = "";
  selectedAuthor.value = undefined;
  emit("close-pressed");
}

async function loadAuthors() {
  authorList.value = await getAuthorsForDropdown();
}

onMounted(async () => {
  await loadAuthors();
});
</script>

<template>
  <form @submit.prevent="handleCreatePost">
    <header class="modal-card-head">
      <p class="modal-card-title">Post Creation</p>
    </header>
    <div class="modal-card-body">
      Post Title:
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
      Author:<br />
      <div class="select is-primary">
        <select required v-model="selectedAuthor">
          <option value="" disabled>Please select an author</option>
          <option v-for="author in authorList" :value="author">
            {{ author.name }}
          </option>
        </select>
      </div>
    </div>
    <footer class="modal-card-foot">
      <input
        class="button"
        type="submit"
        value="Submit"
        :disabled="!isInputed"
      />
    </footer>
    <p v-show="!titleLettersLimit">
      Title length limit reached. (Max. 60 symbols)
    </p>
    <p v-show="!bodyLettersLimit">
      Post body length limit reached. (Max. 500 symbols)
    </p>
  </form>
</template>
