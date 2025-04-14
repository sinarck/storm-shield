import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { useHaptics } from "../hooks/useHaptics";

interface OrganizationCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  rating: number;
  onPress?: () => void;
}

const DEFAULT_ORG_IMAGE = "https://via.placeholder.com/100?text=Org";

/**
 * Card component for displaying organization information
 */
export const OrganizationCard: React.FC<OrganizationCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  rating,
  onPress,
}) => {
  const triggerHaptic = useHaptics("light");

  const handlePress = async () => {
    await triggerHaptic();
    if (onPress) {
      onPress();
    } else {
      router.navigate(`/organization/${id}`);
    }
  };

  const RatingStars = ({ rating }: { rating: number }) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

    return (
      <View style={styles.ratingContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesome
            key={`full_${i}`}
            name="star"
            size={14}
            color={Colors.rating}
          />
        ))}
        {halfStar && (
          <FontAwesome
            key="half"
            name="star-half-full"
            size={14}
            color={Colors.rating}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesome
            key={`empty_${i}`}
            name="star-o"
            size={14}
            color={Colors.rating}
          />
        ))}
      </View>
    );
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      android_ripple={{ color: Colors.overlay.light }}
    >
      {/* <Image
        source={{ uri: imageUrl || DEFAULT_ORG_IMAGE }}
        style={styles.image}
      /> */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.footer}>
          <RatingStars rating={rating} />
          <View style={styles.arrowContainer}>
            <Ionicons
              name="arrow-forward"
              size={18}
              color={Colors.text.muted}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    backgroundColor: Colors.border,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontFamily: "BaruSans-SemiBold",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: "BaruSans-Regular",
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  arrowContainer: {
    // Style if needed, pushes arrow to the right
  },
});

