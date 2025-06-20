import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Status } from '@/typings/interface/Status'
import { type Notification } from '@/typings/interface/Notification'

export const useNotificationStore = defineStore('status', () => {

    const Notifs = ref<Notification[]>([])
    
    function newNotification(message : string, status : Status) {
        const notification = { message, status}
        Notifs.value.push(notification)
        setTimeout(function(){
                    Notifs.value.shift()
                }, 5000)
    }
    return { Notifs, newNotification }
})