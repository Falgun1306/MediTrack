import { create } from 'zustand'
import { axiosInstance } from '../utilities/axiosInstance.js';
import { toast } from 'react-toastify';
import useFamilyStore from './FamilyMembers.store.js';
import useMedicineStore from './Medicine.store.js';
import useNotificationStore from './Notification.store.js';

const store = (set) => ({
  isAuthenticated: false,
  isAuthLoading: true,
  setIsAuthenticated: (value) => {
    set({
      isAuthenticated: value,
      isAuthLoading: false
    })
  },

  setAuthUser: (user) => {
    set({ user })
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
    // 1. Clear auth state immediately (optimistic)
    set({
      isAuthenticated: false,
      user: null,
      isAuthLoading: false
    });

    // 2. Reset all other stores to prevent stale data
    useFamilyStore.getState().setMembers([]);
    useFamilyStore.getState().setMemberId(null);
    useFamilyStore.getState().setMemberName('');

    useMedicineStore.getState().setMedicines([]);
    useMedicineStore.getState().setAllMedicines([]);
    useMedicineStore.getState().setMemberIdForMedicine(null);
    useMedicineStore.getState().setMemberNameForMedicine(null);

    useNotificationStore.setState({ notifications: [] });

    // 3. Clean up any leftover localStorage keys from old persist middleware
    try {
      localStorage.removeItem('medicine-storage');
      localStorage.removeItem('notification-storage');
      localStorage.removeItem('family-storage');
    } catch {
      // localStorage may not be available
    }

    // 4. Call backend to clear the HTTP-only cookie
    try {
      const response = await axiosInstance.post('/user/logout');
      toast.success(response.data.message || "Logout successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  }
})

const AuthStore = create(store);

export default AuthStore;