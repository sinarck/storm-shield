import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

// --- Query Keys ---
const queryKeys = {
  organizations: ["organizations"],
  organization: (id: number) => ["organization", id],
  shifts: ["shifts"],
  shift: (id: number) => ["shift", id],
  userProfile: (userId: number) => ["userProfile", userId],
};

// --- Hooks ---

export const useOrganizations = () => {
  return useQuery({
    queryKey: queryKeys.organizations,
    queryFn: api.getOrganizations,
  });
};

export const useOrganizationDetails = (id: number) => {
  return useQuery({
    queryKey: queryKeys.organization(id),
    queryFn: () => api.getOrganizationById(id),
    enabled: !!id, // Only run query if id is available
  });
};

export const useShifts = () => {
  return useQuery({
    queryKey: queryKeys.shifts,
    queryFn: api.getShifts,
  });
};

export const useShiftDetails = (id: number | null) => {
  return useQuery({
    queryKey: queryKeys.shift(id!), // Use non-null assertion, handled by enabled
    queryFn: () => api.getShiftById(id!),
    enabled: !!id, // Only run query if id is valid
  });
};

export const useUserProfile = (userId: number = 1) => {
  return useQuery({
    queryKey: queryKeys.userProfile(userId),
    queryFn: () => api.getUserProfile(userId),
  });
};

export const useRegisterForShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shiftId, userId }: { shiftId: number; userId: number }) =>
      api.registerForShift(shiftId, userId),
    onSuccess: (data) => {
      // Invalidate relevant queries after successful registration
      queryClient.invalidateQueries({
        queryKey: queryKeys.shift(data.shift_id!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.userProfile(data.user_id!),
      });
      // Optionally, update cache directly for faster UI feedback
    },
    onError: (error) => {
      console.error("Failed to register for shift:", error);
      // Handle error appropriately (e.g., show toast message)
    },
  });
};
