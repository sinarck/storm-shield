import React from "react";
import { DimensionValue, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: DimensionValue;
  width?: DimensionValue;
}

/**
 * Progress bar component for displaying completion percentage
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  width = "100%",
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={[styles.container, { height, width }]}>
      <View
        style={[
          styles.progress,
          {
            width: `${clampedProgress}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.progress.background,
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  progress: {
    height: "100%",
    backgroundColor: Colors.progress.fill,
    borderRadius: 6,
    // Add subtle gradient effect with shadow
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },
});

