# LocalShare Quick Start Guide

Get LocalShare running in 5 minutes!

## For Android Users (Linux)

```bash
# 1. Run the setup script
./start.sh

# 2. Follow the on-screen instructions
# The script will build the APK and show you how to install it
```

## For Android Users (Manual)

```bash
# 1. Connect your Android device via USB
# 2. Enable USB Debugging on your device

# 3. Install the app
adb install android/app/build/outputs/apk/release/app-release.apk

# 4. Open LocalShare from your app drawer
```

## For iPhone Users (Easiest)

```bash
# 1. Install Expo Go from App Store
# 2. Run this command
pnpm dev

# 3. Scan the QR code with your iPhone camera
# 4. Tap the Expo Go notification
# 5. App opens instantly!
```

## For iPhone Users (Build)

```bash
# 1. Run the iOS build script
./build-ios.sh

# 2. Follow the prompts to choose your build type
# 3. For testing: Use iOS Simulator
# 4. For production: Use TestFlight
```

## First Time Setup

1. **Grant Permissions**
   - Local Network Access
   - File Access
   - Storage Access

2. **Set Device Name**
   - Go to Settings
   - Enter a unique name
   - This is how other devices see you

3. **Enable Background Service** (Optional)
   - Go to Home
   - Toggle "Background Service" ON
   - App continues discovering devices when closed

## Start Sharing

### Send Files
1. Tap "Share Files"
2. Select files
3. Choose a nearby device
4. Done! Files transfer automatically

### Receive Files
1. Go to "Receive Files" tab
2. Other devices can now send to you
3. Accept transfers when prompted
4. Files saved to your storage

## Troubleshooting

**Devices not finding each other?**
- Both on same WiFi network?
- WiFi router supports local network discovery?
- Try restarting the app

**Transfer too slow?**
- Move closer to WiFi router
- Use 5GHz WiFi if available
- Try smaller files first

**App won't start?**
```bash
# Clear cache and reinstall
rm -rf node_modules .expo
pnpm install
pnpm dev
```

## Next Steps

- 📖 Read [INSTALLATION.md](./INSTALLATION.md) for detailed setup
- 🍎 Read [iOS_SETUP.md](./iOS_SETUP.md) for iPhone-specific help
- 🤝 Read [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute
- 💬 Report issues on GitHub

---

**That's it! Start sharing files now! 🚀**
