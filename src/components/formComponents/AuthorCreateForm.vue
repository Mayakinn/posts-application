<script setup lang="ts">
import { createAuthor } from "@/api/AuthorService";
import { ref } from "vue";

const props = defineProps<{
  authorId: number | string;
}>();

const inputedName = ref<string>("");
const inputedSurname = ref<string>("");
const emit = defineEmits(["close-pressed"]);

async function handleCreateAuthor() {
  await createAuthor(inputedName.value, inputedSurname.value);
  inputedName.value = "";
  inputedSurname.value = "";
  emit("close-pressed");
}
</script>

<template>
  <header class="modal-card-head">
    <p class="modal-card-title">Author Creation</p>
  </header>
  <div class="modal-card-body">
    Author name:
    <input
      v-model="inputedName"
      type="text"
      class="input is-primary is-rounded"
      required
      style="max-width: 1000px"
    />
    Author surname:
    <input
      v-model="inputedSurname"
      type="text"
      class="input is-primary is-rounded"
      required
      style="max-width: 1000px"
    /><br />
  </div>
  <footer class="modal-card-foot">
    <button @click="handleCreateAuthor" class="button is-primary">
      Add new Author
    </button>
  </footer>
</template>
