import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet } from "react-native";

export function useDynamicStyles() {
  const { isDark } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark
        ? Colors.background.dark
        : Colors.background.light,
    },
    header: {
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 24,
    },
    headerTitle: {
      fontSize: 28,
      fontFamily: "BaruSans-Bold",
      color: isDark ? Colors.text.primary.dark : Colors.text.primary.light,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 16,
      fontFamily: "BaruSans-Regular",
      color: isDark ? Colors.text.secondary.dark : Colors.text.secondary.light,
    },
    sectionContainer: {
      marginBottom: 24,
    },
    sectionContainerWithPadding: {
      paddingHorizontal: 24,
      marginBottom: 24,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: "BaruSans-Bold",
      color: isDark ? Colors.text.primary.dark : Colors.text.primary.light,
      marginBottom: 16,
    },
    sectionTitleNoMargin: {
      fontSize: 20,
      fontFamily: "BaruSans-Bold",
      color: isDark ? Colors.text.primary.dark : Colors.text.primary.light,
    },
    viewMore: {
      fontSize: 14,
      fontFamily: "BaruSans-SemiBold",
      color: isDark ? Colors.primary.dark : Colors.primary.light,
    },
    horizontalList: {
      paddingLeft: 24,
      paddingRight: 8,
    },
    monthlyGoalCard: {
      backgroundColor: isDark
        ? Colors.cardBackground.dark
        : Colors.cardBackground.light,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: isDark ? Colors.border.dark : Colors.border.light,
      shadowColor: isDark ? Colors.shadow.dark : Colors.shadow.light,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    cardSectionTitle: {
      fontSize: 16,
      fontFamily: "BaruSans-SemiBold",
      color: isDark ? Colors.text.primary.dark : Colors.text.primary.light,
      marginBottom: 12,
      alignSelf: "flex-start",
    },
    goalProgressContainer: {
      flexDirection: "row",
      alignItems: "baseline",
      marginBottom: 12,
    },
    goalHours: {
      fontSize: 36,
      fontFamily: "BaruSans-Bold",
      color: isDark ? Colors.text.primary.dark : Colors.text.primary.light,
    },
    goalTarget: {
      fontSize: 16,
      fontFamily: "BaruSans-Regular",
      color: isDark ? Colors.text.secondary.dark : Colors.text.secondary.light,
      marginLeft: 8,
    },
    progressBarBackground: {
      height: 8,
      backgroundColor: isDark ? Colors.border.dark : Colors.border.light,
      borderRadius: 4,
      overflow: "hidden",
    },
    progressBarFill: {
      height: "100%",
      backgroundColor: isDark ? Colors.primary.dark : Colors.primary.light,
      borderRadius: 4,
    },
    emptyText: {
      fontSize: 14,
      fontFamily: "BaruSans-Regular",
      color: isDark ? Colors.text.secondary.dark : Colors.text.secondary.light,
      textAlign: "center",
      marginTop: 20,
      marginHorizontal: 24,
    },
    skeleton: {
      backgroundColor: isDark
        ? Colors.skeletonBackground.dark
        : Colors.skeletonBackground.light,
      borderRadius: 8,
    },
    headerTitleSkeleton: {
      height: 30,
      width: "60%",
      marginBottom: 8,
    },
    headerSubtitleSkeleton: {
      height: 18,
      width: "80%",
    },
    sectionTitleSkeleton: {
      height: 22,
      width: "40%",
      marginBottom: 16,
      marginLeft: 24,
    },
    monthlyGoalSkeleton: {
      height: 120,
      marginHorizontal: 24,
      borderRadius: 16,
    },
    monthlyGoalOuterContainer: {
      paddingHorizontal: 24,
      marginBottom: 24,
    },
    filtersContainer: {
      paddingHorizontal: 24,
      marginBottom: 24,
    },
    filtersContent: {
      paddingLeft: 24,
      paddingRight: 8,
    },
  });
}

