import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Animated, Easing } from "react-native";
import { Colors } from "../constants/Colors";

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 32,
  color = Colors.text.secondary,
}) => {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000, // Rotation speed
        easing: Easing.linear,
        useNativeDriver: true, // Use native driver for performance
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Ionicons
        name="refresh" // Or choose another icon like 'sync' or 'aperture'
        size={size}
        color={color}
      />
    </Animated.View>
  );
};
