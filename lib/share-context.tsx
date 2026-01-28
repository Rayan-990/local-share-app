import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { networkService, Device, TransferProgress } from "./network-service";

export interface ShareState {
  deviceName: string;
  discoveredDevices: Device[];
  activeTransfers: TransferProgress[];
  sentFiles: Array<{
    id: string;
    fileName: string;
    recipientName: string;
    timestamp: number;
    status: "completed" | "failed";
  }>;
  receivedFiles: Array<{
    id: string;
    fileName: string;
    senderName: string;
    timestamp: number;
    fileUri: string;
  }>;
  isDiscovering: boolean;
  backgroundServiceEnabled: boolean;
}

type ShareAction =
  | { type: "SET_DEVICE_NAME"; payload: string }
  | { type: "UPDATE_DEVICES"; payload: Device[] }
  | { type: "UPDATE_TRANSFERS"; payload: TransferProgress[] }
  | { type: "ADD_SENT_FILE"; payload: ShareState["sentFiles"][0] }
  | { type: "ADD_RECEIVED_FILE"; payload: ShareState["receivedFiles"][0] }
  | { type: "SET_DISCOVERING"; payload: boolean }
  | { type: "SET_BACKGROUND_SERVICE"; payload: boolean };

const initialState: ShareState = {
  deviceName: "LocalShare Device",
  discoveredDevices: [],
  activeTransfers: [],
  sentFiles: [],
  receivedFiles: [],
  isDiscovering: false,
  backgroundServiceEnabled: false,
};

function shareReducer(state: ShareState, action: ShareAction): ShareState {
  switch (action.type) {
    case "SET_DEVICE_NAME":
      return { ...state, deviceName: action.payload };
    case "UPDATE_DEVICES":
      return { ...state, discoveredDevices: action.payload };
    case "UPDATE_TRANSFERS":
      return { ...state, activeTransfers: action.payload };
    case "ADD_SENT_FILE":
      return { ...state, sentFiles: [action.payload, ...state.sentFiles] };
    case "ADD_RECEIVED_FILE":
      return { ...state, receivedFiles: [action.payload, ...state.receivedFiles] };
    case "SET_DISCOVERING":
      return { ...state, isDiscovering: action.payload };
    case "SET_BACKGROUND_SERVICE":
      return { ...state, backgroundServiceEnabled: action.payload };
    default:
      return state;
  }
}

interface ShareContextType {
  state: ShareState;
  setDeviceName: (name: string) => Promise<void>;
  startDiscovery: () => Promise<void>;
  stopDiscovery: () => void;
  shareFile: (deviceId: string, fileUri: string, fileName: string, fileSize: number) => Promise<void>;
  toggleBackgroundService: (enabled: boolean) => Promise<void>;
  getDiscoveredDevices: () => Device[];
  getActiveTransfers: () => TransferProgress[];
}

const ShareContext = createContext<ShareContextType | undefined>(undefined);

export function ShareProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(shareReducer, initialState);

  // Load persisted state on mount
  useEffect(() => {
    loadPersistedState();
  }, []);

  // Update discovered devices periodically
  useEffect(() => {
    if (!state.isDiscovering) return;

    const interval = setInterval(() => {
      const devices = networkService.getDiscoveredDevices();
      dispatch({ type: "UPDATE_DEVICES", payload: devices });

      const transfers = networkService.getActiveTransfers();
      dispatch({ type: "UPDATE_TRANSFERS", payload: transfers });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isDiscovering]);

  const loadPersistedState = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem("shareState");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "SET_DEVICE_NAME", payload: parsed.deviceName || "LocalShare Device" });
        dispatch({ type: "SET_BACKGROUND_SERVICE", payload: parsed.backgroundServiceEnabled || false });
      }
    } catch (error) {
      console.error("Failed to load persisted state:", error);
    }
  }, []);

  const setDeviceName = useCallback(
    async (name: string) => {
      dispatch({ type: "SET_DEVICE_NAME", payload: name });
      networkService.setDeviceName(name);
      await AsyncStorage.setItem(
        "shareState",
        JSON.stringify({
          deviceName: name,
          backgroundServiceEnabled: state.backgroundServiceEnabled,
        })
      );
    },
    [state.backgroundServiceEnabled]
  );

  const startDiscovery = useCallback(async () => {
    dispatch({ type: "SET_DISCOVERING", payload: true });
    await networkService.startDiscovery();
  }, []);

  const stopDiscovery = useCallback(() => {
    dispatch({ type: "SET_DISCOVERING", payload: false });
    networkService.stopDiscovery();
  }, []);

  const shareFile = useCallback(
    async (deviceId: string, fileUri: string, fileName: string, fileSize: number) => {
      const transferId = await networkService.initiateTransfer(deviceId, fileUri, fileName, fileSize);
      const device = networkService.getDevice(deviceId);

      if (device) {
        const sentFile = {
          id: transferId,
          fileName,
          recipientName: device.name,
          timestamp: Date.now(),
          status: "completed" as const,
        };
        dispatch({ type: "ADD_SENT_FILE", payload: sentFile });
      }
    },
    []
  );

  const toggleBackgroundService = useCallback(
    async (enabled: boolean) => {
      dispatch({ type: "SET_BACKGROUND_SERVICE", payload: enabled });
      await AsyncStorage.setItem(
        "shareState",
        JSON.stringify({
          deviceName: state.deviceName,
          backgroundServiceEnabled: enabled,
        })
      );

      if (enabled) {
        await startDiscovery();
      } else {
        stopDiscovery();
      }
    },
    [state.deviceName, startDiscovery, stopDiscovery]
  );

  const getDiscoveredDevices = useCallback(() => {
    return networkService.getDiscoveredDevices();
  }, []);

  const getActiveTransfers = useCallback(() => {
    return networkService.getActiveTransfers();
  }, []);

  const value: ShareContextType = {
    state,
    setDeviceName,
    startDiscovery,
    stopDiscovery,
    shareFile,
    toggleBackgroundService,
    getDiscoveredDevices,
    getActiveTransfers,
  };

  return <ShareContext.Provider value={value}>{children}</ShareContext.Provider>;
}

export function useShare(): ShareContextType {
  const context = useContext(ShareContext);
  if (!context) {
    throw new Error("useShare must be used within ShareProvider");
  }
  return context;
}
