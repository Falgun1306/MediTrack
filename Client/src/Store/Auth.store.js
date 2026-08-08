import { create } from 'zustand'
import { axiosInstance } from '../utilities/axiosInstance.js';
import { toast } from 'react-toastify';
import useFamilyStore from './FamilyMembers.store.js';
import useMedicineStore from './Medicine.store.js';
import useNotificationStore from './Notification.store.js';

// Helper: reset all data stores to initial state
const clearAllStores = () => {
  useFamilyStore.setState({
    members: [],
    totalMembers: 0,
    memberId: null,
    memberName: '',
    showAddMember: false,
  });

  useMedicineStore.setState({
    medicines: [],
    AllMedicines: [],
    showAddMedicine: false,
    memberIdForMedicine: null,
    memberNameForMedicine: null,
  });

  useNotificationStore.setState({
    notifications: [],
  });

  // Clean up any leftover localStorage & auth token
  try {
    localStorage.removeItem('meditrack_token');
    localStorage.removeItem('medicine-storage');
    localStorage.removeItem('notification-storage');
    localStorage.removeItem('family-storage');
  } catch {
    // localStorage may not be available
  }
};

const AuthStore = create((set, get) => ({
  isAuthenticated: false,
  isAuthLoading: true,
  user: null,

  // Called on every page load (App.jsx useEffect) — server is the source of truth
  checkAuth: async () => {
    set({ isAuthLoading: true });
    try {
      const response = await axiosInstance.get('/user/me');
      set({
        isAuthenticated: true,
        user: response.data.user,
        isAuthLoading: false,
      });
    } catch {
      // Cookie/token missing or invalid — clear everything
      set({
        isAuthenticated: false,
        user: null,
        isAuthLoading: false,
      });
      clearAllStores();
    }
  },

  // Centralized login — handles API call, state, token storage, and data fetching
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/user/login', { email, password });

      // Save token in localStorage for cross-origin backup (Vercel <-> Backend)
      const token = response.data?.token || response.data?.responseData?.token;
      if (token) {
        try {
          localStorage.setItem('meditrack_token', token);
        } catch (err) {
          console.warn("Could not save token to localStorage", err);
        }
      }

      // Set auth state from server response
      set({
        isAuthenticated: true,
        user: response.data?.responseData?.user ?? null,
        isAuthLoading: false,
      });

      // Fetch user's data after successful login
      useFamilyStore.getState().fetchMember();
      useMedicineStore.getState().fetchAllMedicines();
      useNotificationStore.getState().fetchAllNotifications();

      toast.success(response.data.message || "Login Successful");
      return { success: true };
    } catch (error) {
      set({ isAuthenticated: false, user: null, isAuthLoading: false });
      toast.error(error?.response?.data?.message || "Email or password is wrong");
      return { success: false };
    }
  },

  // Centralized logout — clears everything, then tells backend
  logout: async () => {
    // 1. Clear auth state & localStorage token immediately
    set({
      isAuthenticated: false,
      user: null,
      isAuthLoading: false,
    });

    // 2. Reset all other stores and remove local token
    clearAllStores();

    // 3. Tell backend to clear the HTTP-only cookie
    try {
      const response = await axiosInstance.post('/user/logout');
      toast.success(response.data.message || "Logout successfully");
    } catch (error) {
      // Even if backend call fails, local state is already cleared
      console.warn("Logout API call failed:", error?.message);
    }
  },
}));

export default AuthStore;
