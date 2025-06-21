import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";
import { useHaptics } from "../hooks/useHaptics";
import { useOnboarding, UserProfile } from "../hooks/useOnboarding";

const SKILLS_OPTIONS = [
  "First Aid",
  "CPR",
  "Food Preparation",
  "Event Planning",
  "Teaching",
  "Construction",
  "Driving",
  "Translation",
  "Medical",
  "Counseling",
  "Administrative",
  "Technology",
];

const INTERESTS_OPTIONS = [
  "Disaster Relief",
  "Food Security",
  "Education",
  "Healthcare",
  "Environmental",
  "Animal Welfare",
  "Community Building",
  "Youth Programs",
  "Senior Care",
  "Housing",
  "Transportation",
  "Mental Health",
];

export default function OnboardingScreen() {
  const { completeOnboarding } = useOnboarding();
  const triggerHaptic = useHaptics("medium");
  const triggerSuccess = useHaptics("success");

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    fullName: "",
    age: "",
    zipCode: "",
    address: "",
    email: "",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
    skills: [],
    interests: [],
  });

  const steps = [
    {
      title: "Welcome to Storm Shield",
      subtitle: "Let's get to know you better",
      description:
        "We're excited to have you join our community of volunteers making a difference.",
    },
    {
      title: "Personal Information",
      subtitle: "Basic details about you",
      description: "This helps us match you with the right opportunities.",
    },
    {
      title: "Contact Information",
      subtitle: "How we can reach you",
      description:
        "We'll use this to keep you updated about volunteer opportunities.",
    },
    {
      title: "Emergency Contact",
      subtitle: "Safety first",
      description: "In case of emergencies during volunteer activities.",
    },
    {
      title: "Skills & Interests",
      subtitle: "What you bring to the table",
      description:
        "This helps us match you with the most suitable volunteer opportunities.",
    },
    {
      title: "You're All Set!",
      subtitle: "Ready to make an impact",
      description:
        "Thank you for joining our community. Let's start making a difference together!",
    },
  ];

  const updateFormData = (field: keyof UserProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    const currentSkills = formData.skills || [];
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s) => s !== skill)
      : [...currentSkills, skill];
    updateFormData("skills", updatedSkills);
  };

  const toggleInterest = (interest: string) => {
    const currentInterests = formData.interests || [];
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter((i) => i !== interest)
      : [...currentInterests, interest];
    updateFormData("interests", updatedInterests);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.age && formData.zipCode);
      case 2:
        return !!(formData.email && formData.phone);
      case 3:
        return !!(formData.emergencyContact && formData.emergencyPhone);
      case 4:
        return (
          (formData.skills?.length || 0) > 0 &&
          (formData.interests?.length || 0) > 0
        );
      default:
        return true;
    }
  };

  const handleNext = async () => {
    await triggerHaptic();

    if (currentStep === steps.length - 1) {
      // Complete onboarding
      try {
        await triggerSuccess();
        await completeOnboarding(formData as UserProfile);
        router.replace("/(tabs)");
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to complete onboarding. Please try again."
        );
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = async () => {
    await triggerHaptic();
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.welcomeContainer}>
            <View style={styles.welcomeIcon}>
              <Ionicons
                name="shield-checkmark"
                size={80}
                color={Colors.primary}
              />
            </View>
            <Text style={styles.welcomeTitle}>Welcome to Storm Shield</Text>
            <Text style={styles.welcomeSubtitle}>
              Your gateway to meaningful volunteer opportunities in disaster
              relief and community service.
            </Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={Colors.success}
                />
                <Text style={styles.featureText}>
                  Find local volunteer opportunities
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={Colors.success}
                />
                <Text style={styles.featureText}>
                  Track your impact and achievements
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={Colors.success}
                />
                <Text style={styles.featureText}>
                  Connect with organizations
                </Text>
              </View>
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput
                style={styles.textInput}
                value={formData.fullName}
                onChangeText={(text) => updateFormData("fullName", text)}
                placeholder="Enter your full name"
                placeholderTextColor={Colors.text.muted}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Age *</Text>
              <TextInput
                style={styles.textInput}
                value={formData.age}
                onChangeText={(text) => updateFormData("age", text)}
                placeholder="Enter your age"
                placeholderTextColor={Colors.text.muted}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Zip Code *</Text>
              <TextInput
                style={styles.textInput}
                value={formData.zipCode}
                onChangeText={(text) => updateFormData("zipCode", text)}
                placeholder="Enter your zip code"
                placeholderTextColor={Colors.text.muted}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={formData.address}
                onChangeText={(text) => updateFormData("address", text)}
                placeholder="Enter your address"
                placeholderTextColor={Colors.text.muted}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address *</Text>
              <TextInput
                style={styles.textInput}
                value={formData.email}
                onChangeText={(text) => updateFormData("email", text)}
                placeholder="Enter your email"
                placeholderTextColor={Colors.text.muted}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number *</Text>
              <TextInput
                style={styles.textInput}
                value={formData.phone}
                onChangeText={(text) => updateFormData("phone", text)}
                placeholder="Enter your phone number"
                placeholderTextColor={Colors.text.muted}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Emergency Contact Name *</Text>
              <TextInput
                style={styles.textInput}
                value={formData.emergencyContact}
                onChangeText={(text) =>
                  updateFormData("emergencyContact", text)
                }
                placeholder="Enter emergency contact name"
                placeholderTextColor={Colors.text.muted}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Emergency Contact Phone *</Text>
              <TextInput
                style={styles.textInput}
                value={formData.emergencyPhone}
                onChangeText={(text) => updateFormData("emergencyPhone", text)}
                placeholder="Enter emergency contact phone"
                placeholderTextColor={Colors.text.muted}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.formContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills & Certifications</Text>
              <Text style={styles.sectionDescription}>
                Select any skills or certifications you have (select all that
                apply)
              </Text>
              <View style={styles.chipContainer}>
                {SKILLS_OPTIONS.map((skill) => (
                  <Pressable
                    key={skill}
                    style={[
                      styles.chip,
                      (formData.skills || []).includes(skill) &&
                        styles.chipSelected,
                    ]}
                    onPress={() => toggleSkill(skill)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        (formData.skills || []).includes(skill) &&
                          styles.chipTextSelected,
                      ]}
                    >
                      {skill}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Areas of Interest</Text>
              <Text style={styles.sectionDescription}>
                What types of volunteer work interest you most?
              </Text>
              <View style={styles.chipContainer}>
                {INTERESTS_OPTIONS.map((interest) => (
                  <Pressable
                    key={interest}
                    style={[
                      styles.chip,
                      (formData.interests || []).includes(interest) &&
                        styles.chipSelected,
                    ]}
                    onPress={() => toggleInterest(interest)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        (formData.interests || []).includes(interest) &&
                          styles.chipTextSelected,
                      ]}
                    >
                      {interest}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        );

      case 5:
        return (
          <View style={styles.welcomeContainer}>
            <View style={styles.welcomeIcon}>
              <Ionicons name="rocket" size={80} color={Colors.primary} />
            </View>
            <Text style={styles.welcomeTitle}>You're All Set!</Text>
            <Text style={styles.welcomeSubtitle}>
              Thank you for joining our community of volunteers. You're now
              ready to start making a difference in your community.
            </Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons name="search" size={24} color={Colors.primary} />
                <Text style={styles.featureText}>
                  Browse volunteer opportunities
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="calendar" size={24} color={Colors.primary} />
                <Text style={styles.featureText}>Sign up for shifts</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="trophy" size={24} color={Colors.primary} />
                <Text style={styles.featureText}>Track your achievements</Text>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentStep + 1) / steps.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1} of {steps.length}
          </Text>
        </View>

        {/* Step Header */}
        <View style={styles.header}>
          <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
          <Text style={styles.stepSubtitle}>{steps[currentStep].subtitle}</Text>
          <Text style={styles.stepDescription}>
            {steps[currentStep].description}
          </Text>
        </View>

        {/* Step Content */}
        {renderStepContent()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <Pressable style={styles.backButton} onPress={handleBack}>
              <Ionicons
                name="arrow-back"
                size={20}
                color={Colors.text.primary}
              />
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
          )}
          <Pressable
            style={[
              styles.nextButton,
              !validateStep(currentStep) && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!validateStep(currentStep)}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            </Text>
            <Ionicons
              name={
                currentStep === steps.length - 1 ? "checkmark" : "arrow-forward"
              }
              size={20}
              color={Colors.text.primary}
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  scrollContent: {
    paddingBottom: 120,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  stepTitle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 18,
    fontFamily: Fonts.medium,
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  stepDescription: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text.muted,
    lineHeight: 24,
  },
  welcomeContainer: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  welcomeIcon: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  featureList: {
    width: "100%",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  featureText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.text.primary,
    marginLeft: 12,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text.primary,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.text.primary,
  },
  chipTextSelected: {
    color: Colors.text.primary,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 32,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flex: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.text.primary,
    marginLeft: 8,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flex: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonDisabled: {
    backgroundColor: Colors.text.muted,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginRight: 8,
  },
});

