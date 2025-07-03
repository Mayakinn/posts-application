<script setup lang="ts">
import { editAuthor, getAuthor } from "@/api/AuthorService";
import type { Author } from "@/typings/interface/Author";
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps<{
  authorId: number | string;
}>();
const loading = ref<boolean>(true);
const inputedName = ref<string>("");
const inputedSurname = ref<string>("");
const authorData = ref<Author>();

const emit = defineEmits(["close-pressed"]);

async function handleEditAuthor() {
  if (authorData.value != null)
    await editAuthor(
      props.authorId,
      inputedName.value.trim(),
      inputedSurname.value.trim(),
      authorData.value.created_at
    );
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
const isEdited = computed(() => {
  return (
    inputedName.value !== authorData.value?.name ||
    inputedSurname.value !== authorData.value?.surname
  );
});
async function loadData() {
  loading.value = true;
  authorData.value = await getAuthor(props.authorId).then();
  if (authorData.value != null) {
    inputedName.value = authorData.value.name;
    inputedSurname.value = authorData.value.surname;
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
  <form @submit.prevent="handleEditAuthor">
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
      <input
        class="button"
        type="submit"
        value="Submit"
        :disabled="!isEdited"
      />
    </footer>
  </form>
</template>
