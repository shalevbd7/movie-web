import { create } from "zustand";
import { membersAPI, apiHelper } from "../services/api";

export const useMembersStore = create((set, get) => ({
  members: [],
  loading: false,
  error: null,

  setError: (error) => set({ error, loading: false }),

  clearError: () => set({ error: null }),

  loadMembers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await membersAPI.getAllMembers();
      set({
        members: Array.isArray(data) ? data : data.members || [],
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = apiHelper.handleError(err);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  addMember: async (memberData) => {
    set({ loading: true, error: null });
    try {
      const newMember = await membersAPI.createMember(memberData);

      const currentMembers = get().members;
      set({
        members: [...currentMembers, newMember],
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = apiHelper.handleError(err);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  updateMember: async (id, memberData) => {
    set({ loading: true, error: null });
    try {
      const updatedMember = await membersAPI.updateMember(id, memberData);

      const currentMembers = get().members;
      const updatedMembers = currentMembers.map((member) =>
        member._id === id ? { ...member, ...memberData, _id: id } : member
      );

      set({
        members: updatedMembers,
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = apiHelper.handleError(err);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  deleteMember: async (id) => {
    set({ loading: true, error: null });
    try {
      await membersAPI.deleteMember(id);

      // Remove from local state immediately
      const currentMembers = get().members;
      const filteredMembers = currentMembers.filter(
        (member) => member._id !== id
      );

      set({
        members: filteredMembers,
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
  getMemberById: (id) => {
    return get().members.find((member) => member._id === id);
  },

  searchMembers: (searchTerm) => {
    const members = get().members;
    if (!searchTerm) return members;

    return members.filter(
      (member) =>
        member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  getMembersByCity: (city) => {
    const members = get().members;
    return members.filter(
      (member) => member.city.toLowerCase() === city.toLowerCase()
    );
  },
}));
