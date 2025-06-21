import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Stack } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";
import { useHaptics } from "../hooks/useHaptics";

// Mock notification data - in real app, this would come from an API
const mockNotifications = [
  {
    id: 1,
    type: "alert",
    title: "Flood Warning",
    message:
      "Flash flood warning issued for San Mateo County. Volunteers needed for evacuation...",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
  },
  {
    id: 2,
    type: "reminder",
    title: "Shift Reminder",
    message:
      "Your food distribution shift at SF Food Bank is tomorrow at 9:00 AM.",
    date: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: true,
  },
  {
    id: 3,
    type: "achievement",
    title: "Message from Bay Area Relief",
    message:
      "Thank you for signing up! We look forward to your help with shelter setup this weeke...",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    read: false,
  },
  {
    id: 4,
    type: "default",
    title: "Profile Updated",
    message:
      "Your profile skills have been updated to include First Aid certification.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
  },
  {
    id: 5,
    type: "alert",
    title: "High Wind Advisory",
    message:
      "High wind advisory for coastal areas. Tree removal volunteers needed in affected nei...",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
  },
];

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] =
    useState<(typeof mockNotifications)[0][]>(mockNotifications);
  const [refreshing, setRefreshing] = useState(false);
  const playHaptic = useHaptics("medium");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    playHaptic();

    // Simulate fetching new data
    setTimeout(() => {
      // In a real app, you would fetch new notifications here
      // For this demo, we'll just re-set the mock data
      setNotifications([...mockNotifications].reverse()); // Reverse to show a change
      setRefreshing(false);
    }, 1500);
  }, [playHaptic]);

  const filteredNotifications = useMemo(() => {
    if (activeTab === "important") {
      return notifications.filter(
        (n) => n.type === "alert" || n.type === "reminder"
      );
    }
    return notifications;
  }, [activeTab, notifications]);

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

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const renderNotification = (notification: (typeof mockNotifications)[0]) => (
    <Pressable
      key={notification.id}
      style={[
        styles.notificationItem,
        !notification.read && styles.unreadNotification,
      ]}
      onPress={() => handleMarkAsRead(notification.id)}
    >
      <View style={styles.notificationIcon}>
        <Ionicons
          name={getIconForType(notification.type)}
          size={24}
          color={notification.type === "alert" ? Colors.error : Colors.primary}
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationDate}>
            {formatDistanceToNow(notification.date, { addSuffix: true })}
          </Text>
        </View>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {notification.message}
        </Text>
        {!notification.read && (
          <TouchableOpacity onPress={() => handleMarkAsRead(notification.id)}>
            <Text style={styles.markReadText}>Mark as read</Text>
          </TouchableOpacity>
        )}
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
                All
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
                Important Alerts
              </Text>
            </Pressable>
          </View>
        </View>

        <ScrollView
          style={styles.notificationsList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Latest</Text>
              <TouchableOpacity onPress={handleMarkAllAsRead}>
                <Text style={styles.markAllRead}>Mark all as read</Text>
              </TouchableOpacity>
            </View>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(renderNotification)
            ) : (
              <Text style={styles.emptyText}>
                No important alerts right now.
              </Text>
            )}
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
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  notificationIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  notificationDate: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  markReadText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.primary,
    marginTop: 4,
  },
  emptyText: {
    paddingVertical: 32,
    textAlign: "center",
    fontSize: 16,
    color: Colors.text.secondary,
  },
});

