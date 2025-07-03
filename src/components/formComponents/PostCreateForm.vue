<script setup lang="ts">
import { createAuthor, getAuthorsForDropdown } from "@/api/AuthorService";
import { createPost } from "@/api/PostService";
import type { Author } from "@/typings/interface/Author";
import { isNumber } from "lodash";
import { onMounted, ref } from "vue";

const props = defineProps<{
  postId: number | string;
}>();

const inputedTitle = ref<string>("");
const inputedBody = ref<string>("");
const selectedAuthor = ref<Author>();
const authorList = ref<Author[]>();
const emit = defineEmits(["close-pressed"]);

async function handleCreatePost() {
  if (selectedAuthor.value?.id != null) {
    await createPost(
      inputedTitle.value,
      inputedBody.value,
      selectedAuthor.value?.id
    );
  }
  console.log(inputedTitle.value, inputedBody.value, selectedAuthor.value?.id);
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
        style="max-width: 1000px"
      />
      Post body:
      <input
        v-model="inputedBody"
        type="text"
        class="input is-primary is-rounded"
        required
        style="max-width: 1000px"
      /><br />
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
      <input class="button" type="submit" value="Submit" />
    </footer>
  </form>
</template>
