<script setup lang="ts">
import { createAuthor, getAuthorsForDropdown } from "@/api/AuthorService";
import type { Author } from "@/typings/interface/Author";
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
  inputedTitle.value = "";
  inputedBody.value = "";
  emit("close-pressed");
}

async function loadAuthors() {
  authorList.value = await getAuthorsForDropdown();
  console.log(authorList.value);
}

onMounted(async () => {
  await loadAuthors();
});
</script>

<template>
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
    <select class="dropdown" v-bind:value="selectedAuthor">
      <option value="" disabled>Please select an author</option>
      <option v-for="author in authorList" :key="author.id" :value="author">
        {{ author.name }}
      </option>
    </select>
  </div>
  <footer class="modal-card-foot">
    <button @click="handleCreatePost" class="button is-primary">
      Add new Author
    </button>
  </footer>
</template>
