<template>
  <UiContainer class="flex min-h-dvh items-center justify-center">
    <div class="w-full max-w-[340px]">
      <div class="text-center">
        <h1 class="text-3xl font-semibold lg:text-4xl">Sign in</h1>
        <p class="mt-2 text-muted-foreground">Welcome back! Enter your details to get started</p>
      </div>
      <form @submit="submit" class="mt-10">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput name="email" label="Email *" placeholder="JohnDoe@example.com" type="email" />
          <UiVeeInput name="password" label="Password *" type="password" />
          <p>
            <NuxtLink
              class="hover: font-semibold text-primary hover:underline"
              to="/forgot-password"
              >Forgot password?</NuxtLink
            >
          </p>
          <UiButton type="submit" class="w-full">Login</UiButton>
          <UiDivider />
          <NuxtLink to="/register">
            Don't have an account?
            <UiButton type="submit" class="w-full">Create account</UiButton>
          </NuxtLink>
        </fieldset>
      </form>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
  import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { useForm } from "vee-validate";

  definePageMeta({
    middleware: "already-logged-in",
  });

  // Initialize the form with VeeValidate
  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: LoginSchema,
  });

  // Firebase authentication instance
  const auth = getAuth();

  // Define submit handler function
  const submit = handleSubmit(async (values, ctx) => {
    const loading = useSonner.loading("Loading...", {
      description: "Creating your account",
    });
    try {
      const { user } = await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log("User created successfully:", user);
      useSonner.success("Account created successfully!", {
        id: loading,
      });
      return navigateTo("/admin/dashborad");
    } catch (error) {
      console.error("Error creating user:", error);
      useSonner.error(error.message, {
        id: loading,
      });
      ctx.setErrors({ email: "Failed to create account. Try again." });
    }
  });
</script>

<style scoped></style>
