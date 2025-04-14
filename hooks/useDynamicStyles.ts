import { StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";

export function useDynamicStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    headerTitle: {
      fontSize: 28,
      fontFamily: Fonts.bold,
      color: Colors.text.primary,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 16,
      fontFamily: Fonts.regular,
      color: Colors.text.secondary,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: Colors.text.primary,
      marginBottom: 16,
    },
    sectionTitleNoMargin: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: Colors.text.primary,
    },
    horizontalList: {
      paddingLeft: 24,
      paddingRight: 8,
    },
    title: {
      fontSize: 28,
      fontFamily: Fonts.bold,
      color: Colors.text.primary,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: Fonts.regular,
      color: Colors.text.secondary,
    },
    heading: {
      fontSize: 24,
      fontFamily: Fonts.bold,
      color: Colors.text.primary,
    },
    subheading: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: Colors.text.primary,
    },
    buttonText: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: Colors.text.primary,
    },
    label: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: Colors.text.secondary,
    },
    body: {
      fontSize: 16,
      fontFamily: Fonts.regular,
      color: Colors.text.primary,
    },
  });
}

