import Constants from "expo-constants";
import { Platform } from "react-native";
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

// Helper function to get the correct base URL for API calls
function getBaseUrl(): string {
  // In development
  if (__DEV__) {
    // For mobile development, we need to use the dev server URL
    if (Platform.OS !== "web") {
      // Try to get the dev server URL from Expo's manifest
      const manifestUrl = Constants.expoConfig?.hostUri;
      if (manifestUrl) {
        // Extract the host and port from the manifest URL
        const url = new URL(`http://${manifestUrl}`);
        return `http://${url.hostname}:${url.port || "8081"}`;
      }
      // Fallback to localhost:8081
      return "http://localhost:8081";
    }
    // For web development, relative URLs work fine
    return "";
  }

  // In production, use the deployed server URL
  const generatedOrigin = Constants.expoConfig?.extra?.router?.generatedOrigin;
  if (generatedOrigin) {
    return generatedOrigin;
  }

  // Fallback for production
  return "";
}

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

export const api = {
  // --- Organizations ---
  getOrganizations: async (): Promise<Organization[]> => {
    const response = await fetch(`${getBaseUrl()}/api/organizations`);
    return handleApiResponse<Organization[]>(response);
  },

  getOrganizationById: async (
    id: number
  ): Promise<OrganizationWithReviewsAndShifts | null> => {
    const response = await fetch(`${getBaseUrl()}/api/organizations?id=${id}`);
    return handleApiResponse<OrganizationWithReviewsAndShifts | null>(response);
  },

  // --- Shifts ---
  getShifts: async (): Promise<ShiftWithOrganization[]> => {
    const response = await fetch(`${getBaseUrl()}/api/shifts`);
    return handleApiResponse<ShiftWithOrganization[]>(response);
  },

  getShiftById: async (id: number): Promise<ShiftWithOrganization | null> => {
    const response = await fetch(`${getBaseUrl()}/api/shifts?id=${id}`);
    return handleApiResponse<ShiftWithOrganization | null>(response);
  },

  // --- User Profile ---
  getUserProfile: async (userId: number = 1): Promise<User | null> => {
    const response = await fetch(`${getBaseUrl()}/api/users?id=${userId}`);
    return handleApiResponse<User | null>(response);
  },

  // --- Shift Registration ---
  registerForShift: async (
    shiftId: number,
    userId: number
  ): Promise<ShiftRegistration> => {
    const response = await fetch(`${getBaseUrl()}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shiftId, userId }),
    });
    return handleApiResponse<ShiftRegistration>(response);
  },
};

