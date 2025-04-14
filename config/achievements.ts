/**
 * Interface defining the structure for an Achievement.
 */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Corresponds to FontAwesome5 icon name
  requirementType: "hours" | "shifts" | "streak" | "special";
  requirementValue: number;
}

/**
 * Hardcoded list of achievements for the application.
 */
export const achievements: Achievement[] = [
  {
    id: "achieve-1",
    title: "First Steps",
    description: "Complete your first volunteer shift",
    icon: "walking",
    requirementType: "shifts",
    requirementValue: 1,
  },
  {
    id: "achieve-2",
    title: "Helping Hand",
    description: "Volunteer for 10 total hours",
    icon: "hands-helping",
    requirementType: "hours",
    requirementValue: 10,
  },
  {
    id: "achieve-3",
    title: "Dedicated Volunteer",
    description: "Complete 5 volunteer shifts.",
    icon: "star",
    requirementType: "shifts",
    requirementValue: 5,
  },
  {
    id: "achieve-4",
    title: "Community Champion",
    description: "Volunteer for 50 total hours.",
    icon: "trophy",
    requirementType: "hours",
    requirementValue: 50,
  },
  {
    id: "achieve-5",
    title: "Consistent Contributor",
    description: "Volunteer for 3 consecutive weeks.",
    icon: "calendar-check",
    requirementType: "streak",
    requirementValue: 3,
  },
];

