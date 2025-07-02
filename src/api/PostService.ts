import Axios from "axios";
import { useNotificationStore } from "@/store/NotificationStore";
import { NotificationType } from "@/typings/interface/NotificationType";
import type { Post } from "@/typings/interface/Post";

const DB_URL = import.meta.env.VITE_JSON_SERVER;

const getPosts = async (
  page = 1,
  itemsPerPage = 3,
  searchQuery = ""
): Promise<[Post[], number] | undefined> => {
  const notif = useNotificationStore();
  try {
    const response = await Axios.get(
      `${DB_URL}/posts?_expand=author&_page=${page}&_limit=${itemsPerPage}&q=${searchQuery}`
    );
    const data: Post[] = response.data;

    const totalItems: number = parseInt(response.headers["x-total-count"], 10);
    if (!data || data.length == 0) {
      notif.newNotification("The post list is empty", NotificationType.danger);
      return undefined;
    }
    notif.newNotification(
      "Succesfully fetched posts data",
      NotificationType.success
    );
    return [data, totalItems];
  } catch (error) {
    notif.newNotification(
      `Failed to fetch posts data : ${error}`,
      NotificationType.danger
    );
    return undefined;
  }
};

const getPost = async (id: string) => {
  const notif = useNotificationStore();
  try {
    const response = await Axios.get(`${DB_URL}/posts/${id}?_expand=author`);
    const data = response.data;
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
