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
const flag = ref<boolean>(true);
const cantSubmit = ref<boolean>(false);
const emit = defineEmits(["close-pressed"]);

const nameLettersLimit = computed(() => {
  return inputedName.value.length <= 19;
});
const surnameLettersLimit = computed(() => {
  return inputedSurname.value.length <= 19;
});

function validateBeforeSubmit() {
  if (!isInputed.value) {
    cantSubmit.value = true;
    return false;
  }
  if (inputedName.value.length >= 21 || inputedSurname.value.length >= 21) {
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

async function handleEditAuthor() {
  if (validateBeforeSubmit()) {
    if (authorData.value != null) {
      const response = await editAuthor(
        props.authorId,
        inputedName.value.trim(),
        inputedSurname.value.trim(),
        authorData.value.created_at
      );
      if (response == null) {
        cantSubmit.value = false;
        emit("close-pressed", flag.value);
        return;
      }
      cantSubmit.value = false;
      inputedName.value = "";
      inputedSurname.value = "";
      emit("close-pressed");
    }
  } else {
    cantSubmit.value = true;
  }
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

const isInputed = computed(() => {
  return inputedName.value.trim() !== "" && inputedSurname.value.trim() !== "";
});

watch(
  () => props.authorId,
  () => {
    if (props.authorId != 0) loadData();
  }
);

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
        maxlength="20"
        style="max-width: 1000px"
      />
      Author surname:
      <input
        v-model="inputedSurname"
        type="text"
        class="input is-primary is-rounded"
        required
        maxlength="20"
        style="max-width: 1000px"
      /><br />
    </div>
    <footer class="modal-card-foot">
      <input
        class="button"
        type="submit"
        value="Submit"
        :disabled="!isEdited || !isInputed"
      />
    </footer>
    <p v-show="!nameLettersLimit">
      Name symbol limit reached (Max. 20 symbols).
    </p>
    <p v-show="!surnameLettersLimit">
      Surname symbol limit reached (Max. 20 symbols).
    </p>
    <p v-show="cantSubmit">Can't submit, too many symbols!!!</p>
  </form>
</template>
