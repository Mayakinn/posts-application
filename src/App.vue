<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useNotificationStore } from "./store/NotificationStore";
import Notification from "./components/pageComponents/Notification.vue";
import Navbar from "./components/pageComponents/Navbar.vue";
const message = useNotificationStore();
</script>

<template>
  <header>
    <div>
      <Navbar />
    </div>
  </header>
  <RouterView />
  <Notification />
</template>
