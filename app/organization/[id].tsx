import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getOrganizationById } from "../../config/mockData";
import { Colors } from "../../constants/Colors";

export default function OrganizationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Get organization data from mock data
  const organizationData = getOrganizationById(id || "1");

  /**
   * Navigate to shift details page
   * @param shiftId - Shift ID
   */
  const handleShiftPress = (shiftId: string) => {
    router.push(`/shift/${shiftId}`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: organizationData.title,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.text.primary,
        }}
      />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image
              source={{ uri: organizationData.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.headerOverlay} />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{organizationData.title}</Text>
            <Text style={styles.subtitle}>{organizationData.description}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color={Colors.rating} />
              <Text style={styles.rating}>{organizationData.rating}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Organization</Text>
              <Text style={styles.sectionText}>{organizationData.about}</Text>

              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Minimum Age</Text>
                  <Text style={styles.infoValue}>
                    {organizationData.minimumAge}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Skills Needed</Text>
                  <Text style={styles.infoValue}>
                    {organizationData.skillsNeeded}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Available Shifts</Text>
              {organizationData.shifts.map((shift) => (
                <Pressable
                  key={shift.id}
                  style={styles.shiftCard}
                  onPress={() => handleShiftPress(shift.id)}
                >
                  <View style={styles.shiftInfo}>
                    <Text style={styles.shiftTitle}>{shift.title}</Text>
                    <Text style={styles.shiftDate}>
                      {shift.date} | {shift.time}
                    </Text>
                    <View style={styles.locationContainer}>
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color={Colors.text.secondary}
                      />
                      <Text style={styles.locationText}>{shift.location}</Text>
                    </View>
                  </View>
                  <Pressable style={styles.bookButton}>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color={Colors.text.primary}
                    />
                  </Pressable>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: 300,
    position: "relative",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay.medium,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: "BaruSans-Bold",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  rating: {
    marginLeft: 4,
    color: Colors.text.primary,
    fontSize: 16,
    fontFamily: "BaruSans-Medium",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "BaruSans-Bold",
    color: Colors.text.primary,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: "row",
    gap: 16,
  },
  infoItem: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: "BaruSans-Medium",
    color: Colors.text.primary,
  },
  shiftCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  shiftInfo: {
    flex: 1,
  },
  shiftTitle: {
    fontSize: 16,
    fontFamily: "BaruSans-Medium",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  shiftDate: {
    fontSize: 14,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
  },
  bookButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
});

