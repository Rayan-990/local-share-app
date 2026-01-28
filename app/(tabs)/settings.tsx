import { ScrollView, Text, View, TouchableOpacity, TextInput, Switch } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useShare } from "@/lib/share-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SettingsScreen() {
  const { state, setDeviceName, toggleBackgroundService } = useShare();
  const router = useRouter();
  const [deviceName, setDeviceNameLocal] = useState(state.deviceName);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveDeviceName = async () => {
    if (deviceName.trim()) {
      await setDeviceName(deviceName.trim());
      setIsEditing(false);
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
          <View className="gap-2 mb-2">
            <TouchableOpacity onPress={() => router.back()} className="active:opacity-60">
              <Text className="text-lg font-semibold text-primary">← Back</Text>
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-foreground">Settings</Text>
          </View>

          {/* Device Settings */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Device
            </Text>

            {/* Device Name */}
            <View className="bg-surface rounded-lg p-4 border border-border gap-2">
              <Text className="text-xs font-semibold text-muted uppercase">Device Name</Text>
              {isEditing ? (
                <View className="gap-2">
                  <TextInput
                    value={deviceName}
                    onChangeText={setDeviceNameLocal}
                    placeholder="Enter device name"
                    placeholderTextColor="#9BA1A6"
                    className="bg-background rounded-lg px-3 py-2 text-foreground border border-border"
                  />
                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={handleSaveDeviceName}
                      className="flex-1 bg-primary rounded-lg p-2 active:opacity-80"
                    >
                      <Text className="text-white font-semibold text-center text-sm">Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setDeviceNameLocal(state.deviceName);
                        setIsEditing(false);
                      }}
                      className="flex-1 bg-surface border border-border rounded-lg p-2 active:opacity-70"
                    >
                      <Text className="text-foreground font-semibold text-center text-sm">Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => setIsEditing(true)}
                  className="flex-row items-center justify-between active:opacity-70"
                >
                  <Text className="text-base font-medium text-foreground">{deviceName}</Text>
                  <MaterialIcons name="edit" size={20} color="#0a7ea4" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Service Settings */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Service
            </Text>

            {/* Background Service */}
            <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
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

            {/* Background Service Info */}
            <View className="bg-primary/10 rounded-lg p-3 border border-primary/20 flex-row gap-2">
              <MaterialIcons name="info" size={20} color="#0a7ea4" />
              <Text className="text-xs text-primary flex-1">
                When enabled, LocalShare will run in the background and continue discovering nearby devices.
              </Text>
            </View>
          </View>

          {/* About */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground uppercase tracking-wide">
              About
            </Text>

            <View className="bg-surface rounded-lg p-4 border border-border gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted">App Version</Text>
                <Text className="text-sm font-semibold text-foreground">1.0.0</Text>
              </View>
              <View className="border-t border-border pt-3 flex-row items-center justify-between">
                <Text className="text-sm text-muted">Platform</Text>
                <Text className="text-sm font-semibold text-foreground">Android</Text>
              </View>
            </View>
          </View>

          {/* Help */}
          <View className="gap-2">
            <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border active:opacity-70 flex-row items-center justify-between">
              <Text className="text-sm font-medium text-foreground">Help & Support</Text>
              <MaterialIcons name="chevron-right" size={20} color="#687076" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
