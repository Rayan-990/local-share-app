import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useShare } from "@/lib/share-context";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SentFilesScreen() {
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
            <Text className="text-2xl font-bold text-foreground">Sent Files</Text>
            <Text className="text-sm text-muted">
              {state.sentFiles.length} file{state.sentFiles.length !== 1 ? "s" : ""} sent
            </Text>
          </View>

          {/* Sent Files List */}
          {state.sentFiles.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={state.sentFiles}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="bg-surface rounded-lg p-4 border border-border mb-3">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-1 gap-1">
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
                      <Text
                        className={`text-xs font-semibold ${
                          item.status === "completed" ? "text-success" : "text-error"
                        }`}
                      >
                        {item.status === "completed" ? "Completed" : "Failed"}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-xs text-muted">
                    {new Date(item.timestamp).toLocaleString()}
                  </Text>
                </View>
              )}
            />
          ) : (
            <View className="bg-surface rounded-lg p-8 border border-border items-center justify-center">
              <MaterialIcons name="cloud-upload" size={48} color="#687076" />
              <Text className="text-sm text-muted text-center mt-3">
                No files sent yet
              </Text>
              <Text className="text-xs text-muted text-center mt-1">
                Files you share will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
