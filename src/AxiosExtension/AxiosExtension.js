import axios from 'axios';
import store from '../Redux/Store/store';
import { logout } from '../Redux/Reducers/authslice'; // Import your logout action

const axiosInstance = axios.create();

// Add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response && error.response.status === 401) {
      // Trigger the logout action when a 401 error occurs
      store.dispatch(logout());
      console.log("ok")
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;