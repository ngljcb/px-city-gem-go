# CityGem Go! App

**CityGem Go!** is an interactive treasure hunt app designed to deliver unique and fun adventures. Players can explore real-world locations, solve riddles, and complete challenges through an intuitive interface.

<a href="#"><img src="./city-gem-go/assets/images/banner.gif"></a>

## Key Features

- **Sign Up/Login**: User authentication with `Firebase Authentication` and optional credential saving using `AsyncStorage`.
- **Custom Routes**: Dynamically displays available routes based on the user's location, featuring riddles and challenges.
- **Interactive Riddles**: Users can answer riddles, verify their responses, and advance through routes.
- **Photo and Geolocation**: Validates answers via photos taken at specific geographic locations.
- **Notifications**: Sends reminders to encourage users to return and continue their adventure.
- **Progress Saving**: Combines `Firebase Firestore` for cloud storage and `SQLite` for local caching, optimizing user session and data management.

## Technologies Used

<a href="#"><img src="./city-gem-go/assets/images/presentation.gif"></a>

- **Frontend**: `React Native (Expo)`
- **Backend**: `Firebase Authentication` and `Firestore`
- **Notifications**: `expo-notifications`
- **Geolocation**: `expo-location`
- **Local Storage**: `SQLite` and `AsyncStorage`

## Documentation & Repository

You can download the complete documentation <a href="documentation.pdf">here</a>, including detailed reports of each analysis section. The repository is available <a href="https://github.com/ngljcb/px-city-gem-go">here</a> for browsing all the project resources.

## Requirements

- **Node.js**: Version >= 16.x
- **Expo CLI**: Installable via `npm install -g expo-cli`
- **Firebase Account**: Required for authentication and database setup.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ngljcb/px-city-gem-go.git
   cd px-city-gem-go/city-gem-go
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Firebase**:

   - Create a project on [Firebase Console](https://console.firebase.google.com/).
   - Download the `google-services.json` file (for Android) or `GoogleService-Info.plist` file (for iOS).
   - Place the file in the appropriate directory:
     - Android: `android/app`
     - iOS: `ios/`

4. **Update Firebase configuration**:

   - Edit the `FirebaseConfig.js` file:

     ```javascript
     import { initializeApp } from 'firebase/app';

     const firebaseConfig = {
       apiKey: 'YOUR_API_KEY',
       authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
       projectId: 'YOUR_PROJECT_ID',
       storageBucket: 'YOUR_PROJECT_ID.appspot.com',
       messagingSenderId: 'YOUR_SENDER_ID',
       appId: 'YOUR_APP_ID',
     };

     export const FIREBASE_APP = initializeApp(firebaseConfig);
     ```

5. **Start the app**:
   ```bash
   expo start
   ```

## Project Structure

```
├── app/                 # Main app screens and routes
├── assets/              # Static assets like images and icons
├── components/          # Reusable UI components
├── constants/           # App-wide constants (e.g., colors)
├── models/              # Data models (business logic)
├── services/            # Core services like notifications & database handlers
├── styles/              # Styling files
└── viewmodels/          # Logic to bridge views and models
```

## Key Functionalities

### Notifications

Managed through the `NotificationHandler` class:

- Requests permissions dynamically.
- Schedules notifications with customizable messages.
- Handles app state transitions to trigger background notifications.

### Photo Verification

- Validates user answers via geotagged photos taken at specific locations.
- Utilizes `expo-location` for geolocation checks and saves verified photos to the gallery.

### Route Management

- Loads routes from `Firestore` and caches them in `SQLite` for offline performance.
- Allows users to view and select routes based on proximity.

## License

This project is released under the MIT License. For more details, see the `LICENSE` file.
