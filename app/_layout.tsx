import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Colors } from "../constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "BaruSans-Thin": require("../assets/fonts/BaruSansDemo-Thin.otf"),
    "BaruSans-ExtraLight": require("../assets/fonts/BaruSansDemo-ExtraLight.otf"),
    "BaruSans-Light": require("../assets/fonts/BaruSansDemo-Light.otf"),
    "BaruSans-Regular": require("../assets/fonts/BaruSansDemo-Regular.otf"),
    "BaruSans-Medium": require("../assets/fonts/BaruSansDemo-Medium.otf"),
    "BaruSans-SemiBold": require("../assets/fonts/BaruSansDemo-SemiBold.otf"),
    "BaruSans-Bold": require("../assets/fonts/BaruSansDemo-Bold.otf"),
    "BaruSans-ExtraBold": require("../assets/fonts/BaruSansDemo-ExtraBold.otf"),
    "BaruSans-Black": require("../assets/fonts/BaruSansDemo-Black.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.dark.background,
            },
            headerTintColor: Colors.text.primary,
            headerTitleStyle: {
              fontFamily: "BaruSans-SemiBold",
            },
          }}
        >
          <Stack.Screen
            name="(tabs)/explore"
            options={{ headerTitle: "Explore" }}
          />
          <Stack.Screen name="(tabs)/index" options={{ headerTitle: "Home" }} />
          <Stack.Screen name="shift/[id]" />
          <Stack.Screen name="organization/[id]" />
          <Stack.Screen
            name="confirmation/[id]"
            options={{ headerShown: false }}
          />
        </Stack>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

