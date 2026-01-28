# Changelog

All notable changes to LocalShare will be documented in this file.

## [1.0.0] - 2026-01-28

### Added
- Initial release of LocalShare
- Local network device discovery using mDNS/Bonjour
- File sharing over TCP with progress tracking
- Home screen with device status and quick actions
- Nearby devices screen for device selection
- Receive files screen for incoming transfers
- Sent files history screen
- Settings screen with device name customization
- Background service support for continuous discovery
- Dark mode support
- Real-time transfer speed and ETA display
- Transfer history management
- AsyncStorage for local data persistence
- Responsive UI design for various screen sizes

### Features
- Fast local network file transfers
- Automatic device discovery
- Background file sharing capability
- Transfer progress tracking
- Device status indicators
- File transfer history
- Customizable device name
- Background service toggle

### Technical Details
- Built with React Native and Expo
- TypeScript for type safety
- NativeWind for Tailwind CSS styling
- expo-document-picker for file selection
- expo-network for network information
- Android 7.0 (API 24) or higher support

## Future Releases

### Planned for v1.1.0
- iOS support
- Folder sharing
- File compression before transfer
- Bandwidth throttling
- Encrypted transfers

### Planned for v1.2.0
- QR code device pairing
- Cloud backup integration
- File preview before transfer
- Batch operations
- Advanced network settings

### Under Consideration
- Web client support
- Desktop app integration
- P2P encrypted messaging
- File synchronization
- Scheduled transfers
