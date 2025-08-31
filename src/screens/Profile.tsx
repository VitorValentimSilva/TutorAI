import { useContext } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { colors } from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { LanguageContext } from "../contexts/LanguageContext";

export default function Profile() {
  const { isDark, toggle } = useContext(ThemeContext);
  const { setLanguage } = useContext(LanguageContext);

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

      <View className="flex-row space-x-4">
        <Button title="PT-BR" onPress={() => setLanguage("ptBR")} />
        <Button title="EN" onPress={() => setLanguage("en")} />
      </View>
    </View>
  );
}
