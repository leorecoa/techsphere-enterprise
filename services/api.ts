
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

/**
 * Endpoint da sua API Node.js/Express. 
 * Em produção, isso viria de uma variável de ambiente.
 */
const API_URL = 'http://localhost:5000/api/products';

export const ProductAPI = {
  // Busca todos os produtos do MongoDB
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Falha ao conectar com o servidor');
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('[MongoDB Connect] Usando MOCK_PRODUCTS como fallback. Erro:', error);
      // Fallback para desenvolvimento enquanto seu backend não está pronto
      await new Promise(resolve => setTimeout(resolve, 800));
      return MOCK_PRODUCTS as unknown as Product[];
    }
  },

  // Busca um produto específico por ID (_id do MongoDB)
  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      return (MOCK_PRODUCTS as unknown as Product[]).find(p => p._id === id) || null;
    }
  },

  // Exemplo de atualização de estoque via PATCH
  updateStock: async (productId: string, newStock: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/${productId}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
      });
      return response.ok;
    } catch (error) {
      console.error('[MongoDB Update Error]', error);
      return false;
    }
  }
};
