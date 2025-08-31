import { useContext, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../contexts/ThemeContext";
import { colors } from "../styles/colors";
import { useTranslation } from "react-i18next";
import { enviarPerguntaIA } from "../services/iaAgent";

export default function Chat() {
  const { isDark } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [ultimaMensagem, setUltimaMensagem] = useState("");
  const isButtonDisabled = message.trim().length === 0;

  const handleSend = async () => {
    setShowIntro(false);
    setLoading(true);
    setResposta("A IA está pensando...");

    const userMessage = message;

    setUltimaMensagem(userMessage);
    setMessage("");

    try {
      const result = await enviarPerguntaIA({ chatInput: userMessage });

      setResposta(result.output);
    } catch (error) {
      setResposta("Erro ao obter resposta da IA");
    } finally {
      setLoading(false);
    }
  };

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
            <View style={{ flex: 1 }}>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                style={{ flex: 1 }}
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingBottom: 16,
                  flexGrow: 1,
                }}
              >
                <View>
                  <Text
                    className={`text-lg font-semibold mb-2
                    ${isDark ? "text-textDark" : "text-textLight"}`}
                  >
                    Você:
                  </Text>

                  <Text
                    className={`mb-4 
                    ${isDark ? "text-textDark" : "text-textLight"}`}
                  >
                    {ultimaMensagem || "Mensagem enviada"}
                  </Text>
                </View>

                <View>
                  <Text
                    className={`text-lg font-semibold mb-2 
                    ${isDark ? "text-textDark" : "text-textLight"}`}
                  >
                    IA:
                  </Text>

                  <Text
                    className={`${isDark ? "text-textDark" : "text-textLight"}`}
                  >
                    {resposta}
                  </Text>
                </View>
              </ScrollView>
            </View>
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
