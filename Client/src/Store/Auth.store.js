import { create } from 'zustand'
import { axiosInstance } from '../utilities/axiosInstance.js';
import { persist } from 'zustand/middleware';
import useFamilyStore from './FamilyMembers.store.js';
import { toast } from 'react-toastify';

const store = (set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value) => {
    set({
      isAuthenticated: value
    })
  },

  user: null,
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/user/me');
      set({
        isAuthenticated: true,
        user: response.data.user
      });
    } catch {
      set({
        isAuthenticated: false,
        user: null
      });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post('/user/logout');

      // console.log(response);

      toast.success(response.data.message || "Logout successfully");
      set({
        isAuthenticated: false,
      });
    }catch(error){
      toast.error(error);
    }
  }
})

const AuthStore = create(persist(store));

export default AuthStore;