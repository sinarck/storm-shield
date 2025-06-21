import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { UserProfile } from "./useOnboarding";

const USER_PROFILE_KEY = "userProfile";

export const useStoredUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profileData = await AsyncStorage.getItem(USER_PROFILE_KEY);
      if (profileData) {
        setUserProfile(JSON.parse(profileData));
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!userProfile) {
        throw new Error("No user profile to update");
      }
      const updatedProfile = { ...userProfile, ...updates } as UserProfile;
      await AsyncStorage.setItem(
        USER_PROFILE_KEY,
        JSON.stringify(updatedProfile)
      );
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  return {
    userProfile,
    isLoading,
    updateUserProfile,
    refreshProfile: loadUserProfile,
  };
};

