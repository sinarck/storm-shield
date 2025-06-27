# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Storm Shield

A cross-platform volunteer management app built with Expo Router and Supabase.

## API Configuration

This app uses a hybrid approach for API calls to ensure compatibility across all platforms:

### How it works:

1. **Web Development**: Uses local API routes (`/app/api/*`) for development
2. **Mobile & Production**: Uses direct Supabase client calls
3. **Static Output**: Web builds use static output for better performance

### Platform-specific behavior:

- **Web (Development)**: API calls go to `http://localhost:8081/api/*`
- **Web (Production)**: API calls go directly to Supabase
- **Mobile (All environments)**: API calls go directly to Supabase

### Configuration:

The `services/api.ts` file automatically detects the platform and environment to choose the appropriate API method. No manual configuration needed.

## Development

```bash
# Install dependencies
yarn install

# Start development server
yarn start

# Run on specific platforms
yarn web    # Web development
yarn ios    # iOS simulator
yarn android # Android emulator
```

## Environment Variables

Create a `.env` file with your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Building

```bash
# Build for web (static)
yarn build:web

# Build for mobile
eas build --platform ios
eas build --platform android
```

## Privacy & Data Management

Storm Shield includes comprehensive privacy features to comply with App Store requirements:

### Account Deletion

- Users can delete their account through the Profile screen
- Two-step confirmation process to prevent accidental deletion
- Removes all personal data, shift registrations, and reviews
- Clears local storage and returns to onboarding

### Data Export

- Users can export their personal data
- Includes profile information, shift registrations, and reviews
- Data is formatted for easy access and portability

### Access

- Profile screen accessible via the person icon in the home screen header
- Settings organized into logical sections: Profile, Settings, and Account

## Troubleshooting

### API Issues:

- **Web not loading**: Ensure you're using `yarn web` for development
- **Mobile API failures**: Check Supabase credentials and network connectivity
- **CORS errors**: Verify Supabase RLS policies are configured correctly

### Build Issues:

- **Static output errors**: The app is configured for static output by default
- **Server output needed**: Change `app.json` web.output to "server" if you need server-side rendering

