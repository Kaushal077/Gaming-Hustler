/**
 * Central API export file
 * Import all APIs from a single location
 * 
 * @example
 * import { authAPI, userAPI, classAPI } from '@/api';
 * 
 * const token = await authAPI.generateToken(userData);
 * const users = await userAPI.getAllUsers();
 * const classes = await classAPI.getAllClasses();
 */

import authAPI from "./authAPI";
import userAPI from "./userAPI";
import classAPI from "./classAPI";
import * as tournamentAPI from "./tournamentAPI";
import apiClient from "./apiClient";

export { authAPI, userAPI, classAPI, tournamentAPI, apiClient };

export default {
  auth: authAPI,
  user: userAPI,
  class: classAPI,
  tournament: tournamentAPI,
};
