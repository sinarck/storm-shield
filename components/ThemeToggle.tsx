import { useTheme } from "@/contexts/ThemeContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();
  const iconColor = useThemeColor({}, "text.primary");

  const handlePress = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.button}>
      <Ionicons
        name={isDark ? "moon" : theme === "system" ? "contrast" : "sunny"}
        size={24}
        color={iconColor}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
    marginRight: 16,
  },
});

