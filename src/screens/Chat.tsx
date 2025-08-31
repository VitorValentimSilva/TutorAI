import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../contexts/ThemeContext";
import { colors } from "../styles/colors";

export default function Chat() {
  const { isDark } = useContext(ThemeContext);
  const [message, setMessage] = useState("");
  const isButtonDisabled = message.trim().length === 0;

  const handleSend = () => {
    console.log("Mensagem enviada:", message);
    setMessage("");
  };

  return (
    <SafeAreaView
      className={`flex-1
      ${isDark ? "bg-backgroundDark" : "bg-backgroundLight"}`}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 135}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            <View className="flex-1 justify-center items-center gap-4 px-6">
              <Ionicons
                name="sparkles"
                size={50}
                color={isDark ? colors.primaryDark : colors.primaryLight}
              />

              <View className="items-center">
                <Text
                  className={`text-xl font-semibold
                  ${isDark ? "text-textDark" : "text-textLight"}`}
                >
                  Olá! Como posso ajudar?
                </Text>

                <Text
                  className={`${isDark ? "text-textDark" : "text-textLight"}`}
                >
                  Faça uma pergunta para começar a estudar.
                </Text>
              </View>
            </View>

            <View
              className={`w-full flex flex-row items-center gap-4 border-t p-4
              ${isDark ? "border-borderDark bg-backgroundDark/80" : "border-borderLight bg-backgroundLight/80"}`}
            >
              <View className="flex-1">
                <Input
                  placeholder="Digite sua pergunta..."
                  required={true}
                  multiline
                  numberOfLines={5}
                  value={message}
                  onChangeText={setMessage}
                />
              </View>

              <Button onPress={handleSend} disabled={isButtonDisabled} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
