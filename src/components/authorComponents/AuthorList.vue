<script setup lang="ts">
import type { Author } from "../../typings/interface/Author";
import AuthorCard from "./AuthorCard.vue";

const props = defineProps<{
  Authors: Author[] | undefined;
}>();

const emit = defineEmits(["delete-pressed", "edit-pressed"]);

function deletionPressed(emitted: number) {
  console.log("listemmited", emitted);
  emit("delete-pressed", emitted);
}
</script>

<template>
  <div class="container" style="max-width: 1000px; margin: 0 auto">
    <div class="columns is-multiline is-centered">
      <div class="column is-5" v-for="author in props.Authors">
        <div key="author.id">
          <AuthorCard :author="author" @delete-pressed-card="deletionPressed" />
        </div>
      </div>
    </div>
  </div>
</template>
