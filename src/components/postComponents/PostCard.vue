<script setup lang="ts">
import { useAuthStore } from "@/store/AuthStore";
import type { Post } from "@/typings/interface/Post";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const auth = useAuthStore();

const props = defineProps<{
  post: Post;
}>();

const isPostRoute = ref(false);
const router = useRouter();
const route = useRoute();

const emit = defineEmits(["delete-pressed-card", "edit-pressed-card"]);

const canEdit = computed(() => auth.jwtToken != undefined);

const createdOrUpdatedDate = computed(() => {
  return new Date(props.post.created_at) >= new Date(props.post.updated_at)
    ? `Created at: ${new Date(props.post.created_at).toLocaleString()}`
    : `Last update at: ${new Date(props.post.updated_at).toLocaleString()}`;
});

onMounted(async () => {
  isPostRoute.value =
    route.name === "post" && route.params.id === String(props.post.id);
});
</script>
<template>
  <div class="card">
    <header
      class="card-header"
      @click="router.push({ name: 'post', params: { id: post.id } })"
      style="cursor: pointer"
    >
      <p class="card-header-title">{{ post.title }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        Author: {{ post.author.name }} {{ post.author.surname }}
      </div>
      <p>{{ createdOrUpdatedDate }} <br /></p>
    </div>
    <div v-if="isPostRoute" class="card-content">{{ post.body }}</div>

    <div v-if="canEdit">
      <footer class="card-footer">
        <button
          @click="() => emit('edit-pressed-card', post.id)"
          class="card-footer-item"
        >
          Edit
        </button>
        <button
          @click="() => emit('delete-pressed-card', post.id)"
          class="card-footer-item"
        >
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>
