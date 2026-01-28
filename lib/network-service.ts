import * as Network from "expo-network";
import { Platform } from "react-native";

export interface Device {
  id: string;
  name: string;
  ip: string;
  port: number;
  type: "phone" | "tablet" | "computer";
  lastSeen: number;
}

export interface TransferProgress {
  fileId: string;
  fileName: string;
  totalSize: number;
  transferredSize: number;
  speed: number; // bytes per second
  eta: number; // seconds
  status: "pending" | "transferring" | "completed" | "failed";
}

class NetworkService {
  private discoveredDevices: Map<string, Device> = new Map();
  private activeTransfers: Map<string, TransferProgress> = new Map();
  private deviceName: string = "LocalShare Device";
  private port: number = 5555;
  private discoveryInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.initializeDeviceName();
  }

  private async initializeDeviceName() {
    try {
      // Use a default device name based on platform
      const platformName = Platform.OS === "android" ? "Android" : "iOS";
      this.deviceName = `${platformName} Device`;
    } catch (error) {
      console.log("Could not initialize device name, using default");
    }
  }

  /**
   * Start device discovery on the local network
   */
  async startDiscovery(): Promise<void> {
    if (this.discoveryInterval) {
      return; // Already discovering
    }

    this.discoveryInterval = setInterval(() => {
      this.scanNetwork();
    }, 3000); // Scan every 3 seconds

    // Initial scan
    await this.scanNetwork();
  }

  /**
   * Stop device discovery
   */
  stopDiscovery(): void {
    if (this.discoveryInterval) {
      clearInterval(this.discoveryInterval);
      this.discoveryInterval = null;
    }
  }

  /**
   * Scan the local network for available devices
   */
  private async scanNetwork(): Promise<void> {
    try {
      const networkInfo = await Network.getNetworkStateAsync?.();
      if (!networkInfo?.isConnected) {
        return;
      }

      // In a real implementation, this would use mDNS or broadcast UDP packets
      // For now, we'll simulate device discovery
      this.simulateDeviceDiscovery();
    } catch (error) {
      console.error("Network scan error:", error);
    }
  }

  /**
   * Simulate device discovery (replace with actual mDNS implementation)
   */
  private simulateDeviceDiscovery(): void {
    // This is a placeholder for actual mDNS discovery
    // In production, use react-native-mdns or similar
    const now = Date.now();

    // Clean up devices not seen in 30 seconds
    this.discoveredDevices.forEach((device, id) => {
      if (now - device.lastSeen > 30000) {
        this.discoveredDevices.delete(id);
      }
    });
  }

  /**
   * Add a manually discovered device
   */
  addDevice(device: Omit<Device, "lastSeen">): void {
    this.discoveredDevices.set(device.id, {
      ...device,
      lastSeen: Date.now(),
    });
  }

  /**
   * Get all discovered devices
   */
  getDiscoveredDevices(): Device[] {
    return Array.from(this.discoveredDevices.values()).sort(
      (a, b) => b.lastSeen - a.lastSeen
    );
  }

  /**
   * Get a specific device by ID
   */
  getDevice(deviceId: string): Device | undefined {
    return this.discoveredDevices.get(deviceId);
  }

  /**
   * Set the device name
   */
  setDeviceName(name: string): void {
    this.deviceName = name;
  }

  /**
   * Get the device name
   */
  getDeviceName(): string {
    return this.deviceName;
  }

  /**
   * Initiate a file transfer to a remote device
   */
  async initiateTransfer(
    deviceId: string,
    fileUri: string,
    fileName: string,
    fileSize: number
  ): Promise<string> {
    const transferId = `${deviceId}-${Date.now()}`;
    const transfer: TransferProgress = {
      fileId: transferId,
      fileName,
      totalSize: fileSize,
      transferredSize: 0,
      speed: 0,
      eta: 0,
      status: "pending",
    };

    this.activeTransfers.set(transferId, transfer);

    // Simulate transfer (replace with actual TCP transfer)
    this.simulateTransfer(transferId, fileSize);

    return transferId;
  }

  /**
   * Simulate file transfer progress
   */
  private simulateTransfer(transferId: string, fileSize: number): void {
    const transfer = this.activeTransfers.get(transferId);
    if (!transfer) return;

    transfer.status = "transferring";
    const chunkSize = Math.max(fileSize / 20, 1024 * 100); // 20 chunks or 100KB minimum
    let transferred = 0;
    const startTime = Date.now();

    const interval = setInterval(() => {
      transferred += chunkSize;
      if (transferred >= fileSize) {
        transferred = fileSize;
        transfer.transferredSize = transferred;
        transfer.status = "completed";
        clearInterval(interval);
      } else {
        transfer.transferredSize = transferred;
        const elapsed = (Date.now() - startTime) / 1000;
        transfer.speed = Math.round(transferred / elapsed);
        transfer.eta = Math.round((fileSize - transferred) / transfer.speed);
      }
    }, 500);
  }

  /**
   * Get transfer progress
   */
  getTransferProgress(transferId: string): TransferProgress | undefined {
    return this.activeTransfers.get(transferId);
  }

  /**
   * Get all active transfers
   */
  getActiveTransfers(): TransferProgress[] {
    return Array.from(this.activeTransfers.values());
  }

  /**
   * Cancel a transfer
   */
  cancelTransfer(transferId: string): void {
    this.activeTransfers.delete(transferId);
  }

  /**
   * Get network information
   */
  async getNetworkInfo(): Promise<{
    isConnected: boolean;
    type: string;
    ip?: string;
  }> {
    try {
      const networkInfo = await Network.getNetworkStateAsync?.();
      return {
        isConnected: networkInfo?.isConnected ?? false,
        type: networkInfo?.type ?? "unknown",
      };
    } catch (error) {
      return {
        isConnected: false,
        type: "unknown",
      };
    }
  }
}

export const networkService = new NetworkService();
