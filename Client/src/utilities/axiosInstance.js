import axios from 'axios'

const DB_URL = import.meta.env.VITE_DB_URL;

export const axiosInstance = axios.create({
    baseURL: DB_URL,
    withCredentials: true
})

// Global 401 interceptor — if any API call returns 401 (session expired / no cookie),
// automatically clear local auth state and redirect to login.
// This prevents the app from ever being in a "fake logged in" state.
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Dynamically import to avoid circular dependency with Auth.store
            import('../Store/Auth.store.js').then(({ default: AuthStore }) => {
                const state = AuthStore.getState();
                // Only redirect if the user was previously authenticated
                // (avoids infinite redirect loops on the login page)
                if (state.isAuthenticated) {
                    state.logout();
                    window.location.href = '/login';
                }
            });
        }
        return Promise.reject(error);
    }
);