import { useContext } from "react";
import { ScrollView, View, Text } from "react-native";
import MarkdownRenderer from "./MarkdownRenderer";
import { ThemeContext } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

interface MessageListProps {
  ultimaMensagem: string;
  resposta: string;
}

export default function MessageList({
  ultimaMensagem,
  resposta,
}: MessageListProps) {
  const { isDark } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
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
          {t("pageChat.you")}
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
          {t("pageChat.ai")}
        </Text>

        <View
          style={{ marginBottom: 8, width: "100%", alignSelf: "stretch" }}
          className="text-justify"
        >
          <MarkdownRenderer content={resposta} />
        </View>
      </View>
    </ScrollView>
  );
}
