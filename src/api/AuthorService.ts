import Axios from 'axios'
import { useNotificationStore } from '@/store/NotificationStore'
import { Status } from '@/typings/interface/Status'


const getAuthors = async () => {
    const notif = useNotificationStore()
    try {
        const response = await Axios.get("http://localhost:3000/authors")
        const data = response.data
        notif.newNotification('Succesfully fetched Author data', Status.success)
        return data;
    }
    catch (error){
        notif.newNotification('Failed to fetch author data', Status.danger)
    }
}

export {
    getAuthors,
}