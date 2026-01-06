import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userAPI } from "../api";

/**
 * Custom hook for user operations using React Query
 */
export const useUserQuery = () => {
  const queryClient = useQueryClient();

  // Get all users query
  const useAllUsers = () => {
    return useQuery({
      queryKey: ["users"],
      queryFn: userAPI.getAllUsers,
    });
  };

  // Get user by ID query
  const useUserById = (id) => {
    return useQuery({
      queryKey: ["user", id],
      queryFn: () => userAPI.getUserById(id),
      enabled: !!id,
    });
  };

  // Get user by email query
  const useUserByEmail = (email) => {
    return useQuery({
      queryKey: ["user", email],
      queryFn: () => userAPI.getUserByEmail(email),
      enabled: !!email,
    });
  };

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: userAPI.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }) => userAPI.updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: userAPI.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    useAllUsers,
    useUserById,
    useUserByEmail,
    createUser: createUserMutation.mutate,
    createUserAsync: createUserMutation.mutateAsync,
    updateUser: updateUserMutation.mutate,
    updateUserAsync: updateUserMutation.mutateAsync,
    deleteUser: deleteUserMutation.mutate,
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
  };
};

export default useUserQuery;
