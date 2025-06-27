<script setup lang="ts">
import { useNotificationStore } from "@/store/NotificationStore";
import { NotificationType } from "@/typings/interface/NotificationType";

const notifs = useNotificationStore();
</script>

<template>
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
