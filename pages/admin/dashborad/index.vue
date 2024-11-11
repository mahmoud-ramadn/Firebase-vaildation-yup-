<template>
  <div>
    <h1>Welcome to your Dashboard!</h1>
    <p v-if="userName">Hello, {{ userName }}!</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup lang="ts">
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { onMounted, ref } from "vue";

  // Define the middleware to ensure only authenticated users access this page
  definePageMeta({
    middleware: ["auth"],
  });

  // Reactive variable to store the user's display name
  const userName = ref<string | null>(null);

  // Get the Firebase Auth instance and fetch user info on component mount
  const auth = getAuth();

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set the user's display name if available
        userName.value = user.displayName || "User";
        console.log("User Name:", user.displayName);
      } else {
        // Optionally redirect to login if the user is not authenticated
        navigateTo("/");
      }
    });
  });
</script>

<style scoped></style>
