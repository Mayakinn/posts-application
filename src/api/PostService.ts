import Axios, { isAxiosError } from "axios";
import { useNotificationStore } from "@/store/NotificationStore";
import { NotificationType } from "@/typings/interface/NotificationType";
import type { Post } from "@/typings/interface/Post";
import { useAuthStore } from "@/store/AuthStore";
import { v4 as uuidv4 } from "uuid";

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

const getPost = async (id: string | number) => {
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

const deletePost = async (postId: number | string) => {
  const notif = useNotificationStore();
  const auth = useAuthStore();

  let config = {
    headers: {
      Authorization: "Bearer " + auth.jwtToken,
    },
  };
  try {
    const response = await Axios.delete(`${DB_URL}/posts/${postId}`, config);
    notif.newNotification("Post deleted succesfully", NotificationType.success);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.status == 404) {
        notif.newNotification(
          `Post not Found: ${error.status} `,
          NotificationType.danger
        );
        return Response.error;
      } else {
        notif.newNotification(
          `Network error: ${error.code}`,
          NotificationType.danger
        );
        return;
      }
    } else {
      notif.newNotification(
        `Post deletion failed. ${error} `,
        NotificationType.danger
      );
      return Response.error;
    }
  }
};

const editPost = async (
  postId: number | string,
  title: string,
  body: string,
  createdDate: Date,
  authorId: number | string
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
      `${DB_URL}/posts/${postId}`,
      {
        id: postId,
        title: title,
        body: body,
        authorId: authorId,
        userId: auth.userId,
        created_at: createdDate,
        updated_at: Date.now(),
      },
      config
    );
    notif.newNotification("Post edited succesfully", NotificationType.success);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.status == 404) {
        notif.newNotification(
          `Post not Found: ${error.status} `,
          NotificationType.danger
        );
        return Response.error;
      } else {
        notif.newNotification(
          `Network error: ${error.code}`,
          NotificationType.danger
        );
        return;
      }
    } else {
      notif.newNotification(
        `Post editing failed. ${error} `,
        NotificationType.danger
      );
      return Response.error;
    }
  }
};

export { getPosts, getPost, createPost, editPost };
