import apiClient from "./apiClient";

/**
 * User API Service
 */
const userAPI = {
  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user response
   */
  createUser: async (userData) => {
    const response = await apiClient.post("/users", userData);
    return response.data;
  },

  /**
   * Get all users (Admin only)
   * @returns {Promise<Array>} Array of users
   */
  getAllUsers: async () => {
    const response = await apiClient.get("/users");
    return response.data;
  },

  /**
   * Get user by ID
   * @param {string} id - User ID
   * @returns {Promise<Object>} User data
   */
  getUserById: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Get user by email
   * @param {string} email - User email
   * @returns {Promise<Object>} User data
   */
  getUserByEmail: async (email) => {
    const response = await apiClient.get(`/users/email/${email}`);
    return response.data;
  },

  /**
   * Update user
   * @param {string} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Update response
   */
  updateUser: async (id, userData) => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  },

  /**
   * Delete user (Admin only)
   * @param {string} id - User ID
   * @returns {Promise<Object>} Delete response
   */
  deleteUser: async (id) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};

export default userAPI;
