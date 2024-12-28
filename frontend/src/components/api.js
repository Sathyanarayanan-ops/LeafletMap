
import axios from "axios";

// Retrieve token from localStorage
const token = localStorage.getItem("token");

// Create Axios instance with default settings
const apiClient = axios.create({
    baseURL: "http://localhost:8000/api", // Base URL for all API calls
    withCredentials: false, // No cookies required since we're using Authorization headers
    headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header if token exists
    },
});

// Add interceptor to include token dynamically on every request
apiClient.interceptors.request.use(
    (config) => {
        const updatedToken = localStorage.getItem("token"); // Get latest token before every request
        if (updatedToken) {
            config.headers.Authorization = `Bearer ${updatedToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
