import { useContext, useState } from "react";
import { enviarPerguntaIA } from "../services/iaAgent";
import { LanguageContext } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";

export default function useChat() {
  const [message, setMessage] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [ultimaMensagem, setUltimaMensagem] = useState("");
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  const isButtonDisabled = message.trim().length === 0;

  const handleSend = async () => {
    if (isButtonDisabled) return;
    setShowIntro(false);
    setLoading(true);
    setResposta(`${t("pageChat.thinking")}`);
    const userMessage = message;
    setUltimaMensagem(userMessage);
    setMessage("");

    try {
      const result = await enviarPerguntaIA({
        chatInput: userMessage,
        lang: language,
      });
      setResposta(result.output ?? `${t("pageChat.empty")}`);
    } catch (err) {
      console.error("Erro ao chamar IA:", err);
      setResposta(`${t("pageChat.error")}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    message,
    setMessage,
    resposta,
    loading,
    showIntro,
    ultimaMensagem,
    isButtonDisabled,
    handleSend,
    setShowIntro,
  };
}
