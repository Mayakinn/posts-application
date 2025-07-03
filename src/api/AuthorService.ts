import Axios from "axios";
import { useNotificationStore } from "@/store/NotificationStore";
import { NotificationType } from "@/typings/interface/NotificationType";
import type { Author } from "@/typings/interface/Author";
import { useAuthStore } from "@/store/AuthStore";
import { uniqueId } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

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
    if (data.length == 0) {
      return [data, totalItems];
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

const deleteAuthor = async (authorId: number | string) => {
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
      `Author deletion failed. ${error} `,
      NotificationType.danger
    );

    return;
  }
};

const createAuthor = async (name: string, surname: string) => {
  const notif = useNotificationStore();
  const auth = useAuthStore();

  let config = {
    headers: {
      Authorization: "Bearer " + auth.jwtToken,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await Axios.post(
      `${DB_URL}/authors`,
      {
        id: uuidv4(),
        name: name,
        surname: surname,
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      config
    );
    notif.newNotification(
      "Author created succesfully",
      NotificationType.success
    );
    return response.data;
  } catch (error) {
    notif.newNotification(
      `Author creation failed. User unauthorized or session has ended. ${error} `,
      NotificationType.danger
    );
    auth.logOutUser();
    return;
  }
};

const editAuthor = async (
  authorId: string | number,
  name: string,
  surname: string,
  createdDate: Date
) => {
  const notif = useNotificationStore();
  const auth = useAuthStore();

  let config = {
    headers: {
      Authorization: "Bearer " + auth.jwtToken,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await Axios.put(
      `${DB_URL}/authors/${authorId}`,
      {
        id: authorId,
        name: name,
        surname: surname,
        created_at: createdDate,
        updated_at: Date.now(),
      },
      config
    );
    notif.newNotification(
      "Author edited succesfully",
      NotificationType.success
    );
    return response.data;
  } catch (error) {
    notif.newNotification(
      `Author changes failed. User unauthorized or session has ended. ${error} `,
      NotificationType.danger
    );
    return;
  }
};

const getAuthor = async (id: string | number) => {
  const notif = useNotificationStore();
  try {
    const response = await Axios.get(`${DB_URL}/authors/${id}`);
    const data = response.data;
    if (!data) {
      notif.newNotification("Author does not exist", NotificationType.danger);
      return;
    }
    notif.newNotification(
      "Succesfully fetched author data",
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

export { getAuthors, deleteAuthor, createAuthor, getAuthor, editAuthor };
