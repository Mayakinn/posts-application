<script setup lang="ts">
import { useNotificationStore } from '@/store/NotificationStore';
import { Status } from '@/typings/interface/Status';

const notifs = useNotificationStore()

</script>

<template>
    <button @click="notifs.newNotification(`success`, Status.success)" class="button">ADD SUCCESS NOTIFICATION</button>
    <button @click="notifs.newNotification(`info`, Status.info)" class="button">ADD INFO NOTIFICATION</button>
    <button @click="notifs.newNotification(`danger`, Status.danger)" class="button">ADD DANGER NOTIFICATION</button>
    <button @click="notifs.newNotification(`warning`, Status.warning)" class="button">ADD WARNING NOTIFICATION</button>
    <div id="notif">
        <div v-for="notif in notifs.Notifs">
            <div key="Math.random()">
                <div v-if="notif.status == Status.success" class="notification is-success">{{notif.message}}</div>
                <div v-else-if="notif.status == Status.info" class="notification is-info">{{notif.message}}</div>
                <div v-else-if="notif.status == Status.danger" class="notification is-danger">{{notif.message}}</div>
                <div v-else class="notification is-warning">{{notif.message}}</div>
            </div>
        </div>
    </div>
</template>