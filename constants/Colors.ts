/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

/**
 * App color scheme
 */
export const Colors = {
  primary: "#7254C8", // Richer purple theme color
  background: "#080808", // Darker background for more contrast
  cardBackground: "#151515", // Slightly darker card background
  border: "#272727", // Slightly lighter border for better definition
  skeletonBackground: "#202020", // Added skeleton color
  text: {
    primary: "#FFFFFF",
    secondary: "#A1A1A1",
    accent: "#B8A1FF", // Lighter purple for accents
    muted: "#737373", // For less important text
  },
  progress: {
    background: "#171717",
    fill: "#7254C8",
  },
  rating: "#FFD700", // Gold color for ratings
  divider: "#272727", // Same as border color
  overlay: {
    light: "rgba(0,0,0,0.3)",
    medium: "rgba(0,0,0,0.5)",
    dark: "rgba(0,0,0,0.7)",
  },
  tabBar: {
    active: "#7254C8",
    inactive: "#666666",
    background: "#080808",
  },
  success: "#4CAF50",
  error: "#F44336",
  warning: "#FF9800",
  info: "#2196F3",
  status: {
    success: "#28a745",
    warning: "#ffc107",
    error: "#dc3545",
    info: "#17a2b8",
  },
  shadow: "rgba(0, 0, 0, 0.6)",
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
} as const;

export type ColorScheme = typeof Colors;

