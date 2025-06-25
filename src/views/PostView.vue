<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
defineProps<{ id: string }>();
</script>

<template>
  <h2>Viewing post ID: {{ $route.params.id }}</h2>
</template>
