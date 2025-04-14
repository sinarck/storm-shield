import { Redirect } from "expo-router";
import React from "react";

/**
 * Root entry point for the app.
 * Redirects to the first tab of the main application layout.
 */
export default function RootIndex() {
  // For now, directly redirect.
  // In the future, you could add logic here for auth checks, loading initial config, etc.
  // If initial loading/checks were needed, you might show a loading indicator first.

  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
  //      <ActivityIndicator size="large" color={Colors.primary} />
  //   </View>
  // );

  // Redirect to the base path of the tabs layout
  return <Redirect href="/(tabs)" />;
}

