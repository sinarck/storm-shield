/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";

type ColorValue = {
  light: string;
  dark: string;
};

type NestedColorValue = {
  [key: string]: ColorValue;
};

type ColorPath = {
  [K in keyof typeof Colors]: (typeof Colors)[K] extends ColorValue
    ? K
    : (typeof Colors)[K] extends NestedColorValue
    ? `${K}.${keyof (typeof Colors)[K] & string}`
    : never;
}[keyof typeof Colors];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorPath
) {
  const { isDark } = useTheme();
  const colorFromProps = props[isDark ? "dark" : "light"];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    const [first, second] = colorName.split(".") as [
      keyof typeof Colors,
      string
    ];
    if (second) {
      const nestedColor = Colors[first] as NestedColorValue;
      return nestedColor[second][isDark ? "dark" : "light"];
    }
    return (Colors[first] as ColorValue)[isDark ? "dark" : "light"];
  }
}

