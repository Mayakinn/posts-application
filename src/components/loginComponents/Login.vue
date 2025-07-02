<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/AuthStore";
const auth = useAuthStore();
const email = ref<string>("");
const password = ref<string>("");
</script>

<template>
  <div class="columns is-centered" style="margin-top: 5rem">
    <form class="box" v-on:submit.prevent="auth.loginUser(email, password)">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            type="email"
            placeholder="e.g. name@example.com"
            required
            v-model="email"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            placeholder="********"
            required
            v-model="password"
          />
        </div>
      </div>

      <button class="button is-primary" type="submit">Sign in</button>
    </form>
  </div>
</template>
