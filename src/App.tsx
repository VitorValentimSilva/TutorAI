import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "./styles/global.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      <Text className="text-white">
        Abra o App.tsx para começar a trabalhar!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
