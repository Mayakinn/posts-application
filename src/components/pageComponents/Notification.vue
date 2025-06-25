<script setup lang="ts">
import { useNotificationStore } from '@/store/NotificationStore';
import { Status } from '@/typings/interface/Status';

const notifs = useNotificationStore()

</script>

<template>
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