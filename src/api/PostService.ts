import Axios from "axios";
import { useNotificationStore } from "@/store/NotificationStore";
import { Status } from "@/typings/interface/Status";

const getPosts = async () => {
  const notif = useNotificationStore();
  try {
    const response = await Axios.get("http://localhost:3000/posts");
    const data = response.data;
    if (!data) {
      notif.newNotification("The post list is empty", Status.danger);
      return;
    }
    notif.newNotification("Succesfully fetched post data", Status.success);
    return data;
  } catch (error) {
    notif.newNotification(
      `Failed to fetch post data : ${error}`,
      Status.danger
    );
  }
};

export { getPosts };
