import axios from "axios";
import { N8N_WEBHOOK_URL } from "@env";

interface IARequest {
  chatInput: string;
}

interface IAResponse {
  output: string;
}

export async function enviarPerguntaIA(data: IARequest): Promise<IAResponse> {
  try {
    const response = await axios.post<IAResponse>(N8N_WEBHOOK_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao comunicar com IA:", error);
    throw new Error("Falha na comunicação com IA");
  }
}
