import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StoreReview from "expo-store-review";
import { useEffect, useState } from "react";

const APP_LAUNCH_COUNT_KEY = "appLaunchCount";
const STORE_REVIEW_REQUESTED_KEY = "storeReviewRequested";

export const useAppLaunch = () => {
  const [launchCount, setLaunchCount] = useState<number>(0);
  const [hasRequestedReview, setHasRequestedReview] = useState<boolean>(false);

  // Track app launch on mount
  useEffect(() => {
    trackAppLaunch();
  }, []);

  const trackAppLaunch = async () => {
    try {
      const [launchCountValue, reviewRequestedValue] = await Promise.all([
        AsyncStorage.getItem(APP_LAUNCH_COUNT_KEY),
        AsyncStorage.getItem(STORE_REVIEW_REQUESTED_KEY),
      ]);

      const currentLaunchCount = parseInt(launchCountValue || "0", 10) + 1;
      const reviewRequested = reviewRequestedValue === "true";

      await AsyncStorage.setItem(
        APP_LAUNCH_COUNT_KEY,
        currentLaunchCount.toString()
      );

      setLaunchCount(currentLaunchCount);
      setHasRequestedReview(reviewRequested);

      // Trigger store review on second launch if not already requested
      if (currentLaunchCount === 2 && !reviewRequested) {
        setTimeout(() => {
          requestStoreReview();
        }, 2000); // Wait 2 seconds after app launch
      }
    } catch (error) {
      console.error("Error tracking app launch:", error);
    }
  };

  const requestStoreReview = async () => {
    try {
      const isAvailable = await StoreReview.isAvailableAsync();
      const hasAction = await StoreReview.hasAction();

      if (isAvailable && hasAction) {
        await StoreReview.requestReview();
        await AsyncStorage.setItem(STORE_REVIEW_REQUESTED_KEY, "true");
        setHasRequestedReview(true);
      }
    } catch (error) {
      console.error("Error requesting store review:", error);
    }
  };

  const resetLaunchCount = async () => {
    try {
      await AsyncStorage.removeItem(APP_LAUNCH_COUNT_KEY);
      await AsyncStorage.removeItem(STORE_REVIEW_REQUESTED_KEY);
      setLaunchCount(0);
      setHasRequestedReview(false);
    } catch (error) {
      console.error("Error resetting launch count:", error);
    }
  };

  return {
    launchCount,
    hasRequestedReview,
    requestStoreReview,
    resetLaunchCount,
  };
};
