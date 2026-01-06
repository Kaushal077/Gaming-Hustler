import apiClient from "./apiClient";

/**
 * Class API Service
 */
const classAPI = {
  /**
   * Create a new class (Instructor only)
   * @param {Object} classData - Class data
   * @returns {Promise<Object>} Created class response
   */
  createClass: async (classData) => {
    const response = await apiClient.post("/classes", classData);
    return response.data;
  },

  /**
   * Get all approved classes
   * @returns {Promise<Array>} Array of classes
   */
  getAllClasses: async () => {
    const response = await apiClient.get("/classes");
    return response.data;
  },

  /**
   * Get all classes for management (Admin only)
   * @returns {Promise<Array>} Array of all classes
   */
  getAllClassesForManagement: async () => {
    const response = await apiClient.get("/classes/manage");
    return response.data;
  },

  /**
   * Get popular classes
   * @returns {Promise<Array>} Array of popular classes
   */
  getPopularClasses: async () => {
    const response = await apiClient.get("/classes/popular");
    return response.data;
  },

  /**
   * Get classes by instructor email
   * @param {string} email - Instructor email
   * @returns {Promise<Array>} Array of instructor's classes
   */
  getClassesByInstructor: async (email) => {
    const response = await apiClient.get(`/classes/instructor/${email}`);
    return response.data;
  },

  /**
   * Get class by ID
   * @param {string} id - Class ID
   * @returns {Promise<Object>} Class data
   */
  getClassById: async (id) => {
    const response = await apiClient.get(`/classes/${id}`);
    return response.data;
  },

  /**
   * Update class (Instructor only)
   * @param {string} id - Class ID
   * @param {Object} classData - Updated class data
   * @returns {Promise<Object>} Update response
   */
  updateClass: async (id, classData) => {
    const response = await apiClient.put(`/classes/${id}`, classData);
    return response.data;
  },

  /**
   * Change class status (Admin only)
   * @param {string} id - Class ID
   * @param {string} status - New status (approved/rejected)
   * @param {string} reason - Reason for rejection (optional)
   * @returns {Promise<Object>} Update response
   */
  changeClassStatus: async (id, status, reason = null) => {
    const response = await apiClient.patch(`/classes/${id}/status`, {
      status,
      reason,
    });
    return response.data;
  },

  /**
   * Delete class (Instructor only)
   * @param {string} id - Class ID
   * @returns {Promise<Object>} Delete response
   */
  deleteClass: async (id) => {
    const response = await apiClient.delete(`/classes/${id}`);
    return response.data;
  },
};

export default classAPI;
