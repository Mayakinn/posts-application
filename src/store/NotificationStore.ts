import { defineStore } from "pinia";
import { ref } from "vue";
import { NotificationType } from "@/typings/interface/NotificationType";
import { type Notification } from "@/typings/interface/Notification";

export const useNotificationStore = defineStore("notification", () => {
  const idCounter = ref<number>(0);
  const Notifs = ref<Notification[]>([]);

  function deleteNotification(id: number) {
    Notifs.value = Notifs.value.filter((n) => n.id !== id);
  }

  function newNotification(message: string, status: NotificationType) {
    const id = idCounter.value++;
    const notification = { message, status, id };
    Notifs.value.push(notification);
    setTimeout(() => {
      deleteNotification(id);
    }, 5000);
  }

  return { Notifs, deleteNotification, newNotification };
});
