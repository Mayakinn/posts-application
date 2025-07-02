<script setup lang="ts">
import { editAuthor, getAuthor } from "@/api/AuthorService";
import type { Author } from "@/typings/interface/Author";
import { onMounted, ref, watch } from "vue";

const props = defineProps<{
  authorId: number | string;
}>();
const loading = ref<boolean>(true);
const inputedName = ref<string>("");
const inputedSurname = ref<string>("");
const emit = defineEmits(["close-pressed"]);

async function handleEditAuthor() {
  await editAuthor(props.authorId, inputedName.value, inputedSurname.value);
  inputedName.value = "";
  inputedSurname.value = "";
  emit("close-pressed");
}

watch(
  () => props.authorId,
  () => {
    if (props.authorId != 0) loadData();
  }
);

async function loadData() {
  loading.value = true;
  const authorData = await getAuthor(props.authorId).then();
  if (authorData != null) {
    inputedName.value = authorData.name;
    inputedSurname.value = authorData.surname;
  } else {
    inputedName.value = "";
    inputedSurname.value = "";
  }
}

onMounted(async () => {
  await loadData();
});
</script>

<template>
  <header class="modal-card-head">
    <p class="modal-card-title">Author Editing</p>
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
    <button @click="handleEditAuthor" class="button is-primary">
      Update author
    </button>
  </footer>
</template>
