import Axios from "axios";
const DB_URL = import.meta.env.VITE_JSON_SERVER;
import { useNotificationStore } from "@/store/NotificationStore";
import { NotificationType } from "@/typings/interface/NotificationType";
import router from "@/router";
import { computed } from "vue";
import { useAuthStore } from "@/store/AuthStore";

const login = async (email: string, pass: string) => {
  const notif = useNotificationStore();
  try {
    const response = await Axios.post(`${DB_URL}/login`, {
      email: email,
      password: pass,
    });
    const data = response.data;
    if (!data) {
      notif.newNotification("Error fetching data", NotificationType.danger);
      return;
    }
    notif.newNotification("Succesfully logged in", NotificationType.success);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("name", data.user.name);
    router.push("posts");
    return data;
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      notif.newNotification(
        `Error: ${error.response?.data?.message || error.message}. Invalid email and/or password.`,
        NotificationType.danger
      );
    }
  }
};

export { login };
