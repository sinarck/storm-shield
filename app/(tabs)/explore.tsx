import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ShiftCard } from "../../components/ShiftCard"; // Ensure path is correct
import { ListSkeleton } from "../../components/SkeletonLoader";
import { Colors } from "../../constants/Colors";
import { useShifts } from "../../hooks/useApi";
import { ShiftWithOrganization } from "../../services/api";

export default function ExploreScreen() {
  const { data: shifts, isLoading, error } = useShifts();

  const renderShiftItem = ({ item }: { item: ShiftWithOrganization }) => (
    <ShiftCard
      key={item.id}
      title={item.title}
      organizationName={item.organizations?.name || "Unknown Org"}
      date={item.date}
      time={`${item.start_time.substring(0, 5)} - ${item.end_time.substring(
        0,
        5
      )}`}
      location={item.location || "Remote"}
      imageUrl={null}
      onPress={() => router.navigate(`/shift/${item.id}`)}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        {/* Use ListSkeleton with ShiftCard style skeleton */}
        {/* Note: ListSkeleton currently renders CardSkeleton which might differ slightly */}
        {/* For perfect match, create a specific ShiftCardSkeleton or adjust CardSkeleton */}
        <ListSkeleton count={5} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>
          Error loading shifts. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {shifts && shifts.length > 0 ? (
        <FlatList
          data={shifts}
          renderItem={renderShiftItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={[styles.container, styles.centerContent]}>
          <Text style={styles.emptyText}>No shifts available right now.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContent: {
    justifyContent: "center",
  },
  listContent: {
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: "center",
  },
});

