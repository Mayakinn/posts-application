import Axios from "axios";
import { useNotificationStore } from "@/store/NotificationStore";
import { NotificationType } from "@/typings/interface/NotificationType";

const DB_URL = import.meta.env.VITE_JSON_SERVER;

const getPosts = async () => {
  const notif = useNotificationStore();
  try {
    const response = await Axios.get(`${DB_URL}/posts?_expand=author`);
    const data = response.data;
    console.log(data);
    if (!data) {
      notif.newNotification("The post list is empty", NotificationType.danger);
      return;
    }
    notif.newNotification(
      "Succesfully fetched posts data",
      NotificationType.success
    );
    return data;
  } catch (error) {
    notif.newNotification(
      `Failed to fetch posts data : ${error}`,
      NotificationType.danger
    );
  }
};

const getPost = async (id: string) => {
  const notif = useNotificationStore();
  try {
    const response = await Axios.get(`${DB_URL}/posts/${id}?_expand=author`);
    const data = response.data;
    console.log(data);
    if (!data) {
      notif.newNotification("The post is empty", NotificationType.danger);
      return;
    }
    notif.newNotification(
      "Succesfully fetched post data",
      NotificationType.success
    );
    return data;
  } catch (error) {
    notif.newNotification(
      `Failed to fetch post data : ${error}`,
      NotificationType.danger
    );
  }
};

export { getPosts, getPost };
