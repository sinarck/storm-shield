import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getShiftById } from "../../config/mockData";
import { Colors } from "../../constants/Colors";

export default function ShiftConfirmation() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Get shift data from mock data
  const shiftData = getShiftById(id || "1");

  /**
   * Open Google Calendar to add the shift
   */
  const handleAddToCalendar = () => {
    // For Google Calendar, we'd create a URL like this:
    const title = encodeURIComponent(shiftData.title);
    const location = encodeURIComponent(shiftData.location);
    // Convert date and time to proper format for calendar
    // This is simplified - in a real app, you'd parse the date/time properly
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&location=${location}&dates=20241208T150000Z/20241208T180000Z`;

    Linking.openURL(googleCalendarUrl);
  };

  /**
   * Navigate to home and reset navigation stack
   */
  const handleViewMoreOpportunities = () => {
    // Replace the entire navigation stack with just the home route
    router.replace("/");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Confirmation",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.text.primary,
          // Prevent going back
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={36} color={Colors.text.primary} />
          </View>

          <Text style={styles.title}>
            You're All Set for Your Upcoming Shift!
          </Text>

          <Text style={styles.message}>
            We'll send you a reminder 24 hours before your shift. Make sure to
            arrive on time and wear closed-toe shoes!
          </Text>

          <View style={styles.shiftCard}>
            <Text style={styles.shiftTitle}>{shiftData.title}</Text>
            <Text style={styles.shiftDate}>
              {shiftData.date} | {shiftData.time}
            </Text>
            <View style={styles.locationContainer}>
              <Ionicons
                name="location-outline"
                size={16}
                color={Colors.text.secondary}
              />
              <Text style={styles.locationText}>{shiftData.location}</Text>
            </View>
          </View>

          <Pressable
            style={styles.calendarButton}
            onPress={handleAddToCalendar}
            android_ripple={{ color: "rgba(255,255,255,0.2)" }}
          >
            <Text style={styles.buttonText}>Add to Calendar</Text>
          </Pressable>

          <Pressable
            style={styles.opportunitiesButton}
            onPress={handleViewMoreOpportunities}
            android_ripple={{ color: "rgba(255,255,255,0.1)" }}
          >
            <Text style={styles.opportunitiesText}>
              View More Opportunities
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "BaruSans-Bold",
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 16,
    lineHeight: 24,
  },
  shiftCard: {
    width: "100%",
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  shiftTitle: {
    fontSize: 18,
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
  calendarButton: {
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: Colors.text.primary,
    fontSize: 16,
    fontFamily: "BaruSans-SemiBold",
  },
  opportunitiesButton: {
    width: "100%",
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  opportunitiesText: {
    color: Colors.text.primary,
    fontSize: 16,
    fontFamily: "BaruSans-SemiBold",
  },
});

