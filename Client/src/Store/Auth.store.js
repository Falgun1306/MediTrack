import { create } from 'zustand'
import { axiosInstance } from '../utilities/axiosInstance.js';
import { toast } from 'react-toastify';

const store = (set) => ({
  isAuthenticated: false,
  isAuthLoading: true,
  setIsAuthenticated: (value) => {
    set({
      isAuthenticated: value
    })
  },

  user: null,
  checkAuth: async () => {
    set({ isAuthLoading: true });
    try {
      const response = await axiosInstance.get('/user/me');
      set({
        isAuthenticated: true,
        user: response.data.user,
        isAuthLoading: false
      });
    } catch {
      set({
        isAuthenticated: false,
        user: null,
        isAuthLoading: false
      });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post('/user/logout');

      toast.success(response.data.message || "Logout successfully");
      set({
        isAuthenticated: false,
        user: null,
        isAuthLoading: false
      });
    }catch(error){
      toast.error(error);
    }
  }
})

const AuthStore = create(store);

export default AuthStore;