import { create } from "zustand";
import { subscriptionsAPI, apiHelper } from "../services/api";

export const useSubscriptionsStore = create((set, get) => ({
  subscriptions: [],
  loading: false,
  error: null,

  // Helper to set error state
  setError: (error) => set({ error, loading: false }),

  // Helper to clear error
  clearError: () => set({ error: null }),

  loadSubscriptions: async () => {
    set({ loading: true, error: null });
    try {
      const data = await subscriptionsAPI.getAllSubs();
      set({
        subscriptions: Array.isArray(data) ? data : data.subscriptions || [],
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = apiHelper.handleError(err);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  addSubscription: async (memberId, movieId, watchedDate) => {
    set({ loading: true, error: null });
    try {
      const newSubscription = await subscriptionsAPI.addSubscription(
        memberId,
        movieId,
        watchedDate
      );

      // Add to local state if API returns the new subscription
      if (newSubscription) {
        const currentSubs = get().subscriptions;
        set({
          subscriptions: [...currentSubs, newSubscription],
          loading: false,
          error: null,
        });
      } else {
        // Reload all subscriptions if API doesn't return the new one
        await get().loadSubscriptions();
      }
    } catch (err) {
      const error = apiHelper.handleError(err);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  updateWatchedDate: async (memberId, movieId, watchedDate) => {
    set({ loading: true, error: null });
    try {
      await subscriptionsAPI.updateWatchedDate(memberId, movieId, watchedDate);

      // Update local state
      const currentSubs = get().subscriptions;
      const updatedSubs = currentSubs.map((sub) =>
        sub.memberId === memberId && sub.movieId === movieId
          ? { ...sub, watchedDate }
          : sub
      );

      set({
        subscriptions: updatedSubs,
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = apiHelper.handleError(err);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  removeSubscription: async (memberId, movieId) => {
    set({ loading: true, error: null });
    try {
      await subscriptionsAPI.removeSubscription(memberId, movieId);

      // Remove from local state
      const currentSubs = get().subscriptions;
      const filteredSubs = currentSubs.filter(
        (sub) => !(sub.memberId === memberId && sub.movieId === movieId)
      );

      set({
        subscriptions: filteredSubs,
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = apiHelper.handleError(err);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  // Additional utility methods
  getSubscriptionsByMember: (memberId) => {
    return get().subscriptions.filter((sub) => sub.memberId === memberId);
  },

  getSubscriptionsByMovie: (movieId) => {
    return get().subscriptions.filter((sub) => sub.movieId === movieId);
  },

  getSpecificSubscription: (memberId, movieId) => {
    return get().subscriptions.find(
      (sub) => sub.memberId === memberId && sub.movieId === movieId
    );
  },

  getMoviesByMember: async (memberId) => {
    try {
      const data = await subscriptionsAPI.getMoviesByMember(memberId);
      return data;
    } catch (err) {
      const error = apiHelper.handleError(err);
      throw error;
    }
  },

  getMembersByMovie: async (movieId) => {
    try {
      const data = await subscriptionsAPI.getMembersByMovie(movieId);
      return data;
    } catch (err) {
      const error = apiHelper.handleError(err);
      throw error;
    }
  },

  getMemberStats: async (memberId) => {
    try {
      const data = await subscriptionsAPI.getMemberStats(memberId);
      return data;
    } catch (err) {
      const error = apiHelper.handleError(err);
      throw error;
    }
  },

  getMovieStats: async (movieId) => {
    try {
      const data = await subscriptionsAPI.getMovieStats(movieId);
      return data;
    } catch (err) {
      const error = apiHelper.handleError(err);
      throw error;
    }
  },
}));
