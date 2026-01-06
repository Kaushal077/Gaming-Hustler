import { useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    timeout: 10000, // 10 second timeout to prevent hanging requests
  });

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
      return config;
    });

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        throw error;
      }
    );

    return () => {
      // Clean up interceptors when the component unmounts
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance]);

  return axiosInstance;
};

export default useAxiosFetch;
