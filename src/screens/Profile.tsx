import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { colors } from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const { isDark, toggle } = useContext(ThemeContext);

  return (
    <View>
      <Text>Teste</Text>

      <Pressable
        onPress={toggle}
        className={`p-5 rounded-full 
        ${isDark ? "bg-surfaceDark" : "bg-surfaceLight"}`}
      >
        <Ionicons
          name={isDark ? "moon" : "sunny"}
          size={24}
          color={isDark ? colors.primaryDark : colors.primaryLight}
        />
      </Pressable>
    </View>
  );
}
