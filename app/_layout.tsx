import { Stack, router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store/store";

function RootLayoutContent() {
  return (
   <Stack screenOptions={{ headerShown: false }}> 
      <Stack.Screen
        name="produtos"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text style={{ fontSize: 28 }}>←</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="detalhes"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace("/produtos")}>
              <Text style={{ fontSize: 28 }}>←</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutContent />
    </Provider>
  );
}