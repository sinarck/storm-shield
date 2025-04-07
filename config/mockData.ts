/**
 * Mock user data for the application
 */
export const mockUserData = {
  name: "John",
  monthlyGoal: {
    completed: 75,
    hoursLeft: 3,
  },
  organizations: [
    {
      id: "1",
      title: "City of Frisco",
      description: "Mixed, Long Shifts, Community",
      imageUrl: "https://example.com/frisco.jpg",
      rating: 4.8,
      about:
        "North Texas Food Bank is a nonprofit that helps provide food to local communities through donations and volunteer events.",
      minimumAge: "16+",
      skillsNeeded: "Basic food handling",
      shifts: [
        {
          id: "1",
          title: "Food Sorting and Packing",
          date: "Dec 8, 2024",
          time: "3 PM - 6 PM",
          location: "123 Food Drive, Texas",
        },
        {
          id: "2",
          title: "Donation Collection",
          date: "Dec 10, 2024",
          time: "9 AM - 12 PM",
          location: "Frisco Blvd, Texas",
        },
      ],
    },
    {
      id: "2",
      title: "North Texas Food Bank",
      description: "Flexible, Short Shifts, Food",
      imageUrl: "https://example.com/food-bank.jpg",
      rating: 4.5,
      about:
        "North Texas Food Bank is a nonprofit that helps provide food to local communities through donations and volunteer events.",
      minimumAge: "16+",
      skillsNeeded: "Basic food handling",
      shifts: [
        {
          id: "3",
          title: "Food Distribution",
          date: "Dec 15, 2024",
          time: "2 PM - 5 PM",
          location: "456 Main St, Texas",
        },
      ],
    },
  ],
  achievements: [
    {
      id: "1",
      title: "Completed 10 hours of volunteering!",
      description: "You've made a positive impact with your time. Keep it up!",
      icon: "award",
    },
  ],
};

/**
 * Mock shift data by ID
 * @param id - Shift ID
 * @returns Shift data or default data if not found
 */
export const getShiftById = (id: string) => {
  // Search through all organizations for the shift
  for (const org of mockUserData.organizations) {
    const shift = org.shifts.find((s) => s.id === id);
    if (shift) {
      return {
        ...shift,
        imageUrl: org.imageUrl,
        description:
          "Help sort and pack food donations for distribution to local families in need. No prior experience required.",
        minimumAge: org.minimumAge,
        requirements: "Closed-toe shoes required.",
      };
    }
  }

  // Return default shift data if not found
  return {
    id: id || "1",
    title: "Food Sorting and Packing",
    date: "Dec 8, 2024",
    time: "3 PM - 6 PM",
    location: "123 Food Drive, Texas",
    imageUrl: "https://example.com/food-sorting.jpg",
    description:
      "Help sort and pack food donations for distribution to local families in need. No prior experience required.",
    minimumAge: "16+",
    requirements: "Closed-toe shoes required.",
  };
};

/**
 * Get organization data by ID
 * @param id - Organization ID
 * @returns Organization data or default if not found
 */
export const getOrganizationById = (id: string) => {
  const org = mockUserData.organizations.find((o) => o.id === id);

  if (org) {
    return org;
  }

  // Return default organization data if not found
  return mockUserData.organizations[0];
};
