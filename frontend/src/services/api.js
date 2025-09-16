import axiosInstance from "../utils/axios";

export const authAPI = {
  signup: async (userData) => {
    const response = await axiosInstance.post("/auth/signup", userData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },
  checkAuth: async () => {
    const response = await axiosInstance.get("/auth/authCheck", {
      withCredentials: true,
    });
    return response.data;
  },
};

export const moviesAPI = {
  getAllMovies: async () => {
    const response = await axiosInstance.get("/movies");
    return response.data;
  },

  getMovieById: async (id) => {
    const response = await axiosInstance.get(`/movies/${id}`);
    return response.data;
  },
  searchMovieByName: async (name) => {
    const response = await axiosInstance.get(`/movies/search`, {
      params: { name },
    });
    return response.data;
  },
  searchMoviesByGenre: async (genre) => {
    const response = await axiosInstance.get(`/movies/searchgenre`, {
      params: { genre },
    });
    return response.data;
  },
  createMovie: async (movieData) => {
    const response = await axiosInstance.post("/movies/addmovie", movieData);
    return response.data;
  },

  updateMovie: async (id, movieData) => {
    const response = await axiosInstance.patch(`/movies/${id}`, movieData);
    return response.data;
  },
  deleteMovie: async (id) => {
    const response = await axiosInstance.delete(`/movies/${id}`);
    return response.data;
  },
};
export const membersAPI = {
  getAllMembers: async () => {
    const response = await axiosInstance.get("/members");
    return response.data;
  },

  getMemberById: async (id) => {
    const response = await axiosInstance.get(`/members/${id}`);
    return response.data;
  },
  findMemberByCity: async (city) => {
    const response = await axiosInstance.get(`/members/searchcity`, {
      params: { city },
    });
    return response.data;
  },
  createMember: async (memberData) => {
    const response = await axiosInstance.post("/members/addmember", memberData);
    return response.data;
  },
  updateMember: async (id, memberData) => {
    const response = await axiosInstance.patch(`/members/${id}`, memberData);
    return response.data;
  },
  deleteMember: async (id) => {
    const response = await axiosInstance.delete(`/members/${id}`);
    return response.data;
  },
};
export const subscriptionsAPI = {
  getAllSubs: async () => {
    const response = await axiosInstance.get("/subs");
    return response.data;
  },
  getSubById: async (id) => {
    const response = await axiosInstance.get(`/subs/${id}`);
    return response.data;
  },
  getSpesificSub: async (memberId, movieId) => {
    const response = await axiosInstance(`/subs/subscription`, {
      params: { memberId, movieId },
    });
    return response.data;
  },
  getMoviesByMember: async (memberId) => {
    const response = await axiosInstance.get(
      `/subs/members/${memberId}/movies`
    );
    return response.data;
  },
  getMembersByMovie: async (movieId) => {
    const response = await axiosInstance.get(`/subs/movies/${movieId}`);
    return response.data;
  },
  getSubscriptionsByMember: async (memberId) => {
    const response = await axiosInstance.get(
      `/subs/members/${memberId}/subscriptions`
    );
    return response.data;
  },
  getMemberStats: async (memberId) => {
    const response = await axiosInstance.get(`/subs/members/${memberId}/stats`);
    return response.data;
  },
  getMovieStats: async (movieId) => {
    const response = await axiosInstance.get(`/subs/movies/${movieId}/stats`);
    return response.data;
  },
  addSubscription: async (memberId, movieId, watchedDate) => {
    const response = await axiosInstance.post("/subs/addsubscription", {
      memberId,
      movieId,
      watchedDate,
    });
    return response.data;
  },
  updateWatchedDate: async (memberId, movieId, watchedDate) => {
    const response = await axiosInstance.patch("/subs/updatedate", {
      memberId,
      movieId,
      watchedDate,
    });
    return response.data;
  },

  removeSubscription: async (memberId, movieId) => {
    const response = await axiosInstance.delete("/subs/removesubscription", {
      data: { memberId, movieId },
    });
    return response.data;
  },
};

export const apiHelper = {
  handleError: (error) => {
    if (error.response) {
      return {
        message: error.response.data?.message || "Server error occurred",
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        message: "Network error - please check your connection",
        status: 0,
        data: null,
      };
    } else {
      return {
        message: error.message || "An unexpected error occurred",
        status: -1,
        data: null,
      };
    }
  },

  formatDate: (date) => {
    return new Date(date).toLocaleDateString("he-IL");
  },

  validateEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
};
