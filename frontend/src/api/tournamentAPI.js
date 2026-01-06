import apiClient from './apiClient';

// Get all tournaments with optional filters
export const getTournaments = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.game && filters.game !== 'all') params.append('game', filters.game);
  if (filters.status && filters.status !== 'all') params.append('status', filters.status);
  if (filters.platform && filters.platform !== 'all') params.append('platform', filters.platform);
  if (filters.search) params.append('search', filters.search);
  
  const queryString = params.toString();
  const url = queryString ? `/tournaments?${queryString}` : '/tournaments';
  
  const response = await apiClient.get(url);
  return response.data;
};

// Get featured tournaments
export const getFeaturedTournaments = async () => {
  const response = await apiClient.get('/tournaments/featured');
  return response.data;
};

// Get single tournament by ID
export const getTournamentById = async (id) => {
  const response = await apiClient.get(`/tournaments/${id}`);
  return response.data;
};

// Create new tournament (host/instructor)
export const createTournament = async (tournamentData) => {
  const response = await apiClient.post('/tournaments', tournamentData);
  return response.data;
};

// Update tournament
export const updateTournament = async (id, tournamentData) => {
  const response = await apiClient.put(`/tournaments/${id}`, tournamentData);
  return response.data;
};

// Delete tournament
export const deleteTournament = async (id) => {
  const response = await apiClient.delete(`/tournaments/${id}`);
  return response.data;
};

// Register for tournament
export const registerForTournament = async (id, registrationData) => {
  const response = await apiClient.post(`/tournaments/${id}/register`, registrationData);
  return response.data;
};

// Get tournaments by host
export const getTournamentsByHost = async (email) => {
  const response = await apiClient.get(`/tournaments/host/${email}`);
  return response.data;
};

// Admin: Get all tournaments
export const getAllTournamentsAdmin = async () => {
  const response = await apiClient.get('/tournaments/admin/all');
  return response.data;
};

// Admin: Update tournament status
export const updateTournamentStatus = async (id, status, feedback = '') => {
  const response = await apiClient.patch(`/tournaments/${id}/status`, { status, feedback });
  return response.data;
};
