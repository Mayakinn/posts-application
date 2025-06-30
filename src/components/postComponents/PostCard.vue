<script setup lang="ts">
import { validateToken } from "@/auth/authcontext";
import type { Post } from "@/typings/interface/Post";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps<{
  post: Post;
}>();

const isLoggedIn = ref(false);
const isPostRoute = ref(false);

const router = useRouter();
const route = useRoute();

const canEdit = computed(() => {
  return isPostRoute.value && isLoggedIn.value;
});

const createdOrUpdatedDate = computed(() => {
  return new Date(props.post.created_at) >= new Date(props.post.updated_at)
    ? `Created at: ${new Date(props.post.created_at).toLocaleString()}`
    : `Last update at: ${new Date(props.post.updated_at).toLocaleString()}`;
});

onMounted(async () => {
  isPostRoute.value =
    route.name === "post" && route.params.id === String(props.post.id);

  if (isPostRoute) {
    isLoggedIn.value = await validateToken();
  }
});
</script>
<template>
  <div
    class="card"
    @click="router.push({ name: 'post', params: { id: post.id } })"
  >
    <header class="card-header">
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
        <button class="card-footer-item">Edit</button>
        <button class="card-footer-item">Delete</button>
      </footer>
    </div>
  </div>
</template>
