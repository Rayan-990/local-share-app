# iOS Setup Guide for LocalShare

This guide will help you build and run LocalShare on your iPhone.

## Prerequisites

- **Mac with Xcode**: Required for iOS development
- **Xcode Command Line Tools**: Install via `xcode-select --install`
- **CocoaPods**: Install via `sudo gem install cocoapods`
- **Node.js & pnpm**: Already installed if you have the Android setup
- **Apple Developer Account**: Optional (required for device deployment)

## Quick Start

### Option 1: Using Expo Go (Easiest - No Build Required)

1. **Install Expo Go** on your iPhone from the App Store
2. **Start the development server**:
   ```bash
   cd local-share-app
   pnpm dev
   ```
3. **Scan the QR code** with your iPhone camera
4. **Tap the Expo Go notification** to open the app

This is perfect for testing during development!

### Option 2: Build for iOS Simulator (Mac Only)

1. **Generate iOS native code**:
   ```bash
   cd local-share-app
   npx expo prebuild --platform ios --clean
   ```

2. **Install dependencies**:
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Build for simulator**:
   ```bash
   npx expo build:ios --platform ios --type simulator
   ```

4. **Run in simulator**:
   ```bash
   npx expo start --ios
   ```

### Option 3: Build for Physical iPhone (TestFlight)

This requires an Apple Developer account ($99/year).

1. **Prepare your Apple Developer account**:
   - Sign up at [developer.apple.com](https://developer.apple.com)
   - Create an App ID for LocalShare
   - Create a provisioning profile
   - Generate signing certificates

2. **Configure Expo credentials**:
   ```bash
   eas login
   eas credentials
   ```

3. **Build for device**:
   ```bash
   eas build --platform ios
   ```

4. **Upload to TestFlight**:
   - Visit [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Upload the build to TestFlight
   - Invite testers with their Apple ID

5. **Install on iPhone**:
   - Open TestFlight app on your iPhone
   - Accept the invitation
   - Install LocalShare

## Using the Build Script

We've provided `build-ios.sh` for convenience:

```bash
./build-ios.sh
```

This script will:
1. Generate iOS native code if needed
2. Install CocoaPods dependencies
3. Guide you through build options
4. Provide next steps

## iOS Permissions

LocalShare requires the following permissions on iOS:

| Permission | Purpose |
|-----------|---------|
| Local Network Access | Discover nearby devices |
| Bonjour Services | mDNS device discovery |
| Photo Library | Share photos from your library |
| Documents | Access files for sharing |
| Background Modes | Continue sharing in background |

These are automatically requested when needed.

## Troubleshooting

### CocoaPods Issues

```bash
# Update CocoaPods
sudo gem install cocoapods

# Clear cache
rm -rf ~/Library/Developer/Xcode/DerivedData/*
pod repo update
```

### Xcode Build Errors

```bash
# Clean build
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# Try building again
npx expo build:ios --platform ios --type simulator
```

### Permission Denied Errors

```bash
# Fix permissions
sudo chown -R $(whoami) ~/.cocoapods
```

### Simulator Not Available

```bash
# List available simulators
xcrun simctl list devices

# Create a new simulator if needed
xcrun simctl create "iPhone 15" com.apple.CoreSimulator.SimDeviceType.iPhone-15 com.apple.CoreSimulator.SimRuntime.iOS-17-0
```

## Development Workflow

### Using Expo Go (Recommended for Development)

```bash
# Start dev server
pnpm dev

# On your iPhone:
# 1. Open Expo Go app
# 2. Scan QR code
# 3. App opens instantly
# 4. Changes hot-reload automatically
```

### Using Xcode (For Advanced Development)

```bash
# Open Xcode project
open ios/LocalShare.xcworkspace

# Build and run
# Cmd + R in Xcode
```

## Deploying to App Store

Once you're ready to release LocalShare on the App Store:

1. **Prepare app metadata**:
   - App name, description, keywords
   - Screenshots (various iPhone sizes)
   - Privacy policy
   - Support URL

2. **Build for App Store**:
   ```bash
   eas build --platform ios --auto-submit
   ```

3. **Submit for review**:
   - Visit App Store Connect
   - Fill in app information
   - Submit for review
   - Wait for Apple's approval (typically 24-48 hours)

## iOS-Specific Features

LocalShare on iOS includes:

- **Background Service**: Continue discovering and receiving files when app is closed
- **Siri Shortcuts**: Integrate with iOS shortcuts (future)
- **Share Sheet Integration**: Share files directly from other apps (future)
- **iCloud Sync**: Sync device settings across devices (future)

## Performance Tips

1. **Use WiFi 5GHz** for faster transfers
2. **Keep devices close** to the router for better signal
3. **Close background apps** to free up memory
4. **Enable Low Power Mode** if needed (may slow transfers)

## Testing Checklist

Before deploying, test these scenarios:

- [ ] Device discovery works on WiFi
- [ ] File sharing works between iPhone and Android
- [ ] Background service continues after app closes
- [ ] Transfer history is saved correctly
- [ ] Settings persist after app restart
- [ ] Dark mode displays correctly
- [ ] Animations are smooth
- [ ] No crashes during file transfer

## Getting Help

- **Expo Documentation**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **Apple Developer Support**: https://developer.apple.com/support
- **GitHub Issues**: Report bugs on our repository

## Next Steps

1. Test the app on your iPhone using Expo Go
2. Provide feedback on the design and functionality
3. Report any bugs or issues
4. Help us improve LocalShare!

---

**Happy sharing! 🚀**
