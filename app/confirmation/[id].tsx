import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Spinner } from "../../components/Spinner";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import { useShiftDetails } from "../../hooks/useApi";
import { useHaptics } from "../../hooks/useHaptics";

export default function ConfirmationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const shiftId = id ? parseInt(id, 10) : null;

  const triggerSuccess = useHaptics("success");
  const triggerMedium = useHaptics("medium");
  const triggerWarning = useHaptics("warning");

  const { data: shiftData, isLoading, error } = useShiftDetails(shiftId);

  /**
   * Navigate back to the home screen (replace stack)
   */
  const handleDone = async () => {
    await triggerMedium();
    // Navigate to the home tab, replacing the stack
    router.dismissAll();
    router.replace("/(tabs)");
    // If the above still warns, try navigating directly:
    // router.navigate("/(tabs)/index");
  };

  /**
   * Navigate to the specific shift details page again (replace stack)
   */
  const handleViewShift = async () => {
    if (!shiftId) return;
    await triggerMedium();
    // Replace current screen with shift details
    router.replace(`/shift/${shiftId}`);
  };

  /**
   * Attempts to create a calendar event URL.
   * Basic implementation, needs robust date/time parsing.
   */
  const handleAddToCalendar = async () => {
    if (!shiftData) return;

    await triggerMedium();

    try {
      // Combine date and time - VERY basic, assumes YYYY-MM-DD and HH:MM:SS format
      const startTimeStr = `${shiftData.date}T${shiftData.start_time}Z`; // Assume UTC for simplicity
      const endTimeStr = `${shiftData.date}T${shiftData.end_time}Z`;

      // Format for Google Calendar URL (YYYYMMDDTHHMMSSZ)
      const formatGCAL = (isoStr: string) => isoStr.replace(/[-:]/g, "");

      const gcalUrl =
        `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=${encodeURIComponent(shiftData.title)}` +
        `&dates=${formatGCAL(startTimeStr)}/${formatGCAL(endTimeStr)}` +
        `&location=${encodeURIComponent(shiftData.location || "")}` +
        `&details=${encodeURIComponent(
          `Volunteer shift for ${
            shiftData.organizations?.name || "Unknown Org"
          }. ${shiftData.description || ""}`
        )}`;

      // Try opening the URL
      const supported = await Linking.canOpenURL(gcalUrl);
      if (supported) {
        await Linking.openURL(gcalUrl);
      } else {
        await triggerWarning();
        Alert.alert(
          "Cannot Open Calendar",
          "Could not find an application to open the calendar link."
        );
      }
    } catch (error) {
      await triggerWarning();
      console.error("Error creating calendar link:", error);
      Alert.alert("Error", "Could not create calendar event link.");
    }
  };

  React.useEffect(() => {
    // Trigger success haptic when screen loads
    triggerSuccess();
  }, []);

  // --- Render Loading/Error ---
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Spinner size={48} color={Colors.primary} />
      </View>
    );
  }

  if (error || !shiftData) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Ionicons
          name="warning-outline"
          size={64}
          color={Colors.status.error}
        />
        <Text style={styles.errorText}>Could not load shift details.</Text>
        <Pressable style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Go Home</Text>
        </Pressable>
      </View>
    );
  }

  // --- Main Render ---
  const formattedDate = new Date(shiftData.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = `${shiftData.start_time.substring(
    0,
    5
  )} - ${shiftData.end_time.substring(0, 5)}`;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />
      <View style={styles.iconContainer}>
        <Ionicons
          name="checkmark-circle-outline"
          size={120}
          color={Colors.status.success}
        />
      </View>
      <Text style={styles.title}>You're All Set!</Text>
      <Text style={styles.subtitle}>
        You've successfully signed up for the following shift:
      </Text>

      <View style={styles.shiftInfoCard}>
        <Text style={styles.shiftTitle}>{shiftData.title}</Text>
        <Text style={styles.shiftOrg}>
          {shiftData.organizations?.name || "Unknown Org"}
        </Text>
        <View style={styles.detailsRow}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={Colors.text.secondary}
            style={styles.detailIcon}
          />
          <Text style={styles.detailText}>{formattedDate}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Ionicons
            name="time-outline"
            size={16}
            color={Colors.text.secondary}
            style={styles.detailIcon}
          />
          <Text style={styles.detailText}>{formattedTime}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Ionicons
            name="location-outline"
            size={16}
            color={Colors.text.secondary}
            style={styles.detailIcon}
          />
          <Text style={styles.detailText}>
            {shiftData.location || "Location TBD"}
          </Text>
        </View>
      </View>

      <Pressable style={styles.calendarButton} onPress={handleAddToCalendar}>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={Colors.primary}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.calendarButtonText}>Add to Calendar</Text>
      </Pressable>

      <View style={styles.footer}>
        <Pressable style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  centerContent: {
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    marginBottom: 24,
  },
  shiftInfoCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    width: "100%",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  shiftTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  shiftOrg: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 10,
    width: 18,
  },
  detailText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    flexShrink: 1,
  },
  calendarButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.cardBackground, // Subtle button style
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  calendarButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },
  viewShiftButton: {
    marginBottom: 24, // Adjust spacing
  },
  viewShiftButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40, // Safe area padding
  },
  doneButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  doneButtonText: {
    color: Colors.text.primary,
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  errorText: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.status.error,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    marginBottom: 16,
  },
  detailsText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  linkText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },
  confirmText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
});

