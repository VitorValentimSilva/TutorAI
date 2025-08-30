import React from "react";
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

export default function Chat() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 135}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            <View className="flex-1 justify-center items-center gap-4 px-6">
              <Ionicons name="sparkles" size={50} color="#3B82F6" />

              <View className="items-center">
                <Text className="text-xl font-semibold">
                  Olá! Como posso ajudar?
                </Text>
                <Text className="text-gray-600">
                  Faça uma pergunta para começar a estudar.
                </Text>
              </View>
            </View>

            <View className="w-full p-4 flex-row items-center gap-x-2 border-t border-gray-200 bg-white">
              <Input
                placeholder="Digite sua pergunta..."
                required={true}
                className="flex-1 mb-0"
              />

              <Button onPress={() => console.log("Mensagem enviada!")} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
