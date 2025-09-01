import { useContext } from "react";
import { Platform, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import Markdown from "react-native-markdown-display";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { isDark } = useContext(ThemeContext);

  function cleanMarkdown(raw: string) {
    if (!raw) return raw;

    let cleaned = raw.replace(/\\n/g, "\n");
    cleaned = cleaned.replace(/\\([*_#`\\-])/g, "$1");

    return cleaned;
  }

  return (
    <View
      style={{
        marginBottom: 8,
        width: "100%",
        alignSelf: "stretch",
      }}
    >
      <Markdown
        style={{
          body: {
            color: isDark ? "#E6E6E6" : "#111827",
            fontSize: 16,
            lineHeight: 24,
            textAlign: Platform.OS === "android" ? "justify" : "left",
            paddingHorizontal: 4,
          },
          paragraph: {
            textAlign: Platform.OS === "android" ? "justify" : "left",
            marginBottom: 12,
            lineHeight: 24,
          },
          text: {
            textAlign: Platform.OS === "android" ? "justify" : "left",
            lineHeight: 24,
          },
          list_item: {
            textAlign: "left",
            marginBottom: 4,
          },
          bullet_list: {
            textAlign: "left",
            marginBottom: 8,
          },
          ordered_list: {
            textAlign: "left",
            marginBottom: 8,
          },
          heading1: {
            fontSize: 20,
            fontWeight: "700",
            textAlign: "left",
            marginBottom: 8,
          },
          heading2: {
            fontSize: 18,
            fontWeight: "700",
            textAlign: "left",
            marginBottom: 6,
          },
          strong: { fontWeight: "700" },
          hr: {
            borderBottomWidth: 1,
            borderBottomColor: isDark ? "#444" : "#DDD",
            marginVertical: 12,
          },
          code_inline: {
            fontFamily: "monospace",
            padding: 4,
            backgroundColor: isDark ? "#333" : "#f5f5f5",
            borderRadius: 4,
          },
          fence: {
            fontFamily: "monospace",
            padding: 12,
            backgroundColor: isDark ? "#333" : "#f5f5f5",
            borderRadius: 8,
            marginVertical: 8,
          },
        }}
      >
        {cleanMarkdown(content)}
      </Markdown>
    </View>
  );
}
