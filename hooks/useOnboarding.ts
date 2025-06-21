import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const ONBOARDING_KEY = "hasOnboarded";
const USER_PROFILE_KEY = "userProfile";

export interface UserProfile {
  fullName: string;
  age: string;
  addressLine1: string;
  addressLine2?: string;
  zipCode: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  skills: string[];
  interests: string[];
}

export const useOnboarding = () => {
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check onboarding status on mount
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const [onboardedValue, profileValue] = await Promise.all([
        AsyncStorage.getItem(ONBOARDING_KEY),
        AsyncStorage.getItem(USER_PROFILE_KEY),
      ]);

      setHasOnboarded(onboardedValue === "true");

      if (profileValue) {
        setUserProfile(JSON.parse(profileValue));
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      setHasOnboarded(false);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (profile: UserProfile) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(ONBOARDING_KEY, "true"),
        AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile)),
      ]);

      setHasOnboarded(true);
      setUserProfile(profile);
    } catch (error) {
      console.error("Error completing onboarding:", error);
      throw error;
    }
  };

  const resetOnboarding = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(ONBOARDING_KEY),
        AsyncStorage.removeItem(USER_PROFILE_KEY),
      ]);

      setHasOnboarded(false);
      setUserProfile(null);
    } catch (error) {
      console.error("Error resetting onboarding:", error);
      throw error;
    }
  };

  return {
    hasOnboarded,
    userProfile,
    isLoading,
    completeOnboarding,
    resetOnboarding,
  };
};

