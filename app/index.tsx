import { Redirect } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";
import { useOnboarding } from "../hooks/useOnboarding";

/**
 * Root entry point for the app.
 * Redirects based on onboarding status.
 */
export default function RootIndex() {
  const { hasOnboarded, isLoading, resetOnboarding } = useOnboarding();

  // Show loading state while checking onboarding status
  if (isLoading) {
    return null; // This will show the splash screen
  }

  // Redirect based on onboarding status
  if (hasOnboarded) {
    return <Redirect href="/(tabs)" />;
  } else {
    return (
      <View style={styles.container}>
        <Redirect href="/onboarding" />
        {/* Dev reset button - only visible in development */}
        {__DEV__ && (
          <Pressable
            style={styles.devButton}
            onPress={async () => {
              console.log("Dev: Resetting onboarding...");
              try {
                await resetOnboarding();
                console.log("Dev: Onboarding reset successfully");
              } catch (error) {
                console.error("Dev: Failed to reset onboarding:", error);
              }
            }}
          >
            <Text style={styles.devButtonText}>Reset Onboarding (Dev)</Text>
          </Pressable>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  devButton: {
    position: "absolute",
    top: 100,
    right: 20,
    backgroundColor: Colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 1000,
  },
  devButtonText: {
    color: Colors.text.primary,
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
});

