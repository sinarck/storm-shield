import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  icon?: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isActive,
  onPress,
  icon,
}) => {
  const { isDark } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: isActive
            ? isDark
              ? Colors.primary.dark
              : Colors.primary.light
            : isDark
            ? Colors.cardBackground.dark
            : Colors.cardBackground.light,
          borderColor: isDark ? Colors.border.dark : Colors.border.light,
        },
      ]}
    >
      {icon && (
        <Ionicons
          name={icon as any}
          size={16}
          color={
            isActive
              ? "#FFFFFF"
              : isDark
              ? Colors.text.primary.dark
              : Colors.text.primary.light
          }
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.label,
          {
            color: isActive
              ? "#FFFFFF"
              : isDark
              ? Colors.text.primary.dark
              : Colors.text.primary.light,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  icon: {
    marginRight: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: "BaruSans-SemiBold",
  },
});

