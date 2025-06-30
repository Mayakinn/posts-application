<script setup lang="ts">
import { ref } from "vue";
import { login } from "@/auth/authcontext";
import router from "@/router";

const email = ref<string>("");
const password = ref<string>("");

async function loginUser() {
  const response = await login(email.value, password.value);
  console.log(response);
  localStorage.setItem("token", response.accessToken);
  localStorage.setItem("userId", response.user.id);
  router.push({ name: "posts" });
}
</script>

<template>
  <div class="columns is-centered" style="margin-top: 5rem">
    <form class="box" v-on:submit.prevent="loginUser">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            type="email"
            placeholder="e.g. name@example.com"
            required="true"
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
            required="true"
            v-model="password"
          />
        </div>
      </div>

      <button class="button is-primary" type="submit">Sign in</button>
    </form>
  </div>
</template>
