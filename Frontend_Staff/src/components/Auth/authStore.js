// stores/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";
axios.defaults.withCredentials = true;

export const useAuthStore = create(
  (set, get) => ({
    user: null,
    role: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    isCheckingAuth: true,
    message: null,

    login: async (email, password) => {
      set({ loading: true, error: null, isAuthenticated: false });
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/staff/login`, {
          email,
          password,
        });
        set({
          user: response.data.user,
          role: response.data.user.role,
          loading: false,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      } catch (error) {
        console.log(error);
        set({ error: error.response.data.message, loading: false });
        throw error;
      }
    },

    logout: async () => {
      set({ loading: true, error: null });
      try {
        await axios.post(`${API_BASE_URL}/auth/staff/logout`);
        set({ user: null, isAuthenticated: false, loading: false, role: null });
      } catch (error) {
        set({ error: error.response.data.message, loading: false });
        throw error;
      }
    },

    initializeAuth: async () => {
      set({ loading: true, isCheckingAuth: true, error: null });
      try {
        const res = await axios.get(`${API_BASE_URL}/auth/staff/checkAuth`);
        console.log(res, "response");
        set({
          user: res.data?.user,
          isAuthenticated: true,
          role: res.data?.user?.role,
          loading: false,
          isCheckingAuth: false,
        });
      } catch (error) {
        // console.log(error, "here");
        set({ isAuthenticated: false, loading: false, isCheckingAuth: false });
        set({ error: error.response?.data?.message });
        // throw error;
      }
    },

    hasRole: (requiredRole) => {
      const { role } = get();
      console.log(role, requiredRole, "here");
      if (!role) return false;
      return Array.isArray(requiredRole)
        ? requiredRole.includes(role)
        : role === requiredRole;
    },
  }),
  {
    name: "auth-storage",
    partialize: (state) => ({
      user: state.user,
      role: state.role,
    }),
  }
);
