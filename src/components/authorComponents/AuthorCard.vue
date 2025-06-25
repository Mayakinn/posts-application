<script setup lang="ts">
import type { Author } from "@/typings/interface/Author";

const props = defineProps<{
  author: Author;
}>();
</script>
<template>
  <div class="card">
    <div class="card-content">
      <p has-text-centered is-size-4 box>
        ID : {{ author.id }} <br />
        Name : {{ author.name }}<br />
        Last name: {{ author.surname }}<br />
        Created at: {{ new Date(author.created_at).toLocaleString() }} <br />
        Updated at: {{ new Date(author.updated_at).toLocaleString() }} <br />
      </p>
    </div>
  </div>
</template>
