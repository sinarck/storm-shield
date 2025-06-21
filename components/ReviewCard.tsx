import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";
import { OrganizationReview } from "../services/api";

type ReviewCardProps = {
  review: OrganizationReview & { users: { full_name: string } | null };
};

const RatingStars = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <View style={styles.ratingStarsContainer}>
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesome
          key={`full_${i}`}
          name="star"
          size={16}
          color={Colors.rating}
        />
      ))}
      {halfStar && (
        <FontAwesome
          key="half"
          name="star-half-full"
          size={16}
          color={Colors.rating}
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesome
          key={`empty_${i}`}
          name="star-o"
          size={16}
          color={Colors.rating}
        />
      ))}
    </View>
  );
};

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const reviewerName = review.users?.full_name || "Anonymous";

  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>{reviewerName}</Text>
        <RatingStars rating={review.rating || 0} />
      </View>
      <Text style={styles.reviewComment}>{review.review}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewerName: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.text.primary,
  },
  ratingStarsContainer: {
    flexDirection: "row",
  },
  reviewComment: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});

