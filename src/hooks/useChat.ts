import { useState } from "react";
import { enviarPerguntaIA } from "../services/iaAgent";

export default function useChat() {
  const [message, setMessage] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [ultimaMensagem, setUltimaMensagem] = useState("");

  const isButtonDisabled = message.trim().length === 0;

  const handleSend = async () => {
    if (isButtonDisabled) return;
    setShowIntro(false);
    setLoading(true);
    setResposta("A IA está pensando...");
    const userMessage = message;
    setUltimaMensagem(userMessage);
    setMessage("");

    try {
      const result = await enviarPerguntaIA({ chatInput: userMessage });
      setResposta(result.output ?? "Resposta vazia");
    } catch (err) {
      console.error("Erro ao chamar IA:", err);
      setResposta("Erro ao obter resposta da IA");
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
