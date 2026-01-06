import apiClient from "./apiClient";

/**
 * Authentication API Service
 */
const authAPI = {
  /**
   * Generate JWT token
   * @param {Object} user - User data
   * @returns {Promise<Object>} Token response
   */
  generateToken: async (user) => {
    const response = await apiClient.post("/auth/token", user);
    return response.data;
  },

  /**
   * Check if email exists
   * @param {string} email - Email to check
   * @returns {Promise<Object>} Exists response
   */
  checkEmail: async (email) => {
    const response = await apiClient.get("/auth/check-email", {
      params: { email },
    });
    return response.data;
  },

  /**
   * Save token to localStorage
   * @param {string} token - JWT token
   */
  saveToken: (token) => {
    localStorage.setItem("token", token);
  },

  /**
   * Get token from localStorage
   * @returns {string|null} JWT token
   */
  getToken: () => {
    return localStorage.getItem("token");
  },

  /**
   * Remove token from localStorage
   */
  removeToken: () => {
    localStorage.removeItem("token");
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authAPI;
