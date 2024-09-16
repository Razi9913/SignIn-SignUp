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
    const { fullName, email, password, profileImage } = userData;
    // console.log("userData:", userData); // Check if the password is present

    set({
      isLoading: true,
      error: null,
    });

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await axios.post(`${BACKEND_URL}/sign-up`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
    const { fullName, email, profileImage } = userData;
    // console.log("userData:", userData); // Check if the password is present
    set({
      isLoading: true,
      error: null,
    });

    try {
      const formData = new FormData();
      if (fullName) formData.append("fullName", fullName);
      if (email) formData.append("email", email);
      if (profileImage) formData.append("profileImage", profileImage);

      const response = await axios.post(`${BACKEND_URL}/update-profile`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
        // isCheckingAuth: true,
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

  clearError: () => {
    set({
      error: null,
    });
  },

  clearMessage: () => {
    set({
      message: null,
    });
  },

}));

export { userStore };