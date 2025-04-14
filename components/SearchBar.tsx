import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Fonts } from "../constants/Fonts";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
}) => {
  const { isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? Colors.cardBackground.dark
            : Colors.cardBackground.light,
          borderColor: isDark ? Colors.border.dark : Colors.border.light,
        },
      ]}
    >
      <Ionicons
        name="search"
        size={20}
        color={
          isDark ? Colors.text.secondary.dark : Colors.text.secondary.light
        }
        style={styles.icon}
      />
      <TextInput
        style={[
          styles.input,
          {
            color: isDark
              ? Colors.text.primary.dark
              : Colors.text.primary.light,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={
          isDark ? Colors.text.muted.dark : Colors.text.muted.light
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text.primary,
    paddingVertical: 8,
  },
});

