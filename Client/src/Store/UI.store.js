import { create } from "zustand";

const store = (set)=>({
    isLoading: false,
    setIsLoading: (condition)=>{
        set({isLoading: condition})
    }
});

const useUIStore = create(store);

export default useUIStore;