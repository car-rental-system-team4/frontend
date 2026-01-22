import axios from "axios";

// Base URL for your Spring Boot Backend
const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to add Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- API Functions ---

// Auth
export const signup = (userData) => api.post("/auth/register", userData); 
export const login = (loginData) => api.post("/auth/login", loginData);   

// Users
export const getMyProfile = () => api.get("/users/profile");     
export const updateProfile = (userData) => api.put("/users/profile", userData); 

// Cars (For Admin & Customer)
export const getAllCars = () => api.get("/cars"); 
export const addVehicle = (vehicleData) => api.post("/vehicles", vehicleData); 

// Bookings
export const createBooking = (bookingData) => api.post("/bookings", bookingData); 

export default api;