# Expo Toolbox Challenge - Video Streaming Application

A feature-rich video streaming mobile application built with React Native and Expo. This application demonstrates a complete video viewing experience with authentication, offline downloads, bookmarking, and watch history tracking.

## Overview

This project is a challenge-test video streaming platform that enables users to browse, watch, bookmark, and download videos for offline viewing. Built with React Native and Expo, it delivers a native mobile experience on both iOS and Android platforms, with additional web support through React Native Web.

## Key Features

### Core Functionality
- **User Authentication**: Secure login system with token-based authentication and automatic token refresh
- **Video Streaming**: High-quality video playback with custom controls and Picture-in-Picture support
- **Offline Downloads**: Download videos to watch later without an internet connection
- **Bookmarks**: Save favorite videos for quick access
- **Watch History**: Track previously watched videos with automatic history management
- **User Profile**: Personalized user profile management

### User Experience
- **Multi-language Support**: English and Spanish localization (i18n)
- **Dark/Light Theme**: Automatic theme switching based on system preferences
- **Responsive Design**: Optimized for various screen sizes and orientations
- **Smooth Navigation**: Intuitive bottom tab navigation with dynamic badges for active downloads
- **Custom Video Controls**: Play/pause, seek, fullscreen, and orientation controls

### Technical Implementation
- **State Management**: Redux Toolkit with Redux Persist for data persistence
- **Fast Storage**: React Native MMKV for high-performance local storage
- **Error Handling**: Robust error handling with fallback UI
- **TypeScript Support**: Type-safe code for better development experience
- **Modern Architecture**: Clean separation of concerns with hooks, services, and components

## Tech Stack

### Frontend
- **React Native** (0.81.4) - Cross-platform mobile development
- **Expo** (^54.0.7) - Development platform and toolchain
- **React** (19.1.0) - UI library
- **TypeScript** - Type-safe development

### Navigation
- **React Navigation** - Navigation library
  - Native Stack Navigator
  - Bottom Tab Navigator

### State Management
- **Redux Toolkit** (^2.9.0) - State management
- **Redux Persist** (^6.0.0) - Persistent state storage
- **React Native MMKV** (^3.3.3) - Fast key-value storage

### Media & UI
- **Expo Video** (^3.0.11) - Video playback with PiP support
- **Expo Image** (^3.0.9) - Optimized image component
- **Expo File System** (^19.0.17) - File management for downloads
- **React Native Gesture Handler** - Touch gestures
- **Expo Screen Orientation** - Orientation control

### Internationalization
- **i18n-js** (^4.5.1) - Multi-language support

### Development
- **Expo Dev Client** - Custom development builds
- **React Native Web** - Web platform support

## Project Structure

```
expotoolboxChallenge/
├── src/
│   ├── api/                    # API services and HTTP clients
│   │   ├── clients/           # Fetch client implementation
│   │   ├── config.js          # API configuration
│   │   └── httpClient.js      # HTTP client wrapper
│   ├── components/            # Reusable components
│   │   ├── ThemedText.jsx    # Themed text component
│   │   └── ThemedView.jsx    # Themed view component
│   ├── constants/             # App constants
│   │   └── theme.js          # Theme definitions
│   ├── hooks/                 # Custom React hooks
│   │   └── useTokenRefresh.js # Token refresh logic
│   ├── i18n/                  # Internationalization
│   │   ├── locales/          # Translation files (en, es)
│   │   └── useTranslation.js # Translation hook
│   ├── navigation/            # Navigation configuration
│   │   ├── RootStack.tsx     # Root navigation stack
│   │   └── HomeTabs.jsx      # Bottom tab navigation
│   ├── screens/               # App screens
│   │   ├── Home/             # Home/video listing screen
│   │   ├── VideoPlayer/      # Video player with controls
│   │   ├── Bookmarks/        # Bookmarked videos
│   │   ├── Downloads/        # Downloaded videos
│   │   ├── History/          # Watch history
│   │   ├── Profile/          # User profile
│   │   └── Login/            # Authentication
│   ├── services/              # Business logic services
│   │   ├── fileSystemService.js  # File operations
│   │   └── storageService.js     # Local storage
│   ├── store/                 # Redux store
│   │   ├── slices/           # Redux slices
│   │   └── userManager.js    # User state management
│   └── App.jsx               # App entry point
├── assets/                    # Static assets
├── ios/                       # iOS native code (auto-generated)
├── android/                   # Android native code (auto-generated)
└── package.json              # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for macOS) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd expotoolboxChallenge
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure the app** (Optional)
   - Edit `app.json` to customize app name, slug, and bundle identifiers
   - Update API endpoints in `src/api/config.js` if needed

### Running the App

1. **Start the development server**
   ```sh
   npm start
   ```

2. **Run on specific platforms**

   - **iOS** (macOS only)
     ```sh
     npm run ios
     ```

   - **Android**
     ```sh
     npm run android
     ```

   - **Web**
     ```sh
     npm run web
     ```

3. **Quick launch from terminal**
   
   In the terminal running the development server:
   - Press `i` to open iOS Simulator
   - Press `a` to open Android Emulator
   - Press `w` to open web browser

## Important Notes

### Development Build
This project uses a [development build](https://docs.expo.dev/develop/development-builds/introduction/) and cannot be run with [Expo Go](https://expo.dev/go)

### Continuous Native Generation
The `ios` and `android` folders are gitignored by default as they are automatically generated during the build process ([Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)). 

**Best practices:**
- Do not edit these folders directly
- Use [config plugins](https://docs.expo.dev/config-plugins/) for native customizations
- If native code modifications are necessary, remove these folders from `.gitignore`

### Authentication
The application uses token-based authentication with automatic token refresh

## Implementation Details

### Video Player
- Custom video controls with play/pause, seek, and fullscreen capabilities
- Screen orientation control (portrait/landscape)
- Progress tracking and resume playback functionality

### Downloads
- Download videos for offline viewing
- Progress indicators for active downloads
- Badge notifications for ongoing downloads
- Comprehensive download management

### State Persistence
- User authentication state persists across app restarts
- Bookmarks, history, and downloads are saved locally
- Redux Persist with MMKV for fast, reliable storage

### Internationalization
The application supports multiple languages:
- English (default)
- Spanish

Language is automatically detected from system settings.

## Resources

### Documentation
- [React Navigation Documentation](https://reactnavigation.org/)
- [Expo Documentation](https://docs.expo.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Native Documentation](https://reactnative.dev/)

### Key Libraries
- [Expo Video](https://docs.expo.dev/versions/latest/sdk/video/)
- [Expo File System](https://docs.expo.dev/versions/latest/sdk/filesystem/)
- [React Native MMKV](https://github.com/mrousavy/react-native-mmkv)
- [i18n-js](https://github.com/fnando/i18n)

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -m 'Add feature description'`)
4. Push to the branch (`git push origin feature/feature-name`)
5. Open a Pull Request

## License

This project is part of the Expo Toolbox Challenge.
