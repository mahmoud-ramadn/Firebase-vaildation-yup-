<template>
  <form @submit.prevent="login">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
  import { loginUser } from "~/composables/firebaseAuth";
  import { ref } from "vue";

  const email = ref("");
  const password = ref("");

  const login = async () => {
    try {
      const user = await loginUser(email.value, password.value);
      console.log("User logged in:", user);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
</script>
