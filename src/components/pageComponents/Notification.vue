<script setup lang="ts">
import { useNotificationStore } from "@/store/NotificationStore";
import { NotificationType } from "@/typings/interface/NotificationType";

const notifs = useNotificationStore();
</script>

<template>
  <button
    @click="
      notifs.newNotification(
        'hello this is a red notification and very cool one at that too yes i do enjoy this one very much',
        NotificationType.danger
      )
    "
  >
    press for red notif
  </button>
  <button
    @click="
      notifs.newNotification(
        'hello this is a red notification and very cool one at that too yes i do enjoy this one very much',
        NotificationType.success
      )
    "
  >
    press for red notif
  </button>
  <div id="notif">
    <div v-for="notif in notifs.Notifs" key="notif.id">
      <div
        v-if="notif.status == NotificationType.success"
        class="notification is-success"
      >
        <button
          @click="notifs.deleteNotification(notif.id)"
          class="delete"
        ></button>
        {{ notif.message }}
      </div>
      <div
        v-else-if="notif.status == NotificationType.info"
        class="notification is-info"
      >
        <button
          @click="notifs.deleteNotification(notif.id)"
          class="delete"
        ></button>
        {{ notif.message }}
      </div>
      <div
        v-else-if="notif.status == NotificationType.danger"
        class="notification is-danger"
      >
        <button
          @click="notifs.deleteNotification(notif.id)"
          class="delete"
        ></button>
        {{ notif.message }}
      </div>
      <div v-else class="notification is-warning">
        <button
          @click="notifs.deleteNotification(notif.id)"
          class="delete"
        ></button>
        {{ notif.message }}
      </div>
    </div>
  </div>
</template>
