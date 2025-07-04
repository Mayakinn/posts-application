<script setup lang="ts">
import { createAuthor } from "@/api/AuthorService";
import { computed, ref } from "vue";

const props = defineProps<{
  authorId: number | string;
}>();

const inputedName = ref<string>("");
const inputedSurname = ref<string>("");
const emit = defineEmits(["close-pressed"]);
const flag = ref<boolean>(true);
const cantSubmit = ref<boolean>(false);

const isInputed = computed(() => {
  return inputedName.value.trim() !== "" && inputedSurname.value.trim() !== "";
});

const nameLettersLimit = computed(() => {
  return inputedName.value.trim().length <= 19;
});
const surnameLettersLimit = computed(() => {
  return inputedSurname.value.trim().length <= 19;
});

async function handleCreateAuthor() {
  if (!nameLettersLimit || !surnameLettersLimit || !isInputed) {
    const response = await createAuthor(
      inputedName.value.trim(),
      inputedSurname.value.trim()
    );
    if (response == null) {
      emit("close-pressed", flag.value);
      return;
    }
    inputedName.value = "";
    inputedSurname.value = "";
    emit("close-pressed");
  }
  cantSubmit.value = true;
}
</script>

<template>
  <form @submit.prevent="handleCreateAuthor">
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
        :disabled="!isInputed"
      />
    </footer>
    <p v-show="!nameLettersLimit">
      Name symbol limit has been reached (Max. 20 symbols).
    </p>
    <p v-show="!surnameLettersLimit">
      Surname symbol limit has been reached (Max. 20 symbols).
    </p>
    <p v-show="cantSubmit">Can't submit, too many symbols!!!</p>
  </form>
</template>
