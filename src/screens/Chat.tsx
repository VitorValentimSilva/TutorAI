import { useContext } from "react";
import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../contexts/ThemeContext";
import { colors } from "../styles/colors";
import { useTranslation } from "react-i18next";
import MessageList from "../components/MessageList";
import useChat from "../hooks/useChat";

export default function Chat() {
  const { isDark } = useContext(ThemeContext);
  const { t } = useTranslation();
  const {
    message,
    setMessage,
    resposta,
    loading,
    showIntro,
    ultimaMensagem,
    isButtonDisabled,
    handleSend,
  } = useChat();

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-backgroundDark" : "bg-backgroundLight"}`}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 135}
      >
        <View className="flex-1">
          {showIntro ? (
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
                  {t("pageChat.title")}
                </Text>

                <Text
                  className={`${isDark ? "text-textDark" : "text-textLight"}`}
                >
                  {t("pageChat.subTitle")}
                </Text>
              </View>
            </View>
          ) : (
            <MessageList ultimaMensagem={ultimaMensagem} resposta={resposta} />
          )}

          <View
            className={`w-full flex flex-row items-center gap-4 border-t p-4
            ${isDark ? "border-borderDark bg-backgroundDark/80" : "border-borderLight bg-backgroundLight/80"}`}
          >
            <View className="flex-1">
              <Input
                placeholder={t("pageChat.placeholder")}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
