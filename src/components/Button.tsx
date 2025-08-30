import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Button({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gray-400 w-12 h-12 rounded-full flex items-center justify-center"
      activeOpacity={0.7}
    >
      <Ionicons name="send" size={20} color="white" />
    </TouchableOpacity>
  );
}
