import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";

export default function CreditsScreen() {
  const renderContributionsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contributions</Text>
      <View style={styles.teamCard}>
        <View style={styles.teamMember}>
          <View
            style={[styles.memberAvatar, { backgroundColor: Colors.primary }]}
          >
            <Text style={styles.memberInitial}>A</Text>
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>Aadi Sanghvi</Text>
            <Text style={styles.memberRole}>
              Chief Executive Officer, Developer
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.teamMember}>
          <View style={[styles.memberAvatar, { backgroundColor: "#4CAF50" }]}>
            <Text style={styles.memberInitial}>A</Text>
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>Ahaan Girotra</Text>
            <Text style={styles.memberRole}>
              Chief Financial Officer & Quality Assurance
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.teamMember}>
          <View style={[styles.memberAvatar, { backgroundColor: "#FF9800" }]}>
            <Text style={styles.memberInitial}>A</Text>
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>Aarohan Sharma</Text>
            <Text style={styles.memberRole}>
              Chief Operations Officer & Strategic Partnerships
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderTechnologiesSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Technologies</Text>
      <View style={styles.techCard}>
        <View style={styles.techItem}>
          <Ionicons name="logo-react" size={24} color={Colors.primary} />
          <Text style={styles.techName}>React Native</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.techItem}>
          <Ionicons name="logo-javascript" size={24} color={Colors.primary} />
          <Text style={styles.techName}>TypeScript</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.techItem}>
          <Ionicons name="server" size={24} color={Colors.primary} />
          <Text style={styles.techName}>Supabase</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.techItem}>
          <Ionicons name="phone-portrait" size={24} color={Colors.primary} />
          <Text style={styles.techName}>Expo</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContributionsSection()}
        {renderTechnologiesSection()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: Colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  teamCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  teamMember: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  memberInitial: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
  techCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  techItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  techName: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.text.primary,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
});

