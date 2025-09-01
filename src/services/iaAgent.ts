import axios from "axios";
import { N8N_WEBHOOK_URL } from "@env";

interface IARequest {
  chatInput: string;
  lang?: string;
}

interface IAResponse {
  output: string;
}

function normalizeLang(input?: string) {
  if (!input) return "ptBR";
  const s = input.toLowerCase();
  if (s.startsWith("ptBR")) return "ptBR";
  if (s.startsWith("en")) return "en";
  return "ptBR";
}

export async function enviarPerguntaIA(data: IARequest): Promise<IAResponse> {
  try {
    const lang = normalizeLang(data.lang);
    const response = await axios.post<IAResponse>(
      N8N_WEBHOOK_URL,
      { chatInput: data.chatInput, lang },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": lang,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao comunicar com IA:", error);
    throw new Error("Falha na comunicação com IA");
  }
}
