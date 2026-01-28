import { ScrollView, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useShare } from "@/lib/share-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface FileData {
  uri: string;
  name: string;
  size: number;
}

export default function NearbyDevicesScreen() {
  const { state, shareFile } = useShare();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isTransferring, setIsTransferring] = useState(false);

  useEffect(() => {
    if (params.files) {
      try {
        const parsedFiles = JSON.parse(params.files as string);
        setFiles(parsedFiles);
      } catch (error) {
        console.error("Error parsing files:", error);
      }
    }
  }, [params.files]);

  const handleSelectDevice = async (deviceId: string) => {
    if (!files.length) return;

    setSelectedDevice(deviceId);
    setIsTransferring(true);

    try {
      // Share each file to the selected device
      for (const file of files) {
        await shareFile(deviceId, file.uri, file.name, file.size);
      }

      // Show success and navigate back
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      console.error("Error sharing files:", error);
    } finally {
      setIsTransferring(false);
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "phone":
        return "smartphone";
      case "tablet":
        return "tablet";
      case "computer":
        return "computer";
      default:
        return "devices";
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2 mb-2">
            <TouchableOpacity onPress={() => router.back()} className="active:opacity-60">
              <Text className="text-lg font-semibold text-primary">← Back</Text>
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-foreground">Nearby Devices</Text>
            <Text className="text-sm text-muted">
              {files.length} file{files.length !== 1 ? "s" : ""} to share
            </Text>
          </View>

          {/* Files Summary */}
          {files.length > 0 && (
            <View className="bg-surface rounded-lg p-3 border border-border">
              <Text className="text-xs font-semibold text-muted uppercase mb-2">Files to Share</Text>
              <FlatList
                scrollEnabled={false}
                data={files}
                keyExtractor={(item) => item.uri}
                renderItem={({ item }) => (
                  <View className="flex-row items-center justify-between py-2 border-b border-border last:border-b-0">
                    <View className="flex-1">
                      <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text className="text-xs text-muted">
                        {(item.size / 1024 / 1024).toFixed(2)} MB
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}

          {/* Devices List */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              {state.discoveredDevices.length} Device{state.discoveredDevices.length !== 1 ? "s" : ""} Found
            </Text>

            {state.discoveredDevices.length === 0 ? (
              <View className="bg-surface rounded-lg p-6 border border-border items-center justify-center">
                <MaterialIcons name="devices" size={48} color="#687076" />
                <Text className="text-sm text-muted text-center mt-3">
                  No devices found on your network
                </Text>
                <Text className="text-xs text-muted text-center mt-1">
                  Make sure other devices have LocalShare running
                </Text>
              </View>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={state.discoveredDevices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectDevice(item.id)}
                    disabled={isTransferring}
                    className={`rounded-lg p-4 border flex-row items-center justify-between active:opacity-70 ${
                      selectedDevice === item.id
                        ? "bg-primary/10 border-primary"
                        : "bg-surface border-border"
                    }`}
                  >
                    <View className="flex-row items-center gap-3 flex-1">
                      <View className="w-12 h-12 rounded-full bg-primary/20 items-center justify-center">
                        <MaterialIcons
                          name={getDeviceIcon(item.type)}
                          size={24}
                          color="#0a7ea4"
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-foreground">
                          {item.name}
                        </Text>
                        <View className="flex-row items-center gap-1 mt-1">
                          <View className="w-1.5 h-1.5 rounded-full bg-success" />
                          <Text className="text-xs text-muted">Online</Text>
                        </View>
                      </View>
                    </View>
                    {selectedDevice === item.id && isTransferring && (
                      <ActivityIndicator color="#0a7ea4" />
                    )}
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
