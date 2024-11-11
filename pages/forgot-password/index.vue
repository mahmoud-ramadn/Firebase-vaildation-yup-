<template>
  <UiContainer class="flex min-h-dvh items-center justify-center">
    <div class="w-full max-w-[340px]">
      <div class="text-center">
        <h1 class="text-3xl font-semibold lg:text-4xl">Forgot password</h1>
        <p class="mt-2 text-muted-foreground">Let us help you sign in to your account</p>
      </div>
      <form @submit="submit" class="mt-10">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput name="email" label="Email *" placeholder="JohnDoe@example.com" type="email" />
          <UiButton type="submit" class="w-full"> Send instructions</UiButton>
          <UiDivider />
          <NuxtLink to="/">
            <UiButton type="submit" class="w-full">Go to sign in</UiButton></NuxtLink
          >
        </fieldset>
      </form>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
  import { getAuth, sendPasswordResetEmail } from "firebase/auth";
  import { useForm } from "vee-validate";

  // Initialize the form with VeeValidate
  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: ForgotPasswordSchema,
  });

  // Firebase authentication instance
  const auth = getAuth();

  definePageMeta({
    middleware: "already-logged-in",
  });

  // Define submit handler function
  const submit = handleSubmit(async (values, ctx) => {
    const loading = useSonner.loading("Loading...", {
      description: " we are sending the instruction to your email",
    });
    try {
      await sendPasswordResetEmail(auth, values.email, {
        url: "http://localhost:3000",
      });
      console.log("User created successfully:");
      useSonner.success("pleas check your email", {
        id: loading,
        description: "we have sent you instructions to reset your password",
      });
      console.log(values.email);

      return navigateTo("/", { replace: true });
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
