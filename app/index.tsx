import { Redirect } from "expo-router";
import React from "react";
import { useOnboarding } from "../hooks/useOnboarding";

/**
 * Root entry point for the app.
 * Redirects based on onboarding status.
 */
export default function RootIndex() {
  const { hasOnboarded, isLoading } = useOnboarding();

  // Show loading state while checking onboarding status
  if (isLoading) {
    return null; // This will show the splash screen
  }

  // Redirect based on onboarding status
  if (hasOnboarded) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/onboarding" />;
  }
}

