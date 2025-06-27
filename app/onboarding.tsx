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
import { SafeAreaView } from "react-native-safe-area-context";
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

type StringUserProfileKeys =
  | "fullName"
  | "age"
  | "zipCode"
  | "addressLine1"
  | "addressLine2"
  | "city"
  | "state"
  | "email"
  | "phone"
  | "emergencyContact"
  | "emergencyPhone";

interface InfoStepProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  features: {
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
    color?: string;
  }[];
  logo?: boolean;
  iconColor?: string;
}

const InfoStep = ({
  icon,
  title,
  subtitle,
  features,
  iconColor,
}: InfoStepProps) => (
  <View style={styles.welcomeContainer}>
    <View style={styles.welcomeIcon}>
      <Ionicons name={icon} size={80} color={iconColor || Colors.primary} />
    </View>
    <Text style={styles.welcomeTitle}>{title}</Text>
    <Text style={styles.welcomeSubtitle}>{subtitle}</Text>
    <View style={styles.featureList}>
      {features.map((feature, index) => (
        <View style={styles.featureItem} key={index}>
          <Ionicons
            name={feature.icon}
            size={24}
            color={feature.color || Colors.success}
          />
          <Text style={styles.featureText}>{feature.text}</Text>
        </View>
      ))}
    </View>
  </View>
);

interface FormField {
  name: StringUserProfileKeys;
  label: string;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
}

interface FormStepProps {
  fields: FormField[];
  formData: Partial<UserProfile>;
  updateFormData: (field: keyof UserProfile, value: any) => void;
}

const FormStep = ({ fields, formData, updateFormData }: FormStepProps) => (
  <View style={styles.formContainer}>
    {fields.map((field) => (
      <View style={styles.inputGroup} key={field.name}>
        <Text style={styles.inputLabel}>{field.label}</Text>
        <TextInput
          style={[styles.textInput, field.multiline && styles.textArea]}
          value={formData[field.name]}
          onChangeText={(text) => updateFormData(field.name, text)}
          placeholder={field.placeholder}
          placeholderTextColor={Colors.text.muted}
          keyboardType={field.keyboardType || "default"}
          autoCapitalize={field.autoCapitalize || "sentences"}
          multiline={field.multiline || false}
          numberOfLines={field.multiline ? 3 : 1}
        />
      </View>
    ))}
  </View>
);

interface SkillsInterestsStepProps {
  formData: Partial<UserProfile>;
  toggleSkill: (skill: string) => void;
  toggleInterest: (interest: string) => void;
}

