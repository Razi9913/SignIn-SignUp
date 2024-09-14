import { create } from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials = true;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const userStore = create((set) => ({
  user: null,
  error: null,
  message: null,
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: true,

  signUp: async (userData) => {
    const { fullName, email, password } = userData;

    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/sign-up`, { fullName, email, password });
      set({
        user: response.data.user,
        error: null,
        message: response.data.message,
        isLoading: false,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message,
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (userData) => {
    const { email, password } = userData;
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/login`, { email, password });
      set({
        user: response.data.user,
        error: null,
        message: response.data.message,
        isLoading: false,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || 'Error signing in',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await axios.get(`${BACKEND_URL}/logout`);
      set({
        user: null,
        error: null,
        message: response.data.message,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message,
        isLoading: false,
      });
      throw error;
    }
  },

  updateProfile: async (userData) => {
    const { fullName, email } = userData;
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/update-profile`, { fullName, email });
      set({
        user: response.data.user,
        error: null,
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message,
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (emailOtp) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/verify-email`, { emailOtp });
      set({
        user: response.data.user,
        message: response.data.message,
        error: null,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message,
        isLoading: false,
      });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/reset-password`, { email });
      set({
        error: null,
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || 'Error sending reset link',
        isLoading: false,
      });
      throw error;
    }
  },

  changePassword: async (token, password) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/change-password/${token}`, { password });
      set({
        message: response.data.message,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message,
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({
      isCheckingAuth: true,
      error: null,
    });

    try {
      const response = await axios.get(`${BACKEND_URL}/check-auth`);
      set({
        user: response.data.user,
        error: null,
        isAuthenticated: !!response.data.user,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        error: null,
        isCheckingAuth: false,
      });
    }
  },

  resendOtp: async () => {
    set({
      error: null,
    });

    try {
      const response = await axios.get(`${BACKEND_URL}/resend-otp`);
      set({
        message: response.data.message,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response.data.message,
      });
      throw error;
    }
  },
}));

export { userStore };