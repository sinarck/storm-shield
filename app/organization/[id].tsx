import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ShiftCard } from "../../components/ShiftCard";
import { Colors } from "../../constants/Colors";
import { useOrganizationDetails } from "../../hooks/useApi";
import { OrganizationReview, Shift } from "../../services/api";

// Placeholder Image URL
const DEFAULT_ORG_IMAGE = "https://via.placeholder.com/150?text=Org+Logo";

// Basic Skeleton for Org Details
const OrgDetailSkeleton = () => (
  <View style={styles.skeletonContainer}>
    <View style={[styles.skeleton, styles.skeletonImage]} />
    <View style={[styles.skeleton, styles.skeletonTitle]} />
    <View style={[styles.skeleton, styles.skeletonSubtitle]} />
    <View style={[styles.skeleton, styles.skeletonRating]} />
    <View style={[styles.skeleton, styles.skeletonSectionTitle]} />
    <View style={[styles.skeleton, styles.skeletonText]} />
    <View style={[styles.skeleton, styles.skeletonText, { width: "80%" }]} />
    <View
      style={[styles.skeleton, styles.skeletonSectionTitle, { marginTop: 16 }]}
    />
    <View style={[styles.skeleton, styles.skeletonReview]} />
    <View style={[styles.skeleton, styles.skeletonReview]} />
  </View>
);

// Component to render rating stars
const RatingStars = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <View style={styles.ratingContainer}>
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesome
          key={`full_${i}`}
          name="star"
          size={18}
          color={Colors.rating}
        />
      ))}
      {halfStar && (
        <FontAwesome
          key="half"
          name="star-half-full"
          size={18}
          color={Colors.rating}
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesome
          key={`empty_${i}`}
          name="star-o"
          size={18}
          color={Colors.rating}
        />
      ))}
      {/* <Text style={styles.ratingText}>{rating.toFixed(1)}</Text> */}
    </View>
  );
};

