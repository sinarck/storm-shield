import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AchievementCard } from "../../components/AchievementCard";
import { OrganizationCard } from "../../components/OrganizationCard";
import { ShiftCard } from "../../components/ShiftCard";
import { CardSkeleton, ListSkeleton } from "../../components/SkeletonLoader";
import { Achievement, achievements } from "../../config/achievements";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import { useOrganizations, useShifts } from "../../hooks/useApi";
import { useOnboarding } from "../../hooks/useOnboarding";
import { useStoredUserProfile } from "../../hooks/useUserProfile";
import { Organization, ShiftWithOrganization } from "../../services/api";

// Placeholder image URL
const DEFAULT_ORG_IMAGE = "https://via.placeholder.com/100?text=Org";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const { resetOnboarding } = useOnboarding();

  // --- Data Fetching ---
  const { userProfile: storedUserProfile } = useStoredUserProfile();
  const {
    data: organizations,
    isLoading: isLoadingOrgs,
    refetch: refetchOrgs,
  } = useOrganizations();
  const {
    data: shifts,
    isLoading: isLoadingShifts,
    refetch: refetchShifts,
  } = useShifts();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchOrgs(), refetchShifts()]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchOrgs, refetchShifts]);

  // Hidden reset onboarding feature (tap title 5 times)
  const handleTitlePress = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount >= 5) {
      resetOnboarding();
      setTapCount(0);
    }

    // Reset count after 3 seconds
    setTimeout(() => setTapCount(0), 3000);
  };

  // --- Render Functions ---
  const renderOrganizationItem = ({ item }: { item: Organization }) => (
    <OrganizationCard
      key={item.id}
      id={item.id}
      title={item.name}
      description={item.description || "No description available."}
      imageUrl={item.logo_url || DEFAULT_ORG_IMAGE}
      rating={item.rating ?? 0}
    />
  );

  const renderShiftItem = ({ item }: { item: ShiftWithOrganization }) => (
    <View style={{ width: 280, marginHorizontal: 8 }}>
      <ShiftCard
        key={item.id}
        title={item.title}
        organizationName={item.organizations?.name || "Unknown Org"}
        date={item.date}
        time={`${item.start_time.substring(0, 5)} - ${item.end_time.substring(
          0,
          5
        )}`}
        location={item.location || "Remote"}
        onPress={() => router.navigate(`/shift/${item.id}`)}
      />
    </View>
  );

  const renderAchievementItem = ({ item }: { item: Achievement }) => (
    <AchievementCard
      key={item.id}
      title={item.title}
      description={item.description}
      icon={item.icon}
    />
  );

  // --- Loading State ---
  if (isLoadingOrgs || isLoadingShifts) {
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            title="Pull to refresh"
            titleColor={Colors.text.secondary}
          />
        }
      >
        <View style={styles.header}>
          <View style={[styles.skeleton, styles.headerTitleSkeleton]} />
          <View style={[styles.skeleton, styles.headerSubtitleSkeleton]} />
        </View>
        <View style={styles.sectionContainer}>
          <View style={[styles.skeleton, styles.sectionTitleSkeleton]} />
          <View style={[styles.skeleton, styles.monthlyGoalSkeleton]} />
        </View>
        <View style={styles.sectionContainer}>
          <View style={[styles.skeleton, styles.sectionTitleSkeleton]} />
          <View style={{ flexDirection: "row", paddingHorizontal: 8 }}>
            <CardSkeleton />
            <CardSkeleton />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={[styles.skeleton, styles.sectionTitleSkeleton]} />
          <ListSkeleton count={2} />
        </View>
        <View style={styles.sectionContainer}>
          <View style={[styles.skeleton, styles.sectionTitleSkeleton]} />
          <ListSkeleton count={2} />
        </View>
      </ScrollView>
    );
  }

  // --- Main Render ---
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary}
          title="Pull to refresh"
          titleColor={Colors.text.secondary}
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Pressable onPress={handleTitlePress}>
            <Text style={styles.headerTitle}>
              Hello, {storedUserProfile?.fullName || "Volunteer"}!
            </Text>
          </Pressable>
          <Text style={styles.headerSubtitle}>Ready to make an impact?</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => router.push("/notifications")}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={Colors.text.primary}
          />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Monthly Goal */}
      <View style={styles.monthlyGoalOuterContainer}>
        <Text style={styles.sectionTitle}>Monthly Goal</Text>
        <View style={styles.monthlyGoalCard}>
          <Text style={styles.cardSectionTitle}>Hours Volunteered</Text>
          <View style={styles.goalProgressContainer}>
            <Text style={styles.goalHours}>0</Text>
            <Text style={styles.goalTarget}>/ 10 hours</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: "0%" }]} />
          </View>
        </View>
      </View>

      {/* Upcoming Shifts */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitleNoMargin}>Upcoming Shifts</Text>
          <Pressable onPress={() => router.navigate("/(tabs)/explore")}>
            <Text style={styles.viewMore}>View More</Text>
          </Pressable>
        </View>
        {shifts && shifts.length > 0 ? (
          <FlatList
            data={shifts.slice(0, 3)}
            renderItem={renderShiftItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        ) : (
          <Text style={styles.emptyText}>No upcoming shifts found.</Text>
        )}
      </View>

      {/* Achievements */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitleNoMargin}>Achievements</Text>
        </View>
        {achievements
          .slice(0, 2)
          .map((ach: Achievement) => renderAchievementItem({ item: ach }))}
      </View>

      {/* Organizations */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitleNoMargin}>
            Featured Organizations
          </Text>
        </View>
        {organizations && organizations.length > 0 ? (
          organizations
            .slice(0, 2)
            .map((org) => renderOrganizationItem({ item: org }))
        ) : (
          <Text style={styles.emptyText}>No organizations found.</Text>
        )}
      </View>
    </ScrollView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
  sectionContainer: {
    // Used for Shifts where header provides padding
    marginBottom: 24,
  },
  sectionContainerWithPadding: {
    // Used for Achievements, Orgs where title needs padding
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24, // Header provides padding
    marginBottom: 10, // Increased margin below header
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  sectionTitleNoMargin: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  viewMore: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },
  horizontalList: {
    paddingLeft: 24, // Match section padding
    paddingRight: 8, // Allow last card partial visibility hint
  },
  monthlyGoalCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    // No marginHorizontal, parent container handles padding
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardSectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  goalProgressContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 12,
  },
  goalHours: {
    fontSize: 36,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  goalTarget: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    marginLeft: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    textAlign: "center",
    marginTop: 20,
    marginHorizontal: 24,
  },
  skeleton: {
    backgroundColor: Colors.skeletonBackground,
    borderRadius: 8,
  },
  headerTitleSkeleton: {
    height: 30,
    width: "60%",
    marginBottom: 8,
  },
  headerSubtitleSkeleton: {
    height: 18,
    width: "80%",
  },
  sectionTitleSkeleton: {
    height: 22,
    width: "40%",
    marginBottom: 16,
    marginLeft: 24,
  },
  monthlyGoalSkeleton: {
    height: 120,
    marginHorizontal: 24,
    borderRadius: 16,
  },
  monthlyGoalOuterContainer: {
    paddingHorizontal: 24, // Add padding here
    marginBottom: 24,
  },
  notificationButton: {
    position: "relative",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  notificationBadgeText: {
    color: Colors.text.primary,
    fontSize: 12,
    fontFamily: Fonts.bold,
  },
});

