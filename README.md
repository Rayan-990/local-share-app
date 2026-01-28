# LocalShare - Local File Sharing App

A modern, fast, and easy-to-use local file sharing application for Android devices. Share files seamlessly over your local network without requiring internet connectivity, similar to AirDrop but for Android.

## Features

- **Fast Local Network Transfer**: Share files instantly over your local WiFi network
- **Device Discovery**: Automatically discovers nearby devices running LocalShare
- **Background Service**: Continues to discover and receive files even when the app is in the background
- **Transfer History**: Keep track of sent and received files
- **Progress Tracking**: Real-time transfer speed and ETA display
- **Dark Mode Support**: Beautiful UI that adapts to your device's theme
- **No Internet Required**: Works completely offline on your local network

## Installation

### Quick Start (Using start.sh)

On your Linux machine:

```bash
./start.sh
```

This script will:
1. Check for dependencies
2. Build the APK if not already built
3. Provide instructions for installing on your Android device

### Manual Installation

1. **Build the APK**:
   ```bash
   cd local-share-app
   pnpm install
   npx expo prebuild --platform android --clean
   cd android
   ./gradlew assembleRelease
   cd ..
   ```

2. **Install on Android Device**:
   ```bash
   adb install android/app/build/outputs/apk/release/app-release.apk
   ```

## Usage

### Sharing Files

1. Open LocalShare on your device
2. Tap "Share Files"
3. Select the files you want to share
4. Choose a nearby device from the list
5. Files will transfer automatically

### Receiving Files

1. Open LocalShare on your device
2. Go to "Receive Files" tab
3. Other devices can now send files to you
4. Accept incoming transfers when prompted
5. Files are saved to your device's storage

### Background Service

1. Go to Settings
2. Enable "Background Service"
3. LocalShare will continue discovering devices and receiving files even when closed

## System Requirements

- **Android**: 7.0 (API 24) or higher
- **RAM**: Minimum 2GB
- **Storage**: ~50MB for app installation
- **Network**: WiFi connection (same network as other devices)

## Architecture

LocalShare uses the following technologies:

- **React Native**: Cross-platform mobile app development
- **Expo**: Managed React Native framework
- **TypeScript**: Type-safe development
- **NativeWind**: Tailwind CSS for React Native styling
- **AsyncStorage**: Local data persistence
- **expo-document-picker**: File selection

## Network Protocol

LocalShare uses:

- **mDNS/Bonjour**: For local device discovery
- **TCP**: For reliable file transfer
- **Chunked Transfer**: Large files are split into manageable chunks
- **Checksum Verification**: Ensures file integrity during transfer

## Project Structure

```
local-share-app/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx              # Home screen
│   │   ├── nearby-devices.tsx     # Device selection
│   │   ├── receive-files.tsx      # Incoming transfers
│   │   ├── sent-files.tsx         # Transfer history
│   │   └── settings.tsx           # App settings
│   └── _layout.tsx                # Root layout with providers
├── lib/
│   ├── network-service.ts         # Network discovery & file transfer
│   ├── share-context.tsx          # State management
│   └── utils.ts                   # Utility functions
├── components/
│   ├── screen-container.tsx       # SafeArea wrapper
│   └── ui/
│       └── icon-symbol.tsx        # Icon mapping
├── assets/
│   └── images/
│       ├── icon.png               # App icon
│       ├── splash-icon.png        # Splash screen
│       └── favicon.png            # Web favicon
├── app.config.ts                  # Expo configuration
├── tailwind.config.js             # Tailwind CSS config
└── package.json                   # Dependencies
```

## Development

### Setup Development Environment

```bash
cd local-share-app
pnpm install
```

### Start Development Server

```bash
pnpm dev
```

### Build for Android

```bash
pnpm android
```

### Run Tests

```bash
pnpm test
```

## Future Enhancements

- [ ] iOS support
- [ ] Folder sharing
- [ ] Compression before transfer
- [ ] Bandwidth throttling
- [ ] Encrypted transfers
- [ ] QR code device pairing
- [ ] Cloud backup integration
- [ ] File preview before transfer

## Troubleshooting

### Devices Not Discovering Each Other

1. Ensure both devices are on the same WiFi network
2. Check if firewall is blocking local network access
3. Restart the app on both devices
4. Restart your WiFi router

### Transfer Speed is Slow

1. Move closer to the WiFi router
2. Reduce interference from other devices
3. Check WiFi signal strength
4. Try transferring smaller files first

### APK Installation Fails

1. Ensure USB Debugging is enabled on your device
2. Update ADB: `adb kill-server && adb start-server`
3. Try: `adb install -r android/app/build/outputs/apk/release/app-release.apk`

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for fast local file sharing**
