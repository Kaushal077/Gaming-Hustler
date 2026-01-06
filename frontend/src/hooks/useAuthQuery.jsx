import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "../api";

/**
 * Custom hook for authentication operations using React Query
 */
export const useAuthQuery = () => {
  const queryClient = useQueryClient();

  // Generate token mutation
  const generateTokenMutation = useMutation({
    mutationFn: (userData) => authAPI.generateToken(userData),
    onSuccess: (data) => {
      if (data.token) {
        authAPI.saveToken(data.token);
      }
    },
  });

  // Check email query
  const useCheckEmail = (email) => {
    return useQuery({
      queryKey: ["checkEmail", email],
      queryFn: () => authAPI.checkEmail(email),
      enabled: !!email,
    });
  };

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => {
      authAPI.removeToken();
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });

  return {
    generateToken: generateTokenMutation.mutate,
    generateTokenAsync: generateTokenMutation.mutateAsync,
    isGeneratingToken: generateTokenMutation.isPending,
    tokenError: generateTokenMutation.error,
    useCheckEmail,
    logout: logoutMutation.mutate,
    isAuthenticated: authAPI.isAuthenticated(),
  };
};

export default useAuthQuery;
