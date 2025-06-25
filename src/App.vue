<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Notification from "./components/pageComponents/Notification.vue";
</script>

<template>
  <header>
    <div>
      <nav class="navbar" role="navigation">
        <div class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item"><RouterLink to="/">Posts</RouterLink></a>
            <a class="navbar-item"
              ><RouterLink to="/authors">Authors</RouterLink></a
            >
          </div>
          <div class="navbar-end">
            <a class="navbar-item"
              ><RouterLink to="/login">Login</RouterLink></a
            >
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
  <Notification />
</template>
