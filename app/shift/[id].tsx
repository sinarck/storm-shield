import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Spinner } from "../../components/Spinner";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import { useRegisterForShift, useShiftDetails } from "../../hooks/useApi";
import { useHaptics } from "../../hooks/useHaptics";

export default function ShiftDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const shiftId = id ? parseInt(id, 10) : null; // Parse ID to number

  // Haptics
  const triggerHaptic = useHaptics("medium");
  const triggerSuccess = useHaptics("success");

  // Data Fetching
  const { data: shiftData, isLoading, error } = useShiftDetails(shiftId);
  const { mutate: register, isPending: isRegistering } = useRegisterForShift();

  /**
   * Navigate to confirmation page after successful registration
   */
  const handleSignUp = async () => {
    if (!shiftData || !shiftId) return;

    await triggerHaptic();

    // Hardcoded user ID 1 for demo purposes
    register(
      { shiftId, userId: 1 },
      {
        onSuccess: async () => {
          await triggerSuccess();
          router.replace({
            pathname: "/confirmation/[id]",
            params: { id: shiftId }, // Pass shiftId to confirmation
          });
        },
        onError: (err) => {
          console.error("Registration failed:", err);
          // Optionally show an error message to the user
          alert("Failed to sign up for the shift. Please try again.");
        },
      }
    );
  };

  // --- Render States ---
  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: "Loading Shift..." }} />
        <View style={[styles.container, styles.centerContent]}>
          <Spinner />
        </View>
      </>
    );
  }

  if (error || !shiftData) {
    return (
      <>
        <Stack.Screen options={{ title: "Error" }} />
        <View style={[styles.container, styles.centerContent]}>
          <Text style={styles.errorText}>Failed to load shift details.</Text>
        </View>
      </>
    );
  }

  // --- Main Render ---
  // Add mock skills data until API provides it
  const shiftWithSkills = {
    ...shiftData,
    skills: ["Customer Service", "Event Support", "Communication", "Teamwork"],
    info_callout:
      "Please arrive 15 minutes early for check-in and orientation. Bring a water bottle and wear comfortable clothes suitable for the weather.",
  };

  const formattedDate = new Date(shiftData.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = `${shiftData.start_time.substring(
    0,
    5
  )} - ${shiftData.end_time.substring(0, 5)}`;

  return (
    <>
      <Stack.Screen
        options={{
          title: shiftData.title || "Shift Details",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text.primary,
        }}
      />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }} // Ensure button doesn't overlap
        >
          <View style={styles.content}>
            {/* Header Card */}
            <View style={styles.header}>
              <Text style={styles.title}>{shiftData.title}</Text>
              <View style={styles.dateTimeContainer}>
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color={Colors.text.secondary}
                  style={styles.icon}
                />
                <Text style={styles.dateTime}>{formattedDate}</Text>
              </View>
              <View style={styles.dateTimeContainer}>
                <Ionicons
                  name="time-outline"
                  size={18}
                  color={Colors.text.secondary}
                  style={styles.icon}
                />
                <Text style={styles.dateTime}>{formattedTime}</Text>
              </View>
              <View style={styles.locationContainer}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={Colors.text.secondary}
                  style={styles.icon}
                />
                <Text style={styles.locationText}>
                  {shiftData.location || "Location TBD"}
                </Text>
              </View>
              <Text style={styles.organizationText}>
                Hosted by: {shiftData.organizations?.name || "Unknown"}
              </Text>
            </View>

            {/* About Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About the Shift</Text>
              <Text style={styles.description}>
                {shiftData.description || "No details provided."}
              </Text>

              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Minimum Age</Text>
                  <Text style={styles.infoValue}>
                    {shiftData.minimum_age || "N/A"}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Volunteers</Text>
                  <Text style={styles.infoValue}>
                    {shiftData.current_volunteers} /{" "}
                    {shiftData.max_volunteers || "Unlimited"}
                  </Text>
                </View>
              </View>
              {shiftData.requirements && (
                <View style={styles.requirementsSection}>
                  <Text style={styles.infoLabel}>Requirements</Text>
                  <Text style={styles.requirementsText}>
                    {shiftData.requirements}
                  </Text>
                </View>
              )}
            </View>

            {/* Skills Section */}
            {shiftWithSkills.skills && shiftWithSkills.skills.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Skills Needed</Text>
                <View style={styles.skillsContainer}>
                  {shiftWithSkills.skills.map((skill, index) => (
                    <View key={index} style={styles.skillChip}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Info Callout Section */}
            {shiftWithSkills.info_callout && (
              <View style={{ marginBottom: 24 }}>
                <View style={styles.infoCallout}>
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color={Colors.text.secondary}
                    style={styles.infoCalloutIcon}
                  />
                  <Text style={styles.infoCalloutText}>
                    {shiftWithSkills.info_callout}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Footer Button */}
        <View style={styles.footer}>
          <Pressable
            style={[
              styles.signUpButton,
              isRegistering && styles.disabledButton,
            ]}
            onPress={handleSignUp}
            disabled={isRegistering}
            android_ripple={{ color: Colors.overlay.light }}
          >
            {isRegistering ? (
              <Spinner size={20} color={Colors.text.primary} />
            ) : (
              <Text style={styles.signUpButtonText}>Sign Up Now</Text>
            )}
          </Pressable>
          <Text style={styles.redirectText}>
            Confirm your spot for this volunteer opportunity.
          </Text>
        </View>
      </View>
    </>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    width: 20, // Ensure icon alignment
    textAlign: "center",
  },
  dateTime: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.text.secondary,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.text.secondary,
    flexShrink: 1, // Prevent long locations from breaking layout
  },
  organizationText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.muted,
    marginTop: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    marginBottom: 24,
  },
  infoGrid: {
    flexDirection: "row",
    gap: 16, // Use gap for spacing
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.text.secondary,
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.text.primary,
  },
  requirementsSection: {
    // marginTop: 16,
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  requirementsText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 32, // Ensure padding with safe area
    backgroundColor: Colors.background, // Match container background
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  signUpButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center", // Center ActivityIndicator
    marginBottom: 8,
    minHeight: 50, // Ensure button has height even when loading
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: Colors.text.muted,
  },
  signUpButtonText: {
    color: Colors.text.primary,
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  redirectText: {
    textAlign: "center",
    color: Colors.text.muted,
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  skillChip: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  skillText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.text.primary,
  },
  infoCallout: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  infoCalloutIcon: {
    marginRight: 12,
  },
  infoCalloutText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});

