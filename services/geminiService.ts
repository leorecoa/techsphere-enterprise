
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// Serviço para obter resposta do assistente Gemini TechSphere
export const getGeminiAssistantResponse = async (userMessage: string, currentProducts: Product[]) => {
  try {
    // Inicialização do cliente seguindo as diretrizes oficiais (usando o objeto de configuração nomeado)
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Prepara o contexto do produto dinamicamente baseado no estoque atual do MongoDB
    const productContext = currentProducts.map(p => 
      `${p.name} (${p.category}): R$ ${p.price}. ${p.description} [Estoque: ${p.stock}]`
    ).join('\n');

    // Executa a geração de conteúdo utilizando o modelo gemini-3-flash-preview conforme as regras de tarefa de texto básico/Q&A
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful tech shopping assistant at TechSphere. 
      Available products in our MongoDB database:
      ${productContext}
      
      User message: ${userMessage}
      
      Provide helpful, concise advice in Portuguese (pt-BR). If recommending a product, mention its price and main feature. 
      Crucial: If a product is out of stock (Estoque: 0), mention that it is currently unavailable.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    // Extrai o texto da resposta acessando a propriedade .text (não é um método)
    return response.text || "Desculpe, não consegui processar sua solicitação agora.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Ocorreu um erro ao falar com o assistente TechSphere. Por favor, tente novamente.";
  }
};
