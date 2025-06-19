import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useNotificationStore = defineStore('status', () => {
    const status = ref<string[]>(["success"]);

    return status
})