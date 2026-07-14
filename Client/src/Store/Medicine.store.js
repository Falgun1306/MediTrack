import {create} from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../utilities/axiosInstance";
import useUIStore from "./UI.store";
import useFamilyStore from "./FamilyMembers.store";

const store = (set)=>({
    showAddMedicine:false,
    setShowAddMedicine: (value)=>{
        set({showAddMedicine:value});
    },

    memberIdForMedicine: null,
    setMemberIdForMedicine: (id)=>{
       set({memberIdForMedicine: id})
    },

    memberNameForMedicine: null,
    setMemberNameForMedicine: (name)=>{
       set({memberNameForMedicine: name})
    },

    medicines:[],
    setMedicines: (medicines)=>{
        set({medicines:medicines});
    },

    AllMedicines:[],
    setAllMedicines: (allMedicines)=>{
        set({AllMedicines: allMedicines});
    },

    fetchMedicines: async (familyMemberId)=>{
        try{
            useUIStore.getState().setIsLoading(true); 
            const response = await axiosInstance.get(`/medicines/get-member-medicines/${familyMemberId}`);

            // console.log(response);
            set({medicines: response.data.data});
        }catch(error){
            console.log("Error fetching medicines: ", error);
        }finally{
            useUIStore.getState().setIsLoading(false); 
        }
    },

    fetchAllMedicines: async ()=>{
        try{
            useUIStore.getState().setIsLoading(true); 
            const response = await axiosInstance.get(`/medicines/all-medicines`);
            // console.log(response);
            set({AllMedicines: response.data.data});
        }catch(error){
            console.log("Error fetching medicines: ", error);
        }finally{
            useUIStore.getState().setIsLoading(false); 
        }
    },
    
    fetchMedicinesByMember: async (memberId)=>{
        try{
            useUIStore.getState().setIsLoading(true); 
            const response = await axiosInstance.get(`/medicines/get-member-medicines/${memberId}`);
            // console.log(response);
            set({AllMedicines: response.data.data});
        }catch(error){
            console.log("Error fetching medicines: ", error);
        }finally{
            useUIStore.getState().setIsLoading(false); 
        }
    }

});

const useMedicineStore = create(persist(store));

export default useMedicineStore;