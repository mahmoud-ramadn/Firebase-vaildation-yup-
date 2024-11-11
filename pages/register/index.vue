<template>
  <UiContainer class="flex min-h-dvh items-center justify-center">
    <div class="w-full max-w-[340px]">
      <div class="text-center">
        <h1 class="text-3xl font-semibold lg:text-4xl">Create account</h1>
        <p class="mt-2 text-muted-foreground">Start managing your pets today!</p>
      </div>
      <form @submit="submit" class="mt-10">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput name="name" label="Full Name *" placeholder="John Doe" />
          <UiVeeInput name="email" label="Email *" placeholder="JohnDoe@example.com" type="email" />
          <UiVeeInput name="password" label="Password *" type="password" />
          <UiButton type="submit" class="w-full">Create account</UiButton>
          <UiDivider />
          <NuxtLink to="/"> <UiButton type="submit" class="w-full">Login</UiButton></NuxtLink>
        </fieldset>
      </form>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
  import { RegisterSchema } from "~/utils/validation";
  import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
  import { useForm } from "vee-validate";

  definePageMeta({
    middleware: "already-logged-in",
  });
  // Initialize the form with VeeValidate
  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: RegisterSchema,
  });

  // Firebase authentication instance
  const auth = getAuth();

  // Define submit handler function
  const submit = handleSubmit(async (values, ctx) => {
    const loading = useSonner.loading("Loading...", {
      description: "Creating your account",
    });
    try {
      const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);
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
