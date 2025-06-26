import Axios from "axios";
import { useNotificationStore } from "@/store/NotificationStore";
import { NotificationType } from "@/typings/interface/NotificationType";

const DB_URL = import.meta.env.VITE_JSON_SERVER;

const getAuthors = async () => {
  const notif = useNotificationStore();
  try {
    const response = await Axios.get(`${DB_URL}/authors`);
    const data = response.data;
    if (!data) {
      notif.newNotification(
        "The author list is empty",
        NotificationType.danger
      );
      return;
    }
    notif.newNotification(
      "Succesfully fetched Author data",
      NotificationType.success
    );
    return data;
  } catch (error) {
    notif.newNotification(
      `Failed to fetch author data : ${error}`,
      NotificationType.danger
    );
  }
};

export { getAuthors };