const SkillsInterestsStep = ({
  formData,
  toggleSkill,
  toggleInterest,
}: SkillsInterestsStepProps) => (
  <View style={styles.formContainer}>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Skills & Certifications</Text>
      <Text style={styles.sectionDescription}>
        Select any skills or certifications you have (select all that apply)
      </Text>
      <View style={styles.chipContainer}>
        {SKILLS_OPTIONS.map((skill) => (
          <Pressable
            key={skill}
            style={[
              styles.chip,
              (formData.skills || []).includes(skill) && styles.chipSelected,
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

interface InfoContent {
  type: "info";
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  features: {
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
    color?: string;
  }[];
}
interface FormContent {
  type: "form";
  fields: FormField[];
}
interface SkillsInterestsContent {
  type: "skills_interests";
}

type StepContent = InfoContent | FormContent | SkillsInterestsContent;

export default function OnboardingScreen() {
  const { completeOnboarding } = useOnboarding();
  const triggerHaptic = useHaptics("medium");
  const triggerSuccess = useHaptics("success");

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    fullName: "",
    age: "",
    zipCode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    email: "",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
    skills: [],
    interests: [],
  });

  const stepsConfig: {
    title: string;
    subtitle: string;
    description: string;
    content: StepContent;
    validate?: (data: Partial<UserProfile>) => boolean;
  }[] = [
    {
      title: "",
      subtitle: "",
      description: "",
      content: {
        type: "info",
        icon: "shield-checkmark",
        title: "Welcome to Storm Shield",
        subtitle:
          "Your gateway to meaningful volunteer opportunities in disaster relief and community service.",
        features: [
          {
            icon: "checkmark-circle",
            text: "Find local volunteer opportunities",
            color: Colors.success,
          },
          {
            icon: "checkmark-circle",
            text: "Track your impact and achievements",
            color: Colors.success,
          },
          {
            icon: "checkmark-circle",
            text: "Connect with organizations",
            color: Colors.success,
          },
        ],
      },
    },
    {
      title: "Personal Information",
      subtitle: "Basic details about you",
      description:
        "This helps us match you with the right opportunities. All data is stored only on-device.",
      content: {
        type: "form",
        fields: [
          {
            name: "fullName",
            label: "Full Name *",
            placeholder: "Enter your full name",
          },
          {
            name: "age",
            label: "Age *",
            placeholder: "Enter your age",
            keyboardType: "numeric",
          },
          {
            name: "addressLine1",
            label: "Address Line 1 *",
            placeholder: "Enter your address",
          },
          {
            name: "addressLine2",
            label: "Address Line 2",
            placeholder: "Apartment, suite, etc. (optional)",
          },
          {
            name: "city",
            label: "City *",
            placeholder: "Enter your city",
          },
          {
            name: "state",
            label: "State *",
            placeholder: "Enter your state",
          },
          {
            name: "zipCode",
            label: "Zip Code *",
            placeholder: "Enter your zip code",
            keyboardType: "numeric",
          },
        ],
      },
      validate: (data: Partial<UserProfile>) =>
        !!(
          data.fullName &&
          data.age &&
          data.addressLine1 &&
          data.city &&
          data.state &&
          data.zipCode
        ),
    },
    {
      title: "Contact Information",
      subtitle: "How we can reach you",
      description:
        "We'll use this to keep you updated about volunteer opportunities.",
      content: {
        type: "form",
        fields: [
          {
            name: "email",
            label: "Email Address *",
            placeholder: "Enter your email",
            keyboardType: "email-address",
            autoCapitalize: "none",
          },
          {
            name: "phone",
            label: "Phone Number *",
            placeholder: "Enter your phone number",
            keyboardType: "phone-pad",
          },
        ],
      },
      validate: (data: Partial<UserProfile>) => !!(data.email && data.phone),
    },
    {
      title: "Emergency Contact",
      subtitle: "Safety first",
      description: "In case of emergencies during volunteer activities.",
      content: {
        type: "form",
        fields: [
          {
            name: "emergencyContact",
            label: "Emergency Contact Name *",
            placeholder: "Enter emergency contact name",
          },
          {
            name: "emergencyPhone",
            label: "Emergency Contact Phone *",
            placeholder: "Enter emergency contact phone",
            keyboardType: "phone-pad",
          },
        ],
      },
      validate: (data: Partial<UserProfile>) =>
        !!(data.emergencyContact && data.emergencyPhone),
    },
    {
      title: "Skills & Interests",
      subtitle: "What you bring to the table",
      description:
        "This helps us match you with the most suitable volunteer opportunities.",
      content: {
        type: "skills_interests",
      },
      validate: (data: Partial<UserProfile>) =>
        (data.skills?.length || 0) > 0 && (data.interests?.length || 0) > 0,
    },
    {
      title: "",
      subtitle: "",
      description: "",
      content: {
        type: "info",
        icon: "rocket",
        title: "You're All Set!",
        subtitle:
          "Thank you for joining our community of volunteers. You're now ready to start making a difference in your community.",
        features: [
          {
            icon: "search",
            text: "Browse volunteer opportunities",
            color: Colors.primary,
          },
          {
            icon: "calendar",
            text: "Sign up for shifts",
            color: Colors.primary,
          },
          {
            icon: "trophy",
            text: "Track your achievements",
            color: Colors.primary,
          },
        ],
      },
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
    const stepConfig = stepsConfig[step];
    if (stepConfig.validate) {
      return stepConfig.validate(formData);
    }
    return true;
  };

  const handleNext = async () => {
    await triggerHaptic();

    if (currentStep === stepsConfig.length - 1) {
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
    const stepConfig = stepsConfig[currentStep];
    const { content } = stepConfig;

    switch (content.type) {
      case "info":
        return <InfoStep {...content} />;
      case "form":
        return (
          <FormStep
            fields={content.fields}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case "skills_interests":
        return (
          <SkillsInterestsStep
            formData={formData}
            toggleSkill={toggleSkill}
            toggleInterest={toggleInterest}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Step Header */}
          {stepsConfig[currentStep].title ? (
            <View style={styles.header}>
              <Text style={styles.stepTitle}>
                {stepsConfig[currentStep].title}
              </Text>
              <Text style={styles.stepSubtitle}>
                {stepsConfig[currentStep].subtitle}
              </Text>
              <Text style={styles.stepDescription}>
                {stepsConfig[currentStep].description}
              </Text>
            </View>
          ) : null}

          {/* Step Content */}
          {renderStepContent()}
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.footer}>
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${((currentStep + 1) / stepsConfig.length) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {currentStep + 1} of {stepsConfig.length}
            </Text>
          </View>
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
                {currentStep === stepsConfig.length - 1 ? "Finish" : "Next"}
              </Text>
              <Ionicons
                name={
                  currentStep === stepsConfig.length - 1
                    ? "checkmark"
                    : "arrow-forward"
                }
                size={20}
                color={Colors.text.primary}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 160,
    flexGrow: 1,
    paddingTop: 16,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
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
    paddingBottom: 24,
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
    flex: 1,
    justifyContent: "center",
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
    marginBottom: 20,
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
    marginBottom: 24,
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

