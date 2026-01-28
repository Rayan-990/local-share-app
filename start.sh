#!/bin/bash

# LocalShare APK Launcher Script
# This script helps you run the LocalShare app on your Android device

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APK_FILE="$PROJECT_DIR/local-share-app/android/app/build/outputs/apk/release/app-release.apk"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║          LocalShare - Local File Sharing App               ║"
echo "║                     Setup Script                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if APK exists
if [ ! -f "$APK_FILE" ]; then
    echo "❌ APK file not found at: $APK_FILE"
    echo ""
    echo "Building APK... This may take a few minutes."
    echo ""
    
    cd "$PROJECT_DIR/local-share-app"
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing dependencies..."
        pnpm install
    fi
    
    # Check if Android native code exists
    if [ ! -d "android" ]; then
        echo "🔨 Generating Android native code..."
        npx expo prebuild --platform android --clean
    fi
    
    # Build APK
    echo "🏗️  Building APK with Gradle..."
    cd android
    ./gradlew assembleRelease
    cd ..
fi

# Check if APK was built successfully
if [ -f "$APK_FILE" ]; then
    echo ""
    echo "✅ APK built successfully!"
    echo "📱 APK location: $APK_FILE"
    echo ""
    echo "Next steps:"
    echo "1. Connect your Android device via USB"
    echo "2. Enable USB Debugging on your device"
    echo "3. Run: adb install $APK_FILE"
    echo ""
    echo "Or use:"
    echo "   adb install -r $APK_FILE  (to reinstall)"
    echo ""
else
    echo "❌ APK build failed. Check the build logs above."
    exit 1
fi
