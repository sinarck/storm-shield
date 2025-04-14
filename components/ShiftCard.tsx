import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { useHaptics } from "../hooks/useHaptics";

interface ShiftCardProps {
  title: string;
  organizationName: string;
  date: string;
  time: string;
  location: string;
  onPress?: () => void;
}

/**
 * Card component for displaying shift information in lists.
 */
export const ShiftCard: React.FC<ShiftCardProps> = ({
  title,
  organizationName,
  date,
  time,
  location,
  onPress,
}) => {
  const triggerHaptic = useHaptics("light");

  const handlePress = async () => {
    await triggerHaptic();
    onPress?.();
  };

  // Format date nicely (example: Apr 15, 2024)
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      android_ripple={{ color: Colors.overlay.light }}
    >
      <View style={styles.headerSection}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.organizationName} numberOfLines={1}>
          {organizationName}
        </Text>
      </View>
      <View style={styles.detailsSection}>
        <View style={styles.detailsRow}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color={Colors.text.secondary}
            style={styles.icon}
          />
          <Text style={styles.detailText}>{formattedDate}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Ionicons
            name="time-outline"
            size={14}
            color={Colors.text.secondary}
            style={styles.icon}
          />
          <Text style={styles.detailText}>{time}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Ionicons
            name="location-outline"
            size={14}
            color={Colors.text.secondary}
            style={styles.icon}
          />
          <Text style={styles.detailText} numberOfLines={1}>
            {location}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    marginVertical: 8,
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  headerSection: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  detailsSection: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "BaruSans-SemiBold",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  organizationName: {
    fontSize: 14,
    fontFamily: "BaruSans-Medium",
    color: Colors.text.primary,
    opacity: 0.9,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
    width: 16,
    textAlign: "center",
  },
  detailText: {
    fontSize: 14,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
    flexShrink: 1,
  },
});

