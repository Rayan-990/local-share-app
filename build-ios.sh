#!/bin/bash

# LocalShare iOS Build Script
# This script helps you build and deploy LocalShare on iOS devices

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IPA_FILE="$PROJECT_DIR/ios/build/LocalShare.ipa"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║          LocalShare - iOS Build Script                     ║"
echo "║                     for iPhone Users                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if iOS native code exists
if [ ! -d "$PROJECT_DIR/ios" ]; then
    echo "🔨 Generating iOS native code..."
    cd "$PROJECT_DIR"
    npx expo prebuild --platform ios --clean
fi

# Check for CocoaPods
if ! command -v pod &> /dev/null; then
    echo "❌ CocoaPods not found. Please install it:"
    echo "   sudo gem install cocoapods"
    exit 1
fi

# Install dependencies
echo "📦 Installing iOS dependencies..."
cd "$PROJECT_DIR/ios"
pod install

# Build for iOS
echo "🏗️  Building iOS app..."
cd "$PROJECT_DIR"

# Build for simulator (for testing)
echo ""
echo "Choose build option:"
echo "1) Build for Simulator (for testing on Mac)"
echo "2) Build for Device (requires Apple Developer account)"
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo "Building for iOS Simulator..."
        npx expo build:ios --platform ios --type simulator
        ;;
    2)
        echo "Building for iOS Device..."
        echo "Note: This requires an Apple Developer account and a valid provisioning profile."
        npx expo build:ios --platform ios --type app-store
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "✅ iOS build completed!"
echo ""
echo "Next steps:"
echo "1. For Simulator: Download the build and run in Xcode simulator"
echo "2. For Device: Use TestFlight to distribute to testers"
echo "   - Visit https://appstoreconnect.apple.com"
echo "   - Upload the build to TestFlight"
echo "   - Invite testers with their Apple ID"
echo ""
echo "Or use Expo Go for quick testing:"
echo "   npx expo start"
echo "   Press 'i' to open in iOS simulator"
echo ""
