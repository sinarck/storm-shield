import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)/index"
        options={{ headerShown: false, headerTitle: "Home" }}
      />
      <Stack.Screen
        name="shift/[id]"
        options={{ headerShown: false, headerTitle: "Shift Details" }}
      />
    </Stack>
  );
}

