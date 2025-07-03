import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { login } from "@/auth/authcontext";
import { useNotificationStore } from "./NotificationStore";
import { NotificationType } from "@/typings/interface/NotificationType";

export const useAuthStore = defineStore("authContext", () => {
  const jwtToken = ref<string | null>(localStorage.getItem("token"));
  const username = ref<string | null>(localStorage.getItem("name"));
  const userId = ref<string | null>(localStorage.getItem("userId"));
  const notif = useNotificationStore();
  async function loginUser(email: string, password: string) {
    const response = await login(email, password);
    if (response != null) {
      jwtToken.value = response.accessToken;
      username.value = response.name;
      userId.value = response.id;
    }
    return;
  }

  function logOutUser() {
    if (jwtToken.value != null) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("userId");

      jwtToken.value = null;
      username.value = null;
      userId.value = null;
      notif.newNotification(
        "User logged out succesfully",
        NotificationType.success
      );
      return;
    }
    notif.newNotification("Failed to logout", NotificationType.danger);
  }

  return { jwtToken, username, userId, loginUser, logOutUser };
});
