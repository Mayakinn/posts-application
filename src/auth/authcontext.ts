import Axios from "axios";
const DB_URL = import.meta.env.VITE_JSON_SERVER;
import { useNotificationStore } from "@/store/NotificationStore";
import { NotificationType } from "@/typings/interface/NotificationType";
import router from "@/router";

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
    return data;
  } catch (error) {
    notif.newNotification(`Error : ${error}`, NotificationType.danger);
  }
};

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token != null) {
    return true;
  } else {
    return false;
  }
};

function logOutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  router.go(0);
}

async function validateToken() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const response = await fetch("http://localhost:3000/660/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}
export { login, isLoggedIn, validateToken, logOutUser };
