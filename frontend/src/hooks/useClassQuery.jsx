import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { classAPI } from "../api";

/**
 * Custom hook for class operations using React Query
 */
export const useClassQuery = () => {
  const queryClient = useQueryClient();

  // Get all approved classes
  const useAllClasses = () => {
    return useQuery({
      queryKey: ["classes"],
      queryFn: classAPI.getAllClasses,
    });
  };

  // Get all classes for management
  const useAllClassesForManagement = () => {
    return useQuery({
      queryKey: ["classes", "manage"],
      queryFn: classAPI.getAllClassesForManagement,
    });
  };

  // Get popular classes
  const usePopularClasses = () => {
    return useQuery({
      queryKey: ["classes", "popular"],
      queryFn: classAPI.getPopularClasses,
    });
  };

  // Get classes by instructor
  const useClassesByInstructor = (email) => {
    return useQuery({
      queryKey: ["classes", "instructor", email],
      queryFn: () => classAPI.getClassesByInstructor(email),
      enabled: !!email,
    });
  };

  // Get class by ID
  const useClassById = (id) => {
    return useQuery({
      queryKey: ["class", id],
      queryFn: () => classAPI.getClassById(id),
      enabled: !!id,
    });
  };

  // Create class mutation
  const createClassMutation = useMutation({
    mutationFn: classAPI.createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });

  // Update class mutation
  const updateClassMutation = useMutation({
    mutationFn: ({ id, data }) => classAPI.updateClass(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      queryClient.invalidateQueries({ queryKey: ["class", variables.id] });
    },
  });

  // Change class status mutation
  const changeClassStatusMutation = useMutation({
    mutationFn: ({ id, status, reason }) =>
      classAPI.changeClassStatus(id, status, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      queryClient.invalidateQueries({ queryKey: ["class", variables.id] });
    },
  });

  // Delete class mutation
  const deleteClassMutation = useMutation({
    mutationFn: classAPI.deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });

  return {
    useAllClasses,
    useAllClassesForManagement,
    usePopularClasses,
    useClassesByInstructor,
    useClassById,
    createClass: createClassMutation.mutate,
    createClassAsync: createClassMutation.mutateAsync,
    updateClass: updateClassMutation.mutate,
    updateClassAsync: updateClassMutation.mutateAsync,
    changeStatus: changeClassStatusMutation.mutate,
    changeStatusAsync: changeClassStatusMutation.mutateAsync,
    deleteClass: deleteClassMutation.mutate,
    isCreating: createClassMutation.isPending,
    isUpdating: updateClassMutation.isPending,
    isDeleting: deleteClassMutation.isPending,
  };
};

export default useClassQuery;
