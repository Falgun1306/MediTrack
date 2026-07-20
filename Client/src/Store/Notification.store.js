import { create } from "zustand";
import { axiosInstance } from "../utilities/axiosInstance"
import useUIStore from "./UI.store";

const store = (set)=>({
    notifications: [],

    fetchAllNotifications: async ()=>{
        try{
          useUIStore.getState().setIsLoading(true);
          const response = await axiosInstance('/notifications/get-notifications');
        //   console.log(response);
          set({notifications: response.data.data})
        }catch(error){
           alert(error);
        }finally{
            useUIStore.getState().setIsLoading(false);
        }
    },

    fetchNotificationsByMember: async (memberId)=>{
        try{
          useUIStore.getState().setIsLoading(true);
          const response = await axiosInstance(`/notifications/get-notificatios-by-family-member/${memberId}`);
        //   console.log(response);
          set({notifications: response.data.data})
        }catch(error){
           alert(error);
        }finally{
            useUIStore.getState().setIsLoading(false);
        }
    }
})

const useNotificationStore = create(store);

export default useNotificationStore;