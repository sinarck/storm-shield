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
  organizations: Pick<Organization, "id" | "name" | "logo_url"> | null;
};

export type OrganizationWithReviews = Organization & {
  organization_reviews: OrganizationReview[];
};

export type OrganizationWithReviewsAndShifts = Organization & {
  organization_reviews: OrganizationReview[];
  shifts: Shift[]; // Add shifts relationship
};

export const api = {
  // --- Organizations ---
  getOrganizations: async (): Promise<Organization[]> => {
    const { data, error } = await supabase.from("organizations").select("*");
    if (error) {
      console.error("Error fetching organizations:", error);
      throw error;
    }
    return data || [];
  },

  getOrganizationById: async (
    id: number
  ): Promise<OrganizationWithReviewsAndShifts | null> => {
    const { data, error } = await supabase
      .from("organizations")
      // Fetch reviews and shifts associated with this org
      .select("*, organization_reviews(*), shifts(*)")
      .eq("id", id)
      .single();
    if (error) {
      console.error(`Error fetching organization ${id}:`, error);
      throw error;
    }
    // We need to cast because Supabase TS inference doesn't automatically include nested relations fully
    return data as unknown as OrganizationWithReviewsAndShifts | null;
  },

  // --- Shifts ---
  getShifts: async (): Promise<ShiftWithOrganization[]> => {
    const { data, error } = await supabase
      .from("shifts")
      .select("*, organizations(id, name, logo_url)"); // Join with organization details
    if (error) {
      console.error("Error fetching shifts:", error);
      throw error;
    }
    // Supabase returns the joined table as an object, need to assert the type
    return (data as unknown as ShiftWithOrganization[]) || [];
  },

  getShiftById: async (id: number): Promise<ShiftWithOrganization | null> => {
    const { data, error } = await supabase
      .from("shifts")
      .select("*, organizations(id, name, logo_url)")
      .eq("id", id)
      .single();
    if (error) {
      console.error(`Error fetching shift ${id}:`, error);
      throw error;
    }
    return data as unknown as ShiftWithOrganization | null;
  },

  // --- User Profile ---
  // Example: Get a single user profile. Since we don't have auth,
  // we'll just fetch a hardcoded user ID for now.
  getUserProfile: async (userId: number = 1): Promise<User | null> => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) {
      console.error(`Error fetching user ${userId}:`, error);
      throw error;
    }
    return data;
  },

  // --- Shift Registration ---
  registerForShift: async (
    shiftId: number,
    userId: number
  ): Promise<ShiftRegistration> => {
    // Check if already registered (optional, depends on UX flow)
    const { data: existing, error: selectError } = await supabase
      .from("shift_registrations")
      .select("id")
      .eq("shift_id", shiftId)
      .eq("user_id", userId)
      .maybeSingle();

    if (selectError) {
      console.error("Error checking registration:", selectError);
      throw selectError;
    }

    if (existing) {
      console.log("User already registered for this shift");
      // Return existing registration or throw error depending on desired behavior
      // For now, let's just return the existing one (or refetch it)
      const { data: refetched, error: refetchError } = await supabase
        .from("shift_registrations")
        .select("*")
        .eq("id", existing.id)
        .single();
      if (refetchError) throw refetchError;
      if (!refetched)
        throw new Error("Failed to refetch existing registration");
      return refetched;
    }

    // Insert new registration
    const { data, error } = await supabase
      .from("shift_registrations")
      .insert({ shift_id: shiftId, user_id: userId, status: "confirmed" }) // Assuming auto-confirm for demo
      .select()
      .single();

    if (error) {
      console.error("Error registering for shift:", error);
      throw error;
    }
    if (!data) {
      throw new Error("Failed to register for shift, no data returned.");
    }
    return data;
  },
};

