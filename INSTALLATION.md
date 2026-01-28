# LocalShare Installation Guide

Complete guide to install and run LocalShare on Android and iOS devices.

## Quick Links

- **Android Users**: [Android Installation](#android-installation)
- **iPhone Users**: [iOS Installation](#ios-installation)
- **Developers**: [Development Setup](#development-setup)

---

## Android Installation

### Method 1: Using start.sh (Recommended for Linux)

```bash
./start.sh
```

This script will:
1. Check your system for required tools
2. Build the APK if not already built
3. Provide instructions for installation

### Method 2: Manual Installation

#### Prerequisites
- Android device with USB Debugging enabled
- ADB (Android Debug Bridge) installed
- USB cable

#### Steps

1. **Enable USB Debugging on your device**:
   - Go to Settings → About Phone
   - Tap Build Number 7 times
   - Go to Settings → Developer Options
   - Enable USB Debugging

2. **Connect your device via USB**

3. **Install the APK**:
   ```bash
   adb install android/app/build/outputs/apk/release/app-release.apk
   ```

4. **Or reinstall if already installed**:
   ```bash
   adb install -r android/app/build/outputs/apk/release/app-release.apk
   ```

5. **Launch the app**:
   - Open LocalShare from your app drawer
   - Grant necessary permissions

### Method 3: Using Expo Go (For Testing)

1. **Install Expo Go** from Google Play Store
2. **Start development server**:
   ```bash
   cd local-share-app
   pnpm dev
   ```
3. **Scan QR code** with Expo Go app
4. **App opens instantly** with hot-reload

---

## iOS Installation

### Method 1: Using Expo Go (Easiest - No Build Required)

1. **Install Expo Go** from App Store
2. **Start development server**:
   ```bash
   cd local-share-app
   pnpm dev
   ```
3. **Scan QR code** with your iPhone camera
4. **Tap the Expo Go notification** to open the app

### Method 2: Using build-ios.sh

```bash
./build-ios.sh
```

This script will guide you through iOS build options.

### Method 3: Using Xcode (Advanced)

1. **Generate iOS native code**:
   ```bash
   npx expo prebuild --platform ios --clean
   ```

2. **Install dependencies**:
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Open in Xcode**:
   ```bash
   open ios/LocalShare.xcworkspace
   ```

4. **Build and run** (Cmd + R)

### Method 4: TestFlight Distribution (Production)

Requires Apple Developer account ($99/year):

1. **Build for device**:
   ```bash
   eas build --platform ios
   ```

2. **Upload to TestFlight** via App Store Connect

3. **Invite testers** with their Apple ID

4. **Install from TestFlight** on iPhone

---

## Development Setup

### Prerequisites

- Node.js 18+ and pnpm
- Git
- For Android: Android SDK, Java 11+
- For iOS: Xcode (Mac only)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/local-share-app.git
   cd local-share-app
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start development server**:
   ```bash
   pnpm dev
   ```

4. **Open on your device**:
   - Scan QR code with Expo Go (easiest)
   - Or use `pnpm android` / `pnpm ios`

### Available Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm android          # Open on Android device
pnpm ios              # Open on iOS simulator

# Building
pnpm build            # Build server
./start.sh            # Build Android APK
./build-ios.sh        # Build iOS app

# Testing & Linting
pnpm test             # Run tests
pnpm lint             # Lint code
pnpm format           # Format code

# Database
pnpm db:push          # Push database schema
```

---

## System Requirements

### Android

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Android Version | 7.0 (API 24) | 12+ |
| RAM | 2GB | 4GB+ |
| Storage | 50MB | 100MB+ |
| WiFi | 2.4/5GHz | 5GHz |

### iOS

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| iOS Version | 13.0 | 16+ |
| RAM | 2GB | 4GB+ |
| Storage | 50MB | 100MB+ |
| WiFi | 2.4/5GHz | 5GHz |

---

## Troubleshooting

### General Issues

**App won't start**
```bash
# Clear cache and rebuild
rm -rf node_modules .expo
pnpm install
pnpm dev
```

**Devices not discovering each other**
- Ensure both devices are on the same WiFi network
- Check firewall settings
- Restart WiFi router
- Restart the app on both devices

**Transfer speed is slow**
- Move closer to WiFi router
- Reduce interference from other devices
- Try transferring smaller files first
- Use 5GHz WiFi if available

### Android-Specific

**ADB device not found**
```bash
# Restart ADB
adb kill-server
adb start-server

# Check connected devices
adb devices
```

**APK installation fails**
- Enable USB Debugging on device
- Try: `adb install -r app-release.apk`
- Check storage space on device

### iOS-Specific

**CocoaPods errors**
```bash
sudo gem install cocoapods
pod repo update
cd ios && pod install && cd ..
```

**Xcode build errors**
```bash
rm -rf ~/Library/Developer/Xcode/DerivedData/*
rm -rf ios/Pods ios/Podfile.lock
cd ios && pod install && cd ..
```

---

## First Time Setup

### 1. Install the App

Choose your platform and follow the installation method above.

### 2. Grant Permissions

When you first open LocalShare, grant these permissions:
- **Local Network Access**: For device discovery
- **File Access**: For sharing files
- **Storage Access**: For saving received files

### 3. Set Device Name

1. Go to Settings tab
2. Enter a unique device name
3. This name appears to other devices

### 4. Enable Background Service

1. Go to Home screen
2. Toggle "Background Service" ON
3. App will continue discovering devices when closed

### 5. Start Sharing

1. Tap "Share Files"
2. Select files to share
3. Choose a nearby device
4. Files transfer automatically

---

## Advanced Configuration

### Custom Network Port

Edit `lib/network-service.ts` to change the default port:

```typescript
const PORT = 5555; // Change this value
```

### Device Discovery Timeout

Adjust discovery timeout in `lib/share-context.tsx`:

```typescript
const DISCOVERY_TIMEOUT = 30000; // milliseconds
```

### Transfer Chunk Size

Modify chunk size in `lib/network-service.ts`:

```typescript
const CHUNK_SIZE = 64 * 1024; // 64KB chunks
```

---

## Performance Optimization

### For Faster Transfers

1. Use WiFi 5GHz (if available)
2. Keep devices close to router
3. Close unnecessary background apps
4. Disable VPN during transfers
5. Transfer files in batches

### For Better Battery Life

1. Enable Low Power Mode (may reduce speed)
2. Disable background service when not needed
3. Use WiFi instead of Bluetooth
4. Close app when not in use

---

## Uninstallation

### Android

1. **Via Settings**:
   - Settings → Apps → LocalShare → Uninstall

2. **Via ADB**:
   ```bash
   adb uninstall space.manus.local.share.app.t20260128050509
   ```

### iOS

1. **Long press** the LocalShare app icon
2. **Select "Remove App"**
3. **Confirm removal**

---

## Getting Help

- **GitHub Issues**: Report bugs on [GitHub](https://github.com/YOUR_USERNAME/local-share-app/issues)
- **Documentation**: Read [README.md](./README.md)
- **Troubleshooting**: Check [this guide](#troubleshooting)

---

## Next Steps

1. ✅ Install LocalShare
2. ✅ Grant permissions
3. ✅ Set device name
4. ✅ Enable background service
5. ✅ Start sharing files!

**Enjoy fast local file sharing! 🚀**
