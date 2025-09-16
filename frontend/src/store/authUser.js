import { create } from "zustand";
import toast from "react-hot-toast";
import { authAPI, apiHelper } from "../services/api";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningup: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  // Actions
  signup: async (credentials) => {
    try {
      set({ isSigningup: true });
      if (
        !credentials.fullName ||
        !credentials.username ||
        !credentials.password
      ) {
        throw new Error("All fields are required.");
      }
      const data = await authAPI.signup(credentials);
      set({ user: data.user, isSigningup: false });
      toast.success(
        `Welcome ${data.user.fullName}! Account created successfully.`
      );
      return data;
    } catch (error) {
      const errorInfo = apiHelper.handleError(error);
      toast.error(errorInfo.message);
      set({ isSigningup: false, user: null });
      throw error;
    }
  },
  login: async (credentials) => {
    try {
      set({ isLoggingIn: true });
      if (!credentials.username || !credentials.password) {
        throw new Error("Username and password are required.");
      }
      const data = await authAPI.login(credentials);
      set({ user: data.user, isLoggingIn: false });
      toast.success(`Welcome back, ${data.user.fullName}!`);
      return data;
    } catch (error) {
      const errorInfo = apiHelper.handleError(error);
      toast.error(errorInfo.message);
      set({ isLoggingIn: false, user: null });
      throw error;
    }
  },
  logout: async () => {
    try {
      set({ isLoggingOut: true });
      await authAPI.logout();
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Logout error: ", error);
      set({ user: null, isLoggingOut: false });
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const data = await authAPI.checkAuth();
      set({ user: data.user, isCheckingAuth: false });
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
    }
  },
  updateUser: (updatedUser) => {
    set({ user: updatedUser });
  },
}));
