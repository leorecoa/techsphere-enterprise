
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// Serviço otimizado para custo e performance
export const getGeminiAssistantResponse = async (userMessage: string, currentProducts: Product[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Otimização: Enviamos apenas os dados essenciais para economizar tokens
    const productContext = currentProducts.map(p => 
      `${p.name}: R$${p.price} [Estoque:${p.stock}]`
    ).join('; ');

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Contexto TechSphere: ${productContext}
      User: ${userMessage}`,
      config: {
        systemInstruction: `Você é o TechSphere AI. Seja extremamente conciso e técnico. 
        Responda em pt-BR. Use no máximo 2 frases. 
        Sempre informe se o produto está indisponível caso o estoque seja 0.
        Não use saudações longas. Vá direto ao ponto.`,
        temperature: 0.6,
        topP: 0.9,
        // Otimização de custo: Limita o tamanho da resposta da IA
        maxOutputTokens: 150,
      }
    });

    return response.text || "Estou com dificuldades técnicas, tente novamente em instantes.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Erro na conexão com o assistente. Verifique sua rede.";
  }
};
