<template>
  <form @submit.prevent="register">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Register</button>
  </form>
</template>

<script setup lang="ts">
  import { registerUser } from "~/composables/firebaseAuth";
  import { ref } from "vue";

  const email = ref("");
  const password = ref("");

  const register = async () => {
    try {
      const user = await registerUser(email.value, password.value);
      console.log("User registered:", user);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
</script>
