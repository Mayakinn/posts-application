import Axios from "axios";
import { useNotificationStore } from "@/store/NotificationStore";
import { NotificationType } from "@/typings/interface/NotificationType";
import type { Author } from "@/typings/interface/Author";

const DB_URL = import.meta.env.VITE_JSON_SERVER;

const getAuthors = async (
  page = 1,
  itemsperPage = 3
): Promise<[Author[], number] | undefined> => {
  const notif = useNotificationStore();
  try {
    const response = await Axios.get(
      `${DB_URL}/authors?_page=${page}&_limit=${itemsperPage}`
    );
    const data: Author[] = response.data;

    const totalItems: number = parseInt(response.headers["x-total-count"], 10);

    if (!data) {
      notif.newNotification(
        "The author list is empty",
        NotificationType.danger
      );
      return undefined;
    }
    notif.newNotification(
      "Succesfully fetched Author data",
      NotificationType.success
    );
    return [data, totalItems];
  } catch (error) {
    notif.newNotification(
      `Failed to fetch author data : ${error}`,
      NotificationType.danger
    );
    return undefined;
  }
};

export { getAuthors };
