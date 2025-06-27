<script setup lang="ts">
import type { Author } from "../../typings/interface/Author";
import AuthorCard from "./AuthorCard.vue";

const props = defineProps<{
  Authors: Author[] | undefined;
}>();
</script>

<template>
  <div class="container" style="max-width: 1000px; margin: 0 auto">
    <div class="columns is-multiline is-centered">
      <div class="column is-5" v-for="author in props.Authors">
        <div key="author.id">
          <AuthorCard :author="author" />
        </div>
      </div>
    </div>
  </div>
</template>
