/**
 * Simple color hook that returns a single color value
 */

import { Colors } from "@/constants/Colors";

type NestedColorValue = {
  [key: string]: string;
};

type ColorPath = {
  [K in keyof typeof Colors]: (typeof Colors)[K] extends string
    ? K
    : (typeof Colors)[K] extends NestedColorValue
    ? `${K}.${keyof (typeof Colors)[K] & string}`
    : never;
}[keyof typeof Colors];

export function useThemeColor(props: { color?: string }, colorName: ColorPath) {
  if (props.color) {
    return props.color;
  } else {
    const [first, second] = colorName.split(".") as [
      keyof typeof Colors,
      string
    ];
    if (second) {
      const nestedColor = Colors[first] as NestedColorValue;
      return nestedColor[second];
    }
    return Colors[first] as string;
  }
}

