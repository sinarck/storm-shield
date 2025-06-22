import * as Haptics from "expo-haptics";
import { useMemo } from "react";
import { Platform } from "react-native";
import { FeedbackType } from "../types/haptics";

/**
 * This hook provides a function to trigger haptic feedback on supported devices using `expo-haptics`.
 * On web platforms, this hook returns a no-op function to prevent crashes.
 *
 * Implementation heavily inspired by the [following article](https://medium.com/timeless/implementing-haptic-feedback-in-react-native-writing-a-usehaptic-hook-6b8612675599).
 *
 * @param feedbackType The variant of haptic feedback to use, each `type` corresponds to a different weight and intensity. Defaults to `selection`.
 * @returns Promise<void> A promise that resolves when the haptic feedback has been completed.
 */
export const useHaptics = (feedbackType: FeedbackType = "selection") => {
  const hapticHandlers = useMemo(() => {
    // Check if we're on web platform
    const isWeb = Platform.OS === "web";

    // No-op function for web platforms
    const noOpHaptic = () => Promise.resolve();

    // If on web, return no-op handlers
    if (isWeb) {
      return {
        selection: noOpHaptic,
        light: noOpHaptic,
        medium: noOpHaptic,
        heavy: noOpHaptic,
        success: noOpHaptic,
        warning: noOpHaptic,
        error: noOpHaptic,
      };
    }

    // Native platform handlers
    const createHapticHandler = (type: Haptics.ImpactFeedbackStyle) => {
      return () => Haptics.impactAsync(type);
    };

    const createNotificationFeedback = (
      type: Haptics.NotificationFeedbackType
    ) => {
      return () => Haptics.notificationAsync(type);
    };

    return {
      selection: Haptics.selectionAsync,
      light: createHapticHandler(Haptics.ImpactFeedbackStyle.Light),
      medium: createHapticHandler(Haptics.ImpactFeedbackStyle.Medium),
      heavy: createHapticHandler(Haptics.ImpactFeedbackStyle.Heavy),
      success: createNotificationFeedback(
        Haptics.NotificationFeedbackType.Success
      ),
      warning: createNotificationFeedback(
        Haptics.NotificationFeedbackType.Warning
      ),
      error: createNotificationFeedback(Haptics.NotificationFeedbackType.Error),
    };
  }, []);

  return hapticHandlers[feedbackType];
};