export default function OrganizationDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const organizationId = id ? parseInt(id, 10) : null;

  const {
    data: organizationData,
    isLoading,
    error,
  } = useOrganizationDetails(organizationId!);

  // --- Render States ---
  if (isLoading || !organizationId) {
    return (
      <>
        <Stack.Screen options={{ title: "Loading Organization..." }} />
        <View style={styles.container}>
          <OrgDetailSkeleton />
        </View>
      </>
    );
  }

  if (error || !organizationData) {
    return (
      <>
        <Stack.Screen options={{ title: "Error" }} />
        <View style={[styles.container, styles.centerContent]}>
          <Text style={styles.errorText}>
            Failed to load organization details.
          </Text>
        </View>
      </>
    );
  }

  // --- Main Render ---
  const handlePressWebsite = () => {
    if (organizationData.website_url) {
      Linking.openURL(organizationData.website_url).catch((err) =>
        console.error("Couldn't load page", err)
      );
    }
  };

  const handlePressEmail = () => {
    if (organizationData.contact_email) {
      Linking.openURL(`mailto:${organizationData.contact_email}`).catch((err) =>
        console.error("Couldn't open email", err)
      );
    }
  };

  const renderShiftItem = ({ item }: { item: Shift }) => (
    <ShiftCard
      key={item.id}
      title={item.title}
      organizationName={organizationData.name}
      date={item.date}
      time={`${item.start_time.substring(0, 5)} - ${item.end_time.substring(
        0,
        5
      )}`}
      location={item.location || "Remote"}
      onPress={() => router.navigate(`/shift/${item.id}`)}
    />
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: organizationData.name || "Organization",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text.primary,
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          {/* <Image
            source={{ uri: organizationData.logo_url || DEFAULT_ORG_IMAGE }}
            style={styles.logo}
          /> */}
          <Text style={styles.orgName}>{organizationData.name}</Text>
          {organizationData.city && organizationData.state && (
            <Text style={styles.orgLocation}>
              {organizationData.city}, {organizationData.state}
            </Text>
          )}
          {organizationData.rating != null && (
            <RatingStars rating={organizationData.rating} />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.description}>
            {organizationData.description || "No description provided."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Info</Text>
          {organizationData.website_url && (
            <Pressable style={styles.contactRow} onPress={handlePressWebsite}>
              <Ionicons
                name="globe-outline"
                size={20}
                color={Colors.primary}
                style={styles.contactIcon}
              />
              <Text style={styles.contactTextLink}>
                {organizationData.website_url}
              </Text>
            </Pressable>
          )}
          {organizationData.contact_email && (
            <Pressable style={styles.contactRow} onPress={handlePressEmail}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={Colors.primary}
                style={styles.contactIcon}
              />
              <Text style={styles.contactTextLink}>
                {organizationData.contact_email}
              </Text>
            </Pressable>
          )}
          {organizationData.contact_phone && (
            <View style={styles.contactRow}>
              <Ionicons
                name="call-outline"
                size={20}
                color={Colors.text.secondary}
                style={styles.contactIcon}
              />
              <Text style={styles.contactText}>
                {organizationData.contact_phone}
              </Text>
            </View>
          )}
          {organizationData.address && (
            <View style={styles.contactRow}>
              <Ionicons
                name="location-outline"
                size={20}
                color={Colors.text.secondary}
                style={styles.contactIcon}
              />
              <Text style={styles.contactText}>
                {organizationData.address}, {organizationData.city},{" "}
                {organizationData.state} {organizationData.zip_code}
              </Text>
            </View>
          )}
        </View>

        {/* Available Shifts Section */}
        {organizationData.shifts && organizationData.shifts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Shifts</Text>
            <View style={styles.shiftContainer}>
              {organizationData.shifts.map((shift) =>
                renderShiftItem({ item: shift })
              )}
            </View>
          </View>
        )}

        {organizationData.organization_reviews &&
          organizationData.organization_reviews.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Volunteer Reviews</Text>
              {organizationData.organization_reviews.map(
                (review: OrganizationReview) => (
                  <View key={review.id} style={styles.reviewCard}>
                    {review.rating != null && (
                      <RatingStars rating={review.rating} />
                    )}
                    <Text style={styles.reviewText}>
                      {review.review || "No comment provided."}
                    </Text>
                    {/* Could add user name here if fetched */}
                    <Text style={styles.reviewDate}>
                      Reviewed on:{" "}
                      {new Date(review.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                )
              )}
            </View>
          )}
      </ScrollView>
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
    padding: 24,
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    borderRadius: 12,
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.cardBackground, // Slightly different header background
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: Colors.border, // Placeholder bg
  },
  orgName: {
    fontSize: 26,
    fontFamily: "BaruSans-Bold",
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: 4,
  },
  orgLocation: {
    fontSize: 16,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "BaruSans-Medium",
    color: Colors.text.secondary,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "BaruSans-Bold",
    color: Colors.text.primary,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactIcon: {
    width: 24, // Align icons
    marginRight: 12,
    textAlign: "center",
  },
  contactText: {
    fontSize: 15,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
    flexShrink: 1,
  },
  contactTextLink: {
    fontSize: 15,
    fontFamily: "BaruSans-Regular",
    color: Colors.primary, // Make links stand out
    textDecorationLine: "underline",
    flexShrink: 1,
  },
  reviewCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewText: {
    fontSize: 15,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.primary,
    lineHeight: 22,
    marginTop: 8, // Space below rating
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.muted,
    textAlign: "right",
  },
  errorText: {
    fontSize: 16,
    fontFamily: "BaruSans-Regular",
    color: Colors.status.error,
    textAlign: "center",
  },
  // Skeleton styles
  skeletonContainer: {
    padding: 24,
    alignItems: "center", // Center skeleton parts like the header
  },
  skeleton: {
    backgroundColor: Colors.skeletonBackground,
    borderRadius: 8,
    marginBottom: 12, // Default margin
  },
  skeletonImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  skeletonTitle: {
    height: 28,
    width: "60%",
    marginBottom: 8,
  },
  skeletonSubtitle: {
    height: 18,
    width: "40%",
    marginBottom: 12,
  },
  skeletonRating: {
    height: 20,
    width: 120,
    marginBottom: 24,
  },
  skeletonSectionTitle: {
    height: 22,
    width: "35%",
    marginBottom: 16,
    alignSelf: "flex-start", // Align left
  },
  skeletonText: {
    height: 16,
    width: "100%",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  skeletonReview: {
    height: 100, // Approx height of review card
    width: "100%",
    borderRadius: 12,
    marginBottom: 12,
  },
  shiftContainer: {
    marginHorizontal: -24, // Compensate for section padding
    paddingHorizontal: 24,
  },
});

