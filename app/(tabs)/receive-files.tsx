import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useShare } from "@/lib/share-context";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ReceiveFilesScreen() {
  const { state } = useShare();
  const router = useRouter();

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2 mb-2">
            <TouchableOpacity onPress={() => router.back()} className="active:opacity-60">
              <Text className="text-lg font-semibold text-primary">← Back</Text>
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-foreground">Receive Files</Text>
            <Text className="text-sm text-muted">
              {state.receivedFiles.length} file{state.receivedFiles.length !== 1 ? "s" : ""} received
            </Text>
          </View>

          {/* Pending Transfers */}
          {state.activeTransfers.length > 0 && (
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Incoming Transfers</Text>
              <FlatList
                scrollEnabled={false}
                data={state.activeTransfers.filter((t) => t.status === "transferring")}
                keyExtractor={(item) => item.fileId}
                renderItem={({ item }) => (
                  <View className="bg-surface rounded-lg p-4 border border-border">
                    <View className="flex-row items-center gap-3 mb-3">
                      <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
                        <MaterialIcons name="file-download" size={20} color="#0a7ea4" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>
                          {item.fileName}
                        </Text>
                        <Text className="text-xs text-muted">
                          {(item.totalSize / 1024 / 1024).toFixed(2)} MB
                        </Text>
                      </View>
                    </View>
                    <View className="h-2 bg-border rounded-full overflow-hidden mb-2">
                      <View
                        className="h-full bg-primary"
                        style={{
                          width: `${(item.transferredSize / item.totalSize) * 100}%`,
                        }}
                      />
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-xs text-muted">
                        {Math.round((item.transferredSize / item.totalSize) * 100)}%
                      </Text>
                      <Text className="text-xs text-muted">
                        {(item.speed / 1024 / 1024).toFixed(1)} MB/s
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}

          {/* Received Files History */}
          {state.receivedFiles.length > 0 ? (
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Received Files</Text>
              <FlatList
                scrollEnabled={false}
                data={state.receivedFiles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
                    <View className="flex-1 gap-1">
                      <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
                        {item.fileName}
                      </Text>
                      <Text className="text-xs text-muted">from {item.senderName}</Text>
                      <Text className="text-xs text-muted">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </Text>
                    </View>
                    <MaterialIcons name="check-circle" size={24} color="#22C55E" />
                  </View>
                )}
              />
            </View>
          ) : (
            <View className="bg-surface rounded-lg p-8 border border-border items-center justify-center">
              <MaterialIcons name="cloud-download" size={48} color="#687076" />
              <Text className="text-sm text-muted text-center mt-3">
                No files received yet
              </Text>
              <Text className="text-xs text-muted text-center mt-1">
                Files from other devices will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
