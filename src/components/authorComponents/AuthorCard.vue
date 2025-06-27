<script setup lang="ts">
import type { Author } from "@/typings/interface/Author";
import { computed } from "vue";

const props = defineProps<{
  author: Author;
}>();

const createdOrUpdatedDate = computed(() => {
  return new Date(props.author.created_at) >= new Date(props.author.updated_at)
    ? `Created at: ${new Date(props.author.created_at).toLocaleString()}`
    : `Last update at: ${new Date(props.author.updated_at).toLocaleString()}`;
});
</script>
<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ author.name }} {{ author.surname }}</p>
    </header>
    <div class="card-content">
      <p>{{ createdOrUpdatedDate }} <br /></p>
    </div>
    <footer class="card-footer">
      <button class="card-footer-item">Edit</button>
      <button class="card-footer-item">Delete</button>
    </footer>
  </div>
</template>
