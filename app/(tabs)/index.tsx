import { ScrollView, Text, View, TouchableOpacity, FlatList, Switch } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useShare } from "@/lib/share-context";
import { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { state, startDiscovery, stopDiscovery, shareFile, toggleBackgroundService } = useShare();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Start discovery when component mounts
    startDiscovery();
    return () => {
      stopDiscovery();
    };
  }, []);

  const handleShareFiles = async () => {
    try {
      setIsLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
      });

      if (result.assets && result.assets.length > 0) {
        // Navigate to device selection with file data
        router.push({
          pathname: "./nearby-devices",
          params: {
            files: JSON.stringify(result.assets),
          },
        });
      }
    } catch (error) {
      console.error("Error picking files:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleBackground = async (value: boolean) => {
    await toggleBackgroundService(value);
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">LocalShare</Text>
            <Text className="text-sm text-muted">Fast local file sharing</Text>
          </View>

          {/* Device Status Card */}
          <View className="bg-surface rounded-2xl p-4 border border-border">
            <Text className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
              This Device
            </Text>
            <Text className="text-lg font-semibold text-foreground mb-3">{state.deviceName}</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <View className="w-2 h-2 rounded-full bg-success" />
                <Text className="text-sm text-muted">Online</Text>
              </View>
              <Text className="text-xs text-muted">
                {state.discoveredDevices.length} nearby
              </Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="gap-3">
            <TouchableOpacity
              onPress={handleShareFiles}
              disabled={isLoading}
              className="bg-primary rounded-2xl p-4 active:opacity-80"
            >
              <Text className="text-base font-semibold text-white text-center">
                {isLoading ? "Selecting Files..." : "Share Files"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("./receive-files")}
              className="bg-surface border border-border rounded-2xl p-4 active:opacity-70"
            >
              <Text className="text-base font-semibold text-foreground text-center">
                Receive Files
              </Text>
            </TouchableOpacity>
          </View>

          {/* Background Service Toggle */}
          <View className="bg-surface rounded-2xl p-4 border border-border flex-row items-center justify-between">
            <View className="flex-1 gap-1">
              <Text className="text-sm font-semibold text-foreground">Background Service</Text>
              <Text className="text-xs text-muted">
                {state.backgroundServiceEnabled ? "Active" : "Inactive"}
              </Text>
            </View>
            <Switch
              value={state.backgroundServiceEnabled}
              onValueChange={handleToggleBackground}
              trackColor={{ false: "#ccc", true: "#0a7ea4" }}
            />
          </View>

          {/* Active Transfers */}
          {state.activeTransfers.length > 0 && (
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Active Transfers</Text>
              <FlatList
                scrollEnabled={false}
                data={state.activeTransfers}
                keyExtractor={(item) => item.fileId}
                renderItem={({ item }) => (
                  <View className="bg-surface rounded-lg p-3 mb-2 border border-border">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-sm font-medium text-foreground flex-1" numberOfLines={1}>
                        {item.fileName}
                      </Text>
                      <Text className="text-xs text-muted">
                        {Math.round((item.transferredSize / item.totalSize) * 100)}%
                      </Text>
                    </View>
                    <View className="h-2 bg-border rounded-full overflow-hidden">
                      <View
                        className="h-full bg-primary"
                        style={{
                          width: `${(item.transferredSize / item.totalSize) * 100}%`,
                        }}
                      />
                    </View>
                    <View className="flex-row items-center justify-between mt-2">
                      <Text className="text-xs text-muted">
                        {(item.speed / 1024 / 1024).toFixed(1)} MB/s
                      </Text>
                      <Text className="text-xs text-muted">ETA: {item.eta}s</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}

          {/* Recent Activity */}
          {state.sentFiles.length > 0 && (
            <View className="gap-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-foreground">Recent Sent</Text>
                <TouchableOpacity onPress={() => router.push("./sent-files")}>
                  <Text className="text-xs text-primary font-semibold">View All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                scrollEnabled={false}
                data={state.sentFiles.slice(0, 3)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View className="bg-surface rounded-lg p-3 mb-2 border border-border flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
                        {item.fileName}
                      </Text>
                      <Text className="text-xs text-muted">to {item.recipientName}</Text>
                    </View>
                    <View
                      className={`px-2 py-1 rounded-full ${
                        item.status === "completed" ? "bg-success/20" : "bg-error/20"
                      }`}
                    >
                      <Text
                        className={`text-xs font-semibold ${
                          item.status === "completed" ? "text-success" : "text-error"
                        }`}
                      >
                        {item.status === "completed" ? "Done" : "Failed"}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}

          {/* Settings Link */}
          <TouchableOpacity
            onPress={() => router.push("./settings")}
            className="bg-surface rounded-lg p-3 border border-border active:opacity-70"
          >
            <Text className="text-sm font-medium text-foreground text-center">Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
