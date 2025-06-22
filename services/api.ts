import { Platform } from "react-native";
import { supabase } from "../lib/supabase";
import { Tables } from "../types/supabase";

// Define types based on Supabase schema
export type Organization = Tables<"organizations">;
export type Shift = Tables<"shifts">;
export type User = Tables<"users">;
export type ShiftRegistration = Tables<"shift_registrations">;
export type OrganizationReview = Tables<"organization_reviews">;

// Define types for joined data
export type ShiftWithOrganization = Shift & {
  organizations: Pick<
    Organization,
    "id" | "name" | "logo_url" | "website_url" | "contact_phone"
  > | null;
};

export type OrganizationReviewWithUser = OrganizationReview & {
  users: Pick<User, "full_name"> | null;
};

export type OrganizationWithReviews = Organization & {
  organization_reviews: OrganizationReviewWithUser[];
};

export type OrganizationWithReviewsAndShifts = Organization & {
  organization_reviews: OrganizationReviewWithUser[];
  shifts: Shift[]; // Add shifts relationship
};

// Helper function to handle API responses
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ error: "Network error" }));
    throw new Error(
      errorData.error || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
}

// Determine if we should use local API routes or direct Supabase calls
const shouldUseLocalApi = () => {
  // Use local API routes only on web in development
  return Platform.OS === "web" && __DEV__;
};

// Get the base URL for API requests (only used when shouldUseLocalApi is true)
const getApiBaseUrl = () => {
  if (__DEV__) {
    return "http://localhost:8081";
  }
  return "";
};

const API_BASE_URL = getApiBaseUrl();

export const api = {
  // --- Organizations ---
  getOrganizations: async (): Promise<Organization[]> => {
    if (shouldUseLocalApi()) {
      const response = await fetch(`${API_BASE_URL}/api/organizations`);
      return handleApiResponse<Organization[]>(response);
    } else {
      // Use direct Supabase call for mobile or production
      const { data, error } = await supabase.from("organizations").select("*");
      if (error) throw new Error(error.message);
      return data || [];
    }
  },

  getOrganizationById: async (
    id: number
  ): Promise<OrganizationWithReviewsAndShifts | null> => {
    if (shouldUseLocalApi()) {
      const response = await fetch(
        `${API_BASE_URL}/api/organizations?id=${id}`
      );
      return handleApiResponse<OrganizationWithReviewsAndShifts | null>(
        response
      );
    } else {
      // Use direct Supabase call for mobile or production
      const { data, error } = await supabase
        .from("organizations")
        .select("*, organization_reviews(*, users(full_name)), shifts(*)")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    }
  },

  // --- Shifts ---
  getShifts: async (): Promise<ShiftWithOrganization[]> => {
    if (shouldUseLocalApi()) {
      const response = await fetch(`${API_BASE_URL}/api/shifts`);
      return handleApiResponse<ShiftWithOrganization[]>(response);
    } else {
      // Use direct Supabase call for mobile or production
      const { data, error } = await supabase
        .from("shifts")
        .select(
          "*, organizations(id, name, logo_url, website_url, contact_phone)"
        );
      if (error) throw new Error(error.message);
      return data || [];
    }
  },

  getShiftById: async (id: number): Promise<ShiftWithOrganization | null> => {
    if (shouldUseLocalApi()) {
      const response = await fetch(`${API_BASE_URL}/api/shifts?id=${id}`);
      return handleApiResponse<ShiftWithOrganization | null>(response);
    } else {
      // Use direct Supabase call for mobile or production
      const { data, error } = await supabase
        .from("shifts")
        .select(
          "*, organizations(id, name, logo_url, website_url, contact_phone)"
        )
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    }
  },

  // --- User Profile ---
  getUserProfile: async (userId: number = 1): Promise<User | null> => {
    if (shouldUseLocalApi()) {
      const response = await fetch(`${API_BASE_URL}/api/users?id=${userId}`);
      return handleApiResponse<User | null>(response);
    } else {
      // Use direct Supabase call for mobile or production
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) throw new Error(error.message);
      return data;
    }
  },

  // --- Shift Registration ---
  registerForShift: async (
    shiftId: number,
    userId: number
  ): Promise<ShiftRegistration> => {
    if (shouldUseLocalApi()) {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shiftId, userId }),
      });
      return handleApiResponse<ShiftRegistration>(response);
    } else {
      // Use direct Supabase call for mobile or production
      // First check if already registered
      const { data: existing, error: selectError } = await supabase
        .from("shift_registrations")
        .select("id")
        .eq("shift_id", shiftId)
        .eq("user_id", userId)
        .maybeSingle();

      if (selectError) throw new Error(selectError.message);

      if (existing) {
        // Return existing registration
        const { data: refetched, error: refetchError } = await supabase
          .from("shift_registrations")
          .select("*")
          .eq("id", existing.id)
          .single();
        if (refetchError) throw new Error(refetchError.message);
        return refetched;
      }

      // Insert new registration
      const { data, error } = await supabase
        .from("shift_registrations")
        .insert({ shift_id: shiftId, user_id: userId, status: "confirmed" })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    }
  },
};

