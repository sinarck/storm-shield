# Storm Shield

A cross-platform volunteer management mobile app built with React Native, Expo Router, and Supabase. Storm Shield connects volunteers with organizations to coordinate disaster response and community service efforts.

## Features

- **Volunteer Management**: Browse and register for volunteer shifts
- **Organization Profiles**: View detailed organization information and available opportunities
- **Achievement System**: Track volunteer progress and earn achievements
- **Shift Tracking**: Manage shift registrations and confirmations
- **Profile Management**: Complete user profiles with skills and availability
- **Cross-Platform**: Native iOS and Android support with web compatibility

## Tech Stack

- **Framework**: React Native with Expo SDK 52
- **Navigation**: Expo Router with file-based routing
- **Database**: Supabase (PostgreSQL with real-time subscriptions)
- **State Management**: TanStack React Query for server state
- **UI/UX**: Custom components with Lucide React Native icons
- **Forms**: React Hook Form with Zod validation
- **Styling**: React Native StyleSheet with custom design system
- **Notifications**: Expo Notifications for push messaging

## Getting Started

### Prerequisites

- Node.js 18+ and Yarn
- iOS: Xcode 14+ and iOS 13+ device/simulator
- Android: Android Studio and Android 6+ device/emulator
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd storm-shield
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Environment setup**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Start the development server**
   ```bash
   yarn start
   ```

### Platform-specific Development

```bash
# Start for specific platforms
yarn web      # Web development (localhost:8081)
yarn ios      # iOS simulator
yarn android  # Android emulator
```

## Project Structure

```
storm-shield/
├── app/                    # File-based routing (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   ├── confirmation/      # Shift confirmation flow
│   ├── organization/      # Organization detail views
│   ├── shift/            # Shift detail and management
│   ├── onboarding.tsx    # User onboarding flow
│   ├── profile.tsx       # User profile management
│   └── notifications.tsx # Push notifications
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── ShiftCard.tsx     # Shift display component
│   ├── OrganizationCard.tsx
│   └── VolunteerCard.tsx
├── hooks/                 # Custom React hooks
│   ├── useApi.ts         # API interaction hook
│   ├── useOnboarding.ts  # Onboarding state management
│   └── useUserProfile.ts # User profile management
├── services/              # External service integrations
│   └── api.ts            # Supabase API layer
├── constants/             # App-wide constants
│   ├── Colors.ts         # Color palette
│   └── Fonts.ts          # Typography system
├── types/                 # TypeScript definitions
│   └── supabase.ts       # Database type definitions
└── config/                # Configuration files
    └── achievements.ts    # Achievement definitions
```

## API Architecture

Storm Shield uses a hybrid API approach for optimal cross-platform compatibility:

### Platform Detection
- **Web Development**: Uses local API routes for development
- **Mobile & Production**: Direct Supabase client calls
- **Automatic Detection**: The app automatically chooses the right method

### Data Flow
1. **Authentication**: Supabase Auth for user management
2. **Real-time**: Supabase subscriptions for live updates
3. **Caching**: TanStack React Query for optimistic updates
4. **Validation**: Zod schemas for runtime type safety

## Database Schema

Key entities managed by Supabase:

- **Users**: User profiles with skills and contact information
- **Organizations**: Volunteer organizations and their details  
- **Shifts**: Volunteer opportunities with time/location details
- **Registrations**: User-shift relationship tracking
- **Reviews**: User feedback and ratings system
- **Achievements**: Gamification and progress tracking

## Building for Production

### Mobile Builds (EAS)

```bash
# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android  
eas build --platform android

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

### Web Build

```bash
# Static web build
yarn build:web

# Output directory: dist/
```

## Privacy & Data Management

Storm Shield includes comprehensive privacy compliance features:

### Account Management
- **Account Deletion**: Two-step confirmation process
- **Data Export**: Complete user data export functionality  
- **Data Cleanup**: Automatic removal of personal data and relationships

### Privacy Features
- **Local Storage**: Secure local data caching
- **Data Portability**: Export in accessible formats
- **Consent Management**: Clear privacy controls

## Development Guidelines

### Code Style
- **TypeScript**: Strict mode enabled with comprehensive typing
- **Components**: Functional components with hooks
- **Styling**: Consistent design system with Colors/Fonts constants
- **Navigation**: File-based routing with typed routes

### Testing

```bash
# Run test suite
yarn test

# Lint code
yarn lint
```

### Performance
- **Bundle Size**: Optimized with selective imports
- **Images**: Adaptive icons and optimized assets
- **Caching**: Efficient query caching and persistence

## Troubleshooting

### Common Issues

**API Connection Problems:**
- Verify Supabase credentials in `.env`
- Check network connectivity for mobile devices
- Confirm RLS policies are configured correctly

**Build Failures:**
- Clear Metro cache: `yarn start --clear`
- Reset Expo cache: `expo r -c`
- Verify all dependencies are installed

**Platform-specific Issues:**
- iOS: Ensure Xcode and simulators are updated
- Android: Check Android SDK and emulator configuration
- Web: Use `yarn web` for development server

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`) 
5. Open a Pull Request

## License

This project is part of the Voluntra platform for volunteer coordination and disaster response.

## Support

For questions or support, please reach out through the appropriate channels or create an issue in the repository.