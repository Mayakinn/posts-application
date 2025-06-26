<script setup lang="ts">
import type { Author } from "@/typings/interface/Author";

const props = defineProps<{
  author: Author;
}>();
</script>
<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ author.name }} {{ author.surname }}</p>
    </header>
    <div class="card-content">
      <p>
        Created at: {{ new Date(author.created_at).toLocaleString() }} <br />
      </p>
    </div>
    <footer class="card-footer">
      <button class="card-footer-item">Edit</button>
      <button class="card-footer-item">Delete</button>
    </footer>
  </div>
</template>
