import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

// Base Skeleton view
const SkeletonElement = ({ style }: { style?: object }) => (
  <View style={[styles.skeleton, style]} />
);

// Skeleton for Organization/Shift Card
export const CardSkeleton = () => (
  <View style={styles.cardContainer}>
    <SkeletonElement style={styles.cardImage} />
    <View style={styles.cardContent}>
      <SkeletonElement style={styles.cardTitle} />
      <SkeletonElement style={styles.cardText} />
      <SkeletonElement style={[styles.cardText, { width: "60%" }]} />
    </View>
  </View>
);

// Skeleton for List of Cards
export const ListSkeleton = ({ count = 3 }: { count?: number }) => (
  <View>
    {[...Array(count)].map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </View>
);

// Skeleton for Shift Details Page
export const ShiftDetailSkeleton = () => (
  <View style={styles.detailContainer}>
    <SkeletonElement style={styles.detailTitle} />
    <SkeletonElement style={styles.detailSubtitle} />
    <SkeletonElement style={styles.detailSubtitle} />
    <View style={styles.detailSection}>
      <SkeletonElement style={styles.detailSectionTitle} />
      <SkeletonElement style={styles.detailText} />
      <SkeletonElement style={styles.detailText} />
      <SkeletonElement style={[styles.detailText, { width: "80%" }]} />
    </View>
    <View style={styles.detailSection}>
      <SkeletonElement style={[styles.detailInfoBox, { marginRight: 8 }]} />
      <SkeletonElement style={[styles.detailInfoBox, { marginLeft: 8 }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.skeletonBackground, // Use a dedicated skeleton color
    borderRadius: 8,
  },
  cardContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden", // Keep shimmer effect contained if added later
  },
  cardImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    height: 20,
    width: "80%",
    marginBottom: 8,
  },
  cardText: {
    height: 14,
    width: "100%",
    marginBottom: 6,
  },
  detailContainer: {
    padding: 24,
  },
  detailTitle: {
    height: 30,
    width: "70%",
    marginBottom: 16,
  },
  detailSubtitle: {
    height: 18,
    width: "50%",
    marginBottom: 12,
  },
  detailSection: {
    marginVertical: 16,
  },
  detailSectionTitle: {
    height: 22,
    width: "40%",
    marginBottom: 12,
  },
  detailText: {
    height: 16,
    width: "100%",
    marginBottom: 8,
  },
  detailInfoBox: {
    flex: 1,
    height: 80,
    borderRadius: 12,
  },
});

