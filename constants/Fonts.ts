export const Fonts = {
  thin: "Satoshi-Thin",
  light: "Satoshi-Light",
  regular: "Satoshi-Regular",
  medium: "Satoshi-Medium",
  bold: "Satoshi-Bold",
  black: "Satoshi-Black",
} as const;

// Mapping from old BaruSans weights to Satoshi weights
export const FontMapping = {
  "BaruSans-Thin": Fonts.thin,
  "BaruSans-ExtraLight": Fonts.light,
  "BaruSans-Light": Fonts.light,
  "BaruSans-Regular": Fonts.regular,
  "BaruSans-Medium": Fonts.medium,
  "BaruSans-SemiBold": Fonts.bold,
  "BaruSans-Bold": Fonts.bold,
  "BaruSans-ExtraBold": Fonts.black,
  "BaruSans-Black": Fonts.black,
} as const;
