<script setup lang="ts">
import type { Author } from "@/typings/interface/Author";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/AuthStore";
import FormModal from "../modalComponents/FormModal.vue";

const props = defineProps<{
  author: Author;
}>();
const isPostRoute = ref(false);
const route = useRoute();
const auth = useAuthStore();
const canEdit = computed(() => isPostRoute.value && auth.jwtToken);
const emit = defineEmits(["delete-pressed-card", "edit-pressed"]);

const createdOrUpdatedDate = computed(() => {
  return new Date(props.author.created_at) >= new Date(props.author.updated_at)
    ? `Created at: ${new Date(props.author.created_at).toLocaleString()}`
    : `Last update at: ${new Date(props.author.updated_at).toLocaleString()}`;
});

onMounted(async () => {
  isPostRoute.value = route.name === "authors";
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
    <div v-if="canEdit">
      <footer class="card-footer">
        <button
          @click="() => emit('edit-pressed', author.id)"
          class="card-footer-item"
        >
          Edit
        </button>
        <button
          @click="() => emit('delete-pressed-card', author.id)"
          class="card-footer-item"
        >
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>
