import Axios from "axios";
import { useNotificationStore } from "@/store/NotificationStore";
import { NotificationType } from "@/typings/interface/NotificationType";
import type { Author } from "@/typings/interface/Author";
import { useAuthStore } from "@/store/AuthStore";

const DB_URL = import.meta.env.VITE_JSON_SERVER;

const getAuthors = async (
  page = 1,
  itemsperPage = 3,
  searchQuery = ""
): Promise<[Author[], number] | undefined> => {
  const notif = useNotificationStore();
  try {
    const response = await Axios.get(
      `${DB_URL}/authors?_page=${page}&_limit=${itemsperPage}&q=${searchQuery}`
    );
    const data: Author[] = response.data;

    const totalItems: number = parseInt(response.headers["x-total-count"], 10);

    if (totalItems == 0) {
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

const deleteAuthor = async (authorId: number) => {
  const notif = useNotificationStore();
  const auth = useAuthStore();

  let config = {
    headers: {
      Authorization: "Bearer " + auth.jwtToken,
    },
  };
  try {
    const response = await Axios.delete(
      `${DB_URL}/authors/${authorId}`,
      config
    );
    notif.newNotification(
      "Author deleted succesfully",
      NotificationType.success
    );
    return response.data;
  } catch (error) {
    notif.newNotification(
      `Author deletion failed. User unauthorized or session has ended. ${error} `,
      NotificationType.danger
    );
    return;
  }
};

export { getAuthors, deleteAuthor };
