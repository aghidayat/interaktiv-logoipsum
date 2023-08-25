import axios, { AxiosInstance, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.someexample.com', // Replace with API base URL
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Modify config here (e.g., add headers, authentication)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify response data here
    return response;
  },
  (error) => {
    // Handle global errors here
    return Promise.reject(error);
  }
);

export default instance;
