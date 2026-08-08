import axios from 'axios'

const DB_URL = import.meta.env.VITE_DB_URL;

export const axiosInstance = axios.create({
    baseURL: DB_URL,
    withCredentials: true
});

// Attach Authorization header if token exists in localStorage (ensures auth even if cookies are blocked cross-origin)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('meditrack_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Guard against multiple simultaneous 401 redirects
let isLoggingOut = false;

// Global 401 interceptor — auto-logout on expired/invalid session
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && !isLoggingOut) {
            // Dynamic import to avoid circular dependency (axiosInstance ↔ Auth.store)
            const { default: AuthStore } = await import('../Store/Auth.store.js');
            const state = AuthStore.getState();

            // Only auto-logout if the user was previously authenticated
            // (avoids infinite loops on login page where 401 is expected)
            if (state.isAuthenticated) {
                isLoggingOut = true;
                await state.logout();
                window.location.href = '/login';
                // Reset flag after a short delay (page is reloading anyway)
                setTimeout(() => { isLoggingOut = false; }, 2000);
            }
        }
        return Promise.reject(error);
    }
);
