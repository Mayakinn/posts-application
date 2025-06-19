<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav class="navbar" role="navigation">
        <div class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item"><RouterLink to="/">Posts</RouterLink></a>
            <a class="navbar-item"><RouterLink to="/author">Author</RouterLink></a>
            <a class="navbar-item"><RouterLink to="/post">Post</RouterLink></a>
          </div>
          <div class="navbar-end">
            <a class="navbar-item"><RouterLink to="/login">Login</RouterLink></a>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
