import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";

// Mock notification data - in real app, this would come from an API
const mockNotifications = [
  {
    id: 1,
    type: "alert",
    title: "Privacy Policy Updated",
    message: "Make sure you know how these changes affect you.",
    date: "Dec 1, 2024",
    read: false,
  },
  {
    id: 2,
    type: "reminder",
    title: "Upcoming Shift Reminder",
    message:
      "Your shift at North Texas Food Bank is scheduled for Dec 8, 3 PM - 6 PM.",
    date: "Dec 5, 2024",
    read: false,
  },
  {
    id: 3,
    type: "achievement",
    title: "Congratulations!",
    message:
      "You've hit a major milestone in your volunteering journey. Keep it up!",
    date: "Nov 30, 2024",
    read: true,
  },
];

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState("all");

  const getIconForType = (type: string) => {
    switch (type) {
      case "alert":
        return "warning-outline";
      case "reminder":
        return "calendar-outline";
      case "achievement":
        return "trophy-outline";
      default:
        return "notifications-outline";
    }
  };

  const renderNotification = (notification: (typeof mockNotifications)[0]) => (
    <Pressable
      key={notification.id}
      style={[
        styles.notificationItem,
        !notification.read && styles.unreadNotification,
      ]}
      onPress={() => {
        // Handle notification press
      }}
    >
      <View style={styles.notificationIcon}>
        <Ionicons
          name={getIconForType(notification.type)}
          size={24}
          color={Colors.primary}
        />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
        <Text style={styles.notificationDate}>{notification.date}</Text>
      </View>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "notifications",
          headerTitleStyle: {
            fontFamily: Fonts.regular,
            fontSize: 17,
            color: Colors.text.primary,
          },
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerShadowVisible: false,
        }}
      />
      <View style={styles.container}>
        <View style={styles.segmentedControlContainer}>
          <View style={styles.segmentedControl}>
            <Pressable
              style={[
                styles.segment,
                activeTab === "all" && styles.activeSegment,
              ]}
              onPress={() => setActiveTab("all")}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === "all" && styles.activeSegmentText,
                ]}
              >
                notifications
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.segment,
                activeTab === "important" && styles.activeSegment,
              ]}
              onPress={() => setActiveTab("important")}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === "important" && styles.activeSegmentText,
                ]}
              >
                important alerts
              </Text>
            </Pressable>
          </View>
        </View>

        <ScrollView style={styles.notificationsList}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Latest</Text>
              <TouchableOpacity>
                <Text style={styles.markAllRead}>Mark as read</Text>
              </TouchableOpacity>
            </View>
            {mockNotifications.map(renderNotification)}
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
  segmentedControlContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 2,
  },
  segment: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  activeSegment: {
    backgroundColor: Colors.primary,
  },
  segmentText: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
  activeSegmentText: {
    color: Colors.text.primary,
  },
  notificationsList: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  markAllRead: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.primary,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  unreadNotification: {
    backgroundColor: Colors.cardBackground,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  notificationDate: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
});

