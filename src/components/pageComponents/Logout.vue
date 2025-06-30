<script setup lang="ts">
import { isLoggedIn, logOutUser } from "@/auth/authcontext";
import { computed } from "vue";

const loggedIn = computed(() => {
  return isLoggedIn();
});
</script>

<template>
  <div v-if="loggedIn">
    <button
      class="button"
      style="margin-top: 1rem; margin-right: 1rem"
      @click="logOutUser()"
    >
      Logout
    </button>
  </div>
</template>
