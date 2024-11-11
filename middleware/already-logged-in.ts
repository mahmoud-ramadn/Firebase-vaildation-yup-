import { getAuth, onAuthStateChanged } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = getAuth();

  // Helper function to check for current user
  const getCurrentUser = () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // Unsubscribe to stop listening after the check
        resolve(user);
      });
    });
  };

  // Wait for the auth state
  const user = await getCurrentUser();

  // Redirect the user to the login page if they are not authenticated
  if (user) {
    return navigateTo({
      path: "/admin/dashborad",
      query: { redirect: to.fullPath },
    });
  }
});
