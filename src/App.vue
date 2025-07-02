<script setup lang="ts">
import { RouterView } from "vue-router";
import Notification from "./components/pageComponents/Notification.vue";
import Navbar from "./components/pageComponents/Navbar.vue";
</script>

<template>
  <header>
    <div>
      <Navbar />
    </div>
  </header>
  <router-view />
  <Notification />
</template>
