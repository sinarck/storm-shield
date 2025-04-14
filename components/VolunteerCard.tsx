import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";

interface VolunteerCardProps {
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  onPress?: () => void;
}

export const VolunteerCard: React.FC<VolunteerCardProps> = ({
  title,
  description,
  imageUrl,
  rating,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color={Colors.rating} />
          <Text style={styles.rating}>{rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: "100%",
    height: 150,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 4,
    color: Colors.text.primary,
    fontSize: 14,
    fontFamily: Fonts.medium,
  },
});

