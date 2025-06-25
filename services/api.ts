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

export const api = {
  // --- Organizations ---
  getOrganizations: async (): Promise<Organization[]> => {
    const response = await fetch(`/api/organizations`);
    return handleApiResponse<Organization[]>(response);
  },

  getOrganizationById: async (
    id: number
  ): Promise<OrganizationWithReviewsAndShifts | null> => {
    const response = await fetch(`/api/organizations?id=${id}`);
    return handleApiResponse<OrganizationWithReviewsAndShifts | null>(response);
  },

  // --- Shifts ---
  getShifts: async (): Promise<ShiftWithOrganization[]> => {
    const response = await fetch(`/api/shifts`);
    return handleApiResponse<ShiftWithOrganization[]>(response);
  },

  getShiftById: async (id: number): Promise<ShiftWithOrganization | null> => {
    const response = await fetch(`/api/shifts?id=${id}`);
    return handleApiResponse<ShiftWithOrganization | null>(response);
  },

  // --- User Profile ---
  getUserProfile: async (userId: number = 1): Promise<User | null> => {
    const response = await fetch(`/api/users?id=${userId}`);
    return handleApiResponse<User | null>(response);
  },

  // --- Shift Registration ---
  registerForShift: async (
    shiftId: number,
    userId: number
  ): Promise<ShiftRegistration> => {
    const response = await fetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shiftId, userId }),
    });
    return handleApiResponse<ShiftRegistration>(response);
  },
};

