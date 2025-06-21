export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          full_name: string;
          avatar_url: string | null;
          bio: string | null;
          phone_number: string | null;
          date_of_birth: string | null; // Date represented as string
          created_at: string;
          updated_at: string;
          total_hours: number;
          total_shifts: number;
          location: string | null;
          preferred_causes: string[] | null;
        };
        Insert: {
          id?: number; // SERIAL
          full_name: string;
          avatar_url?: string | null;
          bio?: string | null;
          phone_number?: string | null;
          date_of_birth?: string | null;
          created_at?: string;
          updated_at?: string;
          total_hours?: number;
          total_shifts?: number;
          location?: string | null;
          preferred_causes?: string[] | null;
        };
        Update: {
          id?: number;
          full_name?: string;
          avatar_url?: string | null;
          bio?: string | null;
          phone_number?: string | null;
          date_of_birth?: string | null;
          created_at?: string;
          updated_at?: string;
          total_hours?: number;
          total_shifts?: number;
          location?: string | null;
          preferred_causes?: string[] | null;
        };
        Relationships: [];
      };
      organizations: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          logo_url: string | null;
          website_url: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          zip_code: string | null;
          created_at: string;
          updated_at: string;
          rating: number | null; // decimal represented as number
          total_volunteers: number;
        };
        Insert: {
          id?: number; // SERIAL
          name: string;
          description?: string | null;
          logo_url?: string | null;
          website_url?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          zip_code?: string | null;
          created_at?: string;
          updated_at?: string;
          rating?: number | null;
          total_volunteers?: number;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string | null;
          logo_url?: string | null;
          website_url?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          zip_code?: string | null;
          created_at?: string;
          updated_at?: string;
          rating?: number | null;
          total_volunteers?: number;
        };
        Relationships: [];
      };
      shifts: {
        Row: {
          id: number;
          organization_id: number | null;
          title: string;
          description: string | null;
          date: string; // Date represented as string
          start_time: string; // Time represented as string
          end_time: string; // Time represented as string
          location: string | null;
          minimum_age: number | null;
          requirements: string | null;
          max_volunteers: number | null;
          current_volunteers: number;
          created_at: string;
          updated_at: string;
          status: string;
        };
        Insert: {
          id?: number; // SERIAL
          organization_id?: number | null;
          title: string;
          description?: string | null;
          date: string;
          start_time: string;
          end_time: string;
          location?: string | null;
          minimum_age?: number | null;
          requirements?: string | null;
          max_volunteers?: number | null;
          current_volunteers?: number;
          created_at?: string;
          updated_at?: string;
          status?: string;
        };
        Update: {
          id?: number;
          organization_id?: number | null;
          title?: string;
          description?: string | null;
          date?: string;
          start_time?: string;
          end_time?: string;
          location?: string | null;
          minimum_age?: number | null;
          requirements?: string | null;
          max_volunteers?: number | null;
          current_volunteers?: number;
          created_at?: string;
          updated_at?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "shifts_organization_id_fkey";
            columns: ["organization_id"];
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      shift_registrations: {
        Row: {
          id: number;
          shift_id: number | null;
          user_id: number | null;
          status: string;
          created_at: string;
          updated_at: string;
          hours_logged: number | null; // decimal represented as number
          feedback: string | null;
          rating: number | null;
        };
        Insert: {
          id?: number; // SERIAL
          shift_id?: number | null;
          user_id?: number | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
          hours_logged?: number | null;
          feedback?: string | null;
          rating?: number | null;
        };
        Update: {
          id?: number;
          shift_id?: number | null;
          user_id?: number | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
          hours_logged?: number | null;
          feedback?: string | null;
          rating?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "shift_registrations_shift_id_fkey";
            columns: ["shift_id"];
            referencedRelation: "shifts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "shift_registrations_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      organization_reviews: {
        Row: {
          id: number;
          organization_id: number | null;
          user_id: number | null;
          rating: number | null;
          review: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number; // SERIAL
          organization_id?: number | null;
          user_id?: number | null;
          rating?: number | null;
          review?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          organization_id?: number | null;
          user_id?: number | null;
          rating?: number | null;
          review?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "organization_reviews_organization_id_fkey";
            columns: ["organization_id"];
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organization_reviews_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

// Helper type for extracting Row types
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

