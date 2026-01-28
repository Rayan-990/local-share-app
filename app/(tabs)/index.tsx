import { ScrollView, Text, View, TouchableOpacity, FlatList, Switch, Animated } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useShare } from "@/lib/share-context";
import { useEffect, useState, useRef } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const { state, startDiscovery, stopDiscovery, shareFile, toggleBackgroundService } = useShare();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    startDiscovery();
    return () => {
      stopDiscovery();
    };
  }, []);

  const handleShareFiles = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
      });

      if (result.assets && result.assets.length > 0) {
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await toggleBackgroundService(value);
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header with Gradient Effect */}
          <View className="gap-3 pt-2">
            <View className="flex-row items-center gap-2">
              <View className="w-12 h-12 rounded-full bg-primary/20 items-center justify-center">
                <MaterialIcons name="share" size={24} color="#0a7ea4" />
              </View>
              <View className="flex-1">
                <Text className="text-3xl font-bold text-foreground">LocalShare</Text>
                <Text className="text-xs text-muted">Fast local file sharing</Text>
              </View>
            </View>
          </View>

          {/* Device Status Card with Enhanced Design */}
          <View className="bg-gradient-to-b from-primary/10 to-primary/5 rounded-3xl p-5 border border-primary/20">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-xs font-bold text-primary uppercase tracking-widest">
                This Device
              </Text>
              <View className="flex-row items-center gap-1 bg-success/20 px-3 py-1 rounded-full">
                <View className="w-2 h-2 rounded-full bg-success" />
                <Text className="text-xs font-semibold text-success">Online</Text>
              </View>
            </View>
            <Text className="text-2xl font-bold text-foreground mb-4">{state.deviceName}</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="devices" size={20} color="#0a7ea4" />
                <Text className="text-sm font-semibold text-foreground">
                  {state.discoveredDevices.length} nearby
                </Text>
              </View>
              <Text className="text-xs text-muted">
                {state.activeTransfers.length} active
              </Text>
            </View>
          </View>

          {/* Quick Actions with Enhanced Styling */}
          <View className="gap-3">
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                onPress={handleShareFiles}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={isLoading}
                className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-5 active:opacity-90 flex-row items-center justify-between"
              >
                <View className="flex-1">
                  <Text className="text-lg font-bold text-white">
                    {isLoading ? "Selecting Files..." : "Share Files"}
                  </Text>
                  <Text className="text-xs text-white/70 mt-1">
                    Send files to nearby devices
                  </Text>
                </View>
                <MaterialIcons name="arrow-forward" size={24} color="white" />
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push("./receive-files");
              }}
              className="bg-surface border-2 border-primary/20 rounded-3xl p-5 active:opacity-70 flex-row items-center justify-between"
            >
              <View className="flex-1">
                <Text className="text-lg font-bold text-foreground">Receive Files</Text>
                <Text className="text-xs text-muted mt-1">
                  Accept incoming transfers
                </Text>
              </View>
              <MaterialIcons name="download" size={24} color="#0a7ea4" />
            </TouchableOpacity>
          </View>

          {/* Background Service Toggle with Enhanced Design */}
          <View className="bg-surface rounded-3xl p-5 border border-border">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 gap-2">
                <View className="flex-row items-center gap-2">
                  <View className="w-8 h-8 rounded-full bg-primary/20 items-center justify-center">
                    <MaterialIcons name="cloud" size={16} color="#0a7ea4" />
                  </View>
                  <Text className="text-base font-bold text-foreground">Background Service</Text>
                </View>
                <Text className="text-xs text-muted ml-10">
                  {state.backgroundServiceEnabled ? "Active - Discovering devices" : "Inactive"}
                </Text>
              </View>
              <Switch
                value={state.backgroundServiceEnabled}
                onValueChange={handleToggleBackground}
                trackColor={{ false: "#e5e7eb", true: "#0a7ea4" }}
              />
            </View>
          </View>

          {/* Active Transfers with Enhanced Cards */}
          {state.activeTransfers.length > 0 && (
            <View className="gap-3">
              <Text className="text-base font-bold text-foreground">Active Transfers</Text>
              <FlatList
                scrollEnabled={false}
                data={state.activeTransfers}
                keyExtractor={(item) => item.fileId}
                renderItem={({ item }) => (
                  <View className="bg-surface rounded-2xl p-4 border border-border/50">
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-1 flex-row items-center gap-2">
                        <MaterialIcons name="file-present" size={20} color="#0a7ea4" />
                        <Text className="text-sm font-semibold text-foreground flex-1" numberOfLines={1}>
                          {item.fileName}
                        </Text>
                      </View>
                      <Text className="text-xs font-bold text-primary">
                        {Math.round((item.transferredSize / item.totalSize) * 100)}%
                      </Text>
                    </View>
                    <View className="h-2 bg-border/50 rounded-full overflow-hidden mb-2">
                      <View
                        className="h-full bg-gradient-to-r from-primary to-primary/60"
                        style={{
                          width: `${(item.transferredSize / item.totalSize) * 100}%`,
                        }}
                      />
                    </View>
                    <View className="flex-row items-center justify-between">
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
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-bold text-foreground">Recent Sent</Text>
                <TouchableOpacity
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    router.push("./sent-files");
                  }}
                >
                  <Text className="text-xs font-bold text-primary">View All →</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                scrollEnabled={false}
                data={state.sentFiles.slice(0, 3)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View className="bg-surface rounded-2xl p-4 border border-border/50 flex-row items-center justify-between mb-2">
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>
                        {item.fileName}
                      </Text>
                      <Text className="text-xs text-muted">to {item.recipientName}</Text>
                    </View>
                    <View
                      className={`px-3 py-1 rounded-full ${
                        item.status === "completed" ? "bg-success/20" : "bg-error/20"
                      }`}
                    >
                      <MaterialIcons
                        name={item.status === "completed" ? "check-circle" : "error"}
                        size={16}
                        color={item.status === "completed" ? "#22C55E" : "#EF4444"}
                      />
                    </View>
                  </View>
                )}
              />
            </View>
          )}

          {/* Settings Link */}
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push("./settings");
            }}
            className="bg-surface rounded-2xl p-4 border border-border/50 active:opacity-70 flex-row items-center justify-between"
          >
            <Text className="text-base font-semibold text-foreground">Settings</Text>
            <MaterialIcons name="chevron-right" size={24} color="#687076" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
