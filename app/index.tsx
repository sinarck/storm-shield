import { router, Stack } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { AchievementCard } from "../components/AchievementCard";
import { OrganizationCard } from "../components/OrganizationCard";
import { ProgressBar } from "../components/ProgressBar";
import { mockUserData } from "../config/mockData";
import { Colors } from "../constants/Colors";

export default function HomeScreen() {
  /**
   * Navigate to the organization details page
   * @param id - Organization ID
   */
  const handleOrganizationPress = (id: string) => {
    router.push(`/organization/${id}`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.text.primary,
          headerShadowVisible: false,
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.welcomeText}>
              Welcome Back, {mockUserData.name}!
            </Text>
          </View>

          <View style={styles.goalCard}>
            <Text style={styles.cardSectionTitle}>Monthly Goal</Text>
            <ProgressBar progress={mockUserData.monthlyGoal.completed} />
            <Text style={styles.goalText}>
              {mockUserData.monthlyGoal.hoursLeft} hours of volunteering left
              this month.
            </Text>
          </View>

          {/* Display achievements before organizations */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            {mockUserData.achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
              />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Organizations</Text>
            {mockUserData.organizations.map((organization) => (
              <OrganizationCard
                key={organization.id}
                title={organization.title}
                description={organization.description}
                imageUrl={organization.imageUrl}
                rating={organization.rating}
                onPress={() => handleOrganizationPress(organization.id)}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: "BaruSans-Bold",
    color: Colors.text.primary,
  },
  goalCard: {
    backgroundColor: Colors.cardBackground,
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "BaruSans-SemiBold",
    color: Colors.text.primary,
    marginLeft: 16,
    marginBottom: 8,
  },
  cardSectionTitle: {
    fontSize: 18,
    fontFamily: "BaruSans-SemiBold",
    color: Colors.text.primary,
    marginBottom: 12,
  },
  goalText: {
    color: Colors.text.secondary,
    marginTop: 8,
    fontSize: 14,
    fontFamily: "BaruSans-Regular",
  },
});

