import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import * as StoreReview from "expo-store-review";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";
import { useOnboarding } from "../hooks/useOnboarding";
import { useStoredUserProfile } from "../hooks/useUserProfile";

export default function ProfileScreen() {
  const { userProfile } = useStoredUserProfile();
  const { resetOnboarding } = useOnboarding();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStoreReview = async () => {
    try {
      const isAvailable = await StoreReview.isAvailableAsync();
      const hasAction = await StoreReview.hasAction();

      if (isAvailable && hasAction) {
        await StoreReview.requestReview();
      } else {
        // Fallback to App Store URL if native review is not available
        const storeUrl = StoreReview.storeUrl();
        if (storeUrl) {
          await Linking.openURL(storeUrl);
        }
      }
    } catch (error) {
      console.error("Error requesting store review:", error);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, including your volunteer history and registrations.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: confirmDeleteAccount,
        },
      ]
    );
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Final Confirmation",
      "This is your final warning. Deleting your account will:\n\n• Remove all your personal data\n• Cancel all your shift registrations\n• Delete your volunteer history\n• Remove your reviews and ratings\n\nThis action cannot be undone. Are you absolutely sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete My Account",
          style: "destructive",
          onPress: performAccountDeletion,
        },
      ]
    );
  };

  const performAccountDeletion = async () => {
    setIsDeleting(true);
    try {
      // Clear local data
      await resetOnboarding();
      // Navigate back to onboarding
      router.dismissAll();

      router.replace("/onboarding");
    } finally {
      setIsDeleting(false);
    }
  };

  const renderProfileSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Profile Information</Text>
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userProfile?.fullName?.charAt(0) || "V"}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {userProfile?.fullName || "Volunteer"}
            </Text>
            <Text style={styles.profileEmail}>
              {userProfile?.email || "No email provided"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderStatsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Volunteer Stats</Text>
      <View style={styles.statsCard}>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Shifts Completed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Hours Volunteered</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Organizations</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Average Rating</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderRecentActivitySection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityCard}>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={Colors.success}
            />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>
              Completed shift at Food Bank
            </Text>
            <Text style={styles.activitySubtitle}>2 hours • Yesterday</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Ionicons name="calendar" size={20} color={Colors.primary} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>
              Registered for Animal Shelter
            </Text>
            <Text style={styles.activitySubtitle}>This Saturday • 3 hours</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Ionicons name="star" size={20} color={Colors.rating} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Rated Community Garden</Text>
            <Text style={styles.activitySubtitle}>5 stars • 3 days ago</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderAccountSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.settingsCard}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleStoreReview}
        >
          <View style={styles.settingLeft}>
            <Ionicons
              name="star-outline"
              size={24}
              color={Colors.text.primary}
            />
            <Text style={styles.settingText}>Rate Storm Shield</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.text.secondary}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push("/credits")}
        >
          <View style={styles.settingLeft}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={Colors.text.primary}
            />
            <Text style={styles.settingText}>Credits</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.text.secondary}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={[styles.settingItem, styles.dangerItem]}
          onPress={handleDeleteAccount}
          disabled={isDeleting}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="trash-outline" size={24} color={Colors.error} />
            <Text style={[styles.settingText, styles.dangerText]}>
              {isDeleting ? "Deleting..." : "Delete Account"}
            </Text>
          </View>
          {!isDeleting && (
            <Ionicons name="chevron-forward" size={20} color={Colors.error} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Content */}
      {renderProfileSection()}
      {renderStatsSection()}
      {renderRecentActivitySection()}
      {renderAccountSection()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  profileCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
  statsCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  activityCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
  settingsCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.text.primary,
    marginLeft: 12,
  },
  dangerItem: {
    opacity: 0.9,
  },
  dangerText: {
    color: Colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 24,
  },
  footerText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
});

