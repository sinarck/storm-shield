import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { useHaptics } from "../hooks/useHaptics";

interface OrganizationCardProps {
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  onPress?: () => void;
}

/**
 * Card component for displaying organization information
 */
export const OrganizationCard: React.FC<OrganizationCardProps> = ({
  title,
  description,
  imageUrl,
  rating,
  onPress,
}) => {
  const triggerHaptic = useHaptics("light");

  const handlePress = async () => {
    await triggerHaptic();
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      android_ripple={{ color: "rgba(255,255,255,0.1)" }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
        <View style={styles.ratingBadge}>
          <FontAwesome name="star" size={12} color={Colors.rating} />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.descriptionContainer}>
          <Ionicons
            name="information-circle-outline"
            size={14}
            color={Colors.text.secondary}
            style={styles.infoIcon}
          />
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressed: {
    opacity: 0.85,
  },
  imageContainer: {
    position: "relative",
    height: 160,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  ratingBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: Colors.text.primary,
    fontSize: 12,
    fontFamily: "BaruSans-Medium",
    marginLeft: 4,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "BaruSans-SemiBold",
    color: Colors.text.primary,
    marginBottom: 8,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    marginRight: 4,
  },
  description: {
    flex: 1,
    fontSize: 14,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
  },
});

