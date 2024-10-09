import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast'
axios.defaults.withCredentials = true;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const userStore = create((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: true,

  signUp: async (userData) => {
    const { fullName, email, password, profileImage } = userData;

    set({
      isLoading: true,
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
        isLoading: false,
        isAuthenticated: true,
        isCheckingAuth: false,
      });

      return response.data.message;
    } catch (error) {
      set({
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (userData) => {
    const { email, password } = userData;
    set({
      isLoading: true,
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/login`, { email, password });

      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
      return response.data.message;
    } catch (error) {
      set({
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({
      isLoading: true,
    });

    try {
      const response = await axios.get(`${BACKEND_URL}/logout`);
      set({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });

      return response.data.message;
    } catch (error) {
      set({
        isLoading: false,
      });
      throw error;
    }
  },

  updateProfile: async (userData) => {
    const { fullName, email, profileImage } = userData;
    set({
      isLoading: true,
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
        isLoading: false,
      });

      return response.data.message;
    } catch (error) {
      set({
        isLoading: false,
      });
      throw error;
    }
  },

  updatePassword: async (password) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/update-password`, { password });
      set({
        isLoading: false,
        isCheckingAuth: false,
      });

      return response.data.message;
    } catch (error) {
      set({
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (emailOtp) => {
    set({
      isLoading: true,
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/verify-email`, { emailOtp });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        // isCheckingAuth: true,
      });

      return response.data.message;
    } catch (error) {
      set({
        isLoading: false,
      });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({
      isLoading: true,
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/reset-password`, { email });
      set({
        error: null,
        message: response.data.message,
        isLoading: false,
      });

      return response.data.message;
    } catch (error) {
      set({
        isLoading: false,
      });
      throw error;
    }
  },

  changePassword: async (token, password) => {
    set({
      isLoading: true,
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/change-password/${token}`, { password });
      set({
        isLoading: false,
      });

      return response.data.message;
    } catch (error) {
      set({
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({
      isCheckingAuth: true,
    });

    try {
      const response = await axios.get(`${BACKEND_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: response?.data?.user?.isVerified,
        isCheckingAuth: false,
      });

      return response.data.message;
    } catch (error) {
      set({
        isCheckingAuth: false,
      });
    }
  },

  resendOtp: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/resend-otp`);

      return response.data.message;
    } catch (error) {
      throw error;
    }
  },

}));

export { userStore };