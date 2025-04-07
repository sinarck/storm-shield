import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { useHaptics } from "../hooks/useHaptics";

interface AchievementCardProps {
  title: string;
  description: string;
  icon: string;
}

/**
 * Card component for displaying user achievements
 */
export const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  icon,
}) => {
  const triggerHaptic = useHaptics("light");

  const handlePress = async () => {
    await triggerHaptic();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      android_ripple={{ color: "rgba(255,255,255,0.1)" }}
    >
      <View style={styles.iconContainer}>
        <FontAwesome5 name={icon} size={24} color={Colors.text.accent} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  pressed: {
    opacity: 0.85,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: Colors.primary + "40",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "BaruSans-SemiBold",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});

