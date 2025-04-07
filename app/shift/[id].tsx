import { Ionicons } from "@expo/vector-icons";
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
import { getShiftById } from "../../config/mockData";
import { Colors } from "../../constants/Colors";

export default function ShiftDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Get shift data from mock data
  const shiftData = getShiftById(id || "1");

  /**
   * Navigate to confirmation page with no back button
   */
  const handleSignUp = () => {
    router.navigate({
      pathname: "/confirmation/[id]",
      params: { id: shiftData.id },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: shiftData.title,
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
              source={{ uri: shiftData.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.headerOverlay} />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{shiftData.title}</Text>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateTime}>
                {shiftData.date} | {shiftData.time}
              </Text>
            </View>
            <View style={styles.locationContainer}>
              <Ionicons
                name="location-outline"
                size={16}
                color={Colors.text.secondary}
              />
              <Text style={styles.locationText}>{shiftData.location}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Shift</Text>
              <Text style={styles.description}>{shiftData.description}</Text>

              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Minimum Age</Text>
                  <Text style={styles.infoValue}>{shiftData.minimumAge}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Requirements</Text>
                  <Text style={styles.infoValue}>{shiftData.requirements}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Pressable
              style={styles.signUpButton}
              onPress={handleSignUp}
              android_ripple={{ color: "rgba(255,255,255,0.2)" }}
            >
              <Text style={styles.signUpButtonText}>Sign Up Now</Text>
            </Pressable>
            <Text style={styles.redirectText}>
              You will be redirected to the organization's website to complete
              the registration.
            </Text>
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
    marginBottom: 8,
  },
  dateTimeContainer: {
    marginBottom: 8,
  },
  dateTime: {
    fontSize: 16,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
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
  description: {
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
  footer: {
    padding: 16,
    paddingBottom: 32,
  },
  signUpButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  signUpButtonText: {
    color: Colors.text.primary,
    fontSize: 16,
    fontFamily: "BaruSans-SemiBold",
  },
  redirectText: {
    textAlign: "center",
    color: Colors.text.muted,
    fontSize: 12,
    fontFamily: "BaruSans-Regular",
  },
});

