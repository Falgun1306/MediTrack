import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { axiosInstance } from '../utilities/axiosInstance';
import useUIStore from './UI.store';



const store = (set) => ({ 
    totalMembers: 0,
    setTotalMembers: (count) => {
        set({
            totalMembers: count
        })
    },

    showAddMember: false,
    setShowAddMember: (showOrHide) => {
        set({
            showAddMember: showOrHide
        })
    },

    members: [],
    setMembers: (newMember) => {
        set({
            members: newMember
        })
    },
 
    //This will help to fetch medicines for a particular member
    memberId: null,
    setMemberId: (id) => {
        set({
            memberId: id
        })
    },

    memberName: '',
    setMemberName: (name) => {
        set({
            memberName: name
        })
    },

    fetchMember: async () => {
        try {
            useUIStore.getState().setIsLoading(true);  
            const response = await axiosInstance.get(
                '/family-members/get-members'
            );
                     
            set({ members: response.data.Members });
            // set({totalMembers: members.length});
            
        } catch (error) {
            console.log("Fetch error:", error);
        }finally{
            useUIStore.getState().setIsLoading(false);
        }
    },

});

const useFamilyStore = create(store, {
        name: 'family-storage',
       }
    );

export default useFamilyStore