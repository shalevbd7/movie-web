import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3500/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let wasLoggedIn = false;
window.addEventListener("user-logged-in", () => {
  wasLoggedIn = true;
});
window.addEventListener("user-logged-out", () => {
  wasLoggedIn = false;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (wasLoggedIn) {
        toast.error("You need to log in again.");
      }
    } else if (error.response?.status === 404) {
      toast.error("Page not found.");
    } else if (error.response?.status >= 500) {
      toast.error("Internal server error.");
    } else if (!error.response) {
      toast.error("Error, check your connection.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
