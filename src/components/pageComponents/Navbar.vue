<script setup lang="ts">
import { useAuthStore } from "@/store/AuthStore";
import { ref, watch, onMounted, computed } from "vue";
const auth = useAuthStore();

const user = computed(() => {
  return localStorage.getItem("name");
});
</script>

<template>
  <nav class="navbar" role="navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item"><RouterLink to="/">Posts</RouterLink></a>
        <a class="navbar-item"
          ><RouterLink to="/authors">Authors</RouterLink></a
        >
      </div>
      <div v-if="auth.jwtToken == null" class="navbar-end">
        <a class="navbar-item"><RouterLink to="/login">Login</RouterLink></a>
      </div>
      <div v-else class="navbar-end">
        <p class="navbar-item">Hello, {{ user }}</p>
        <a class="navbar-item" @click="auth.logOutUser()">Logout</a>
      </div>
    </div>
  </nav>
</template>
