# LocalShare - Mobile App Design Plan

## Overview
LocalShare is a local file sharing application that enables seamless peer-to-peer file transfers over a network without requiring internet connectivity. The app works in the background and provides a superior alternative to AirDrop with cross-platform support.

## Screen List

1. **Home Screen** - Main hub with device discovery and active transfers
2. **Nearby Devices Screen** - List of discovered devices on the network
3. **Receive Files Screen** - Incoming file transfer notifications and management
4. **Sent Files Screen** - History of sent files and transfer status
5. **Settings Screen** - Device name, permissions, and app preferences
6. **File Picker Screen** - Select files to share
7. **Transfer Progress Screen** - Real-time transfer status with speed and ETA
8. **Device Detail Screen** - Information about a discovered device

## Primary Content and Functionality

### Home Screen
- **Device Status Card**: Shows current device name and network status (online/offline)
- **Quick Stats**: Number of nearby devices, recent transfers count
- **Action Buttons**: "Share Files", "Receive Files", "Settings"
- **Recent Activity**: List of recent transfers (sent/received)
- **Background Service Indicator**: Visual indicator showing background service status

### Nearby Devices Screen
- **Device List**: Displays all discovered devices with:
  - Device name
  - Device type icon (phone, tablet, computer)
  - Signal strength indicator
  - Last seen timestamp
- **Search/Filter**: Filter devices by name
- **Tap to Share**: Tap any device to initiate file transfer

### Receive Files Screen
- **Incoming Transfers**: Queue of incoming files with:
  - Sender device name
  - File name and size
  - Accept/Reject buttons
  - Progress bar for active transfers
- **Notification Badge**: Shows count of pending transfers
- **Auto-Accept Toggle**: Option to auto-accept from trusted devices

### Sent Files Screen
- **Transfer History**: List of sent files with:
  - Recipient device name
  - File name and size
  - Transfer status (completed, failed, pending)
  - Timestamp
- **Retry Option**: Resend failed transfers

### Settings Screen
- **Device Name**: Editable device identifier on the network
- **Permissions**: Control what types of files can be shared
- **Background Service**: Toggle background file sharing
- **Network Settings**: Show current network info (IP, port)
- **About**: App version and help

### File Picker Screen
- **File Browser**: Navigate device storage
- **Multi-Select**: Select multiple files for batch transfer
- **File Preview**: Show file type icons and sizes
- **Selected Files Summary**: Display total size and count

### Transfer Progress Screen
- **File Details**: File name, size, type
- **Progress Bar**: Visual progress indicator
- **Speed & ETA**: Current transfer speed and estimated time
- **Cancel Button**: Stop the transfer
- **Completion Status**: Success/failure message

### Device Detail Screen
- **Device Information**: Name, type, IP address, last seen
- **Connection Status**: Online/offline indicator
- **Recent Transfers**: Files exchanged with this device
- **Quick Share Button**: Initiate file transfer

## Key User Flows

### Flow 1: Send Files to Nearby Device
1. User taps "Share Files" on Home Screen
2. App displays Nearby Devices Screen
3. User selects a device from the list
4. File Picker opens
5. User selects one or more files
6. Transfer Progress Screen shows real-time status
7. Notification confirms completion

### Flow 2: Receive Files
1. Another device initiates transfer to this device
2. Notification appears (even if app is in background)
3. User can accept/reject from notification
4. If accepted, file is saved to device storage
5. Receive Files Screen shows transfer progress
6. Completion notification sent

### Flow 3: Background File Sharing
1. User enables "Background Service" in Settings
2. App runs in background with notification
3. Device remains discoverable on network
4. Incoming transfers are accepted/rejected via notifications
5. Files are automatically saved to designated folder

## Color Choices

- **Primary Brand Color**: `#0a7ea4` (Teal Blue) - Modern, trustworthy
- **Background**: `#ffffff` (Light) / `#151718` (Dark)
- **Surface**: `#f5f5f5` (Light) / `#1e2022` (Dark) - Card backgrounds
- **Success**: `#22C55E` (Green) - Transfer complete
- **Warning**: `#F59E0B` (Amber) - Pending transfers
- **Error**: `#EF4444` (Red) - Failed transfers
- **Foreground**: `#11181C` (Light) / `#ECEDEE` (Dark) - Text
- **Muted**: `#687076` (Light) / `#9BA1A6` (Dark) - Secondary text

## Technical Considerations

- **Network Protocol**: UDP for device discovery, TCP for file transfer
- **Background Service**: Uses Expo TaskManager for background execution
- **Local Storage**: AsyncStorage for settings, file metadata
- **File Transfer**: Chunked transfer with checksum verification
- **Device Discovery**: mDNS/Bonjour for local network service discovery
