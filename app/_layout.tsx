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
import { Fonts } from "../constants/Fonts";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

const fonts = {
  "Satoshi-Light": require("../assets/fonts/Satoshi-Light.otf"),
  "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.otf"),
  "Satoshi-Medium": require("../assets/fonts/Satoshi-Medium.otf"),
  "Satoshi-Bold": require("../assets/fonts/Satoshi-Bold.otf"),
  "Satoshi-Black": require("../assets/fonts/Satoshi-Black.otf"),
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts(fonts);

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
              fontFamily: Fonts.medium,
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

