
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => Promise<void> | void;
  onNotification: (message: string, type: 'success' | 'error') => void;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onNotification, onQuickView }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock <= 0;
  const isLowStock = !isOutOfStock && product.stock <= 5;
  const isCriticalStock = !isOutOfStock && product.stock <= 2;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const incrementQty = () => {
    if (isAdding || isOutOfStock || quantity >= product.stock) return;
    setQuantity(prev => prev + 1);
  };

  const decrementQty = () => {
    if (isAdding || isOutOfStock || quantity <= 1) return;
    setQuantity(prev => prev - 1);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdding || isOutOfStock) return;

    setIsAdding(true);
    try {
      await onAddToCart(product, quantity);
      setQuantity(1);
    } catch (error) {
      onNotification('Erro ao processar.', 'error');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className={`group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden flex flex-col h-full cursor-pointer ${isOutOfStock ? 'opacity-75' : ''}`}
    >
      {/* Badges */}
      <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
        {isOutOfStock ? (
          <span className="px-4 py-1.5 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest bg-slate-500 shadow-xl">Esgotado</span>
        ) : product.badge && (
          <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest ${product.badge === 'new' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30' : 'bg-amber-500 shadow-lg shadow-amber-500/30'}`}>
            {product.badge === 'new' ? 'Novo' : 'Oferta'}
          </span>
        )}
      </div>

      {/* Quick View Button Overlay */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
        <div className="bg-white px-6 py-3 rounded-2xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform font-black text-xs text-primary uppercase tracking-widest">
          Ver Detalhes
        </div>
      </div>

      {/* Imagem */}
      <div className="h-72 overflow-hidden bg-slate-50 relative p-4">
        <img src={product.image} alt={product.name} className={`w-full h-full object-contain transition-transform duration-1000 ${isOutOfStock ? 'grayscale' : 'group-hover:scale-110'}`} />
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="mb-4">
          <p className="text-primary text-[10px] uppercase font-black tracking-widest mb-1">{product.category}</p>
          <h3 className="font-bold text-xl line-clamp-2 h-14 group-hover:text-primary transition-colors leading-tight">{product.name}</h3>
        </div>
        
        <div className="flex items-center gap-1 text-amber-400 text-xs mb-6">
          {[...Array(5)].map((_, i) => <i key={i} className={`${i < Math.floor(product.rating) ? 'fas' : 'far'} fa-star`}></i>)}
          <span className="text-slate-400 ml-2 font-bold uppercase text-[10px]">({product.reviews} reviews)</span>
        </div>

        {isLowStock && (
          <div className={`flex items-center gap-2 px-4 py-2 border rounded-2xl text-[10px] font-black uppercase tracking-widest mb-6 transition-all ${isCriticalStock ? 'bg-red-50 border-red-100 text-red-600 animate-pulse' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
            <i className="fas fa-fire"></i> {product.stock} Restantes
          </div>
        )}

        <div className="mt-auto space-y-6">
          <div className="flex items-end gap-2">
            <p className="text-3xl font-black text-secondary tracking-tighter">{formatCurrency(product.price)}</p>
            {product.oldPrice && <p className="text-slate-400 text-sm line-through font-bold mb-1">{formatCurrency(product.oldPrice)}</p>}
          </div>

          <div className="flex items-center gap-3">
            <div 
              onClick={(e) => e.stopPropagation()}
              className={`flex items-center bg-slate-100 rounded-2xl p-1 h-14 border border-transparent transition-all ${isAdding || isOutOfStock ? 'opacity-50 pointer-events-none' : 'hover:border-slate-200'}`}
            >
              <button 
                onClick={decrementQty} 
                disabled={isAdding || isOutOfStock || quantity <= 1} 
                className="w-10 h-10 flex items-center justify-center text-primary hover:bg-white hover:shadow-sm rounded-xl transition-all disabled:text-slate-400 disabled:hover:bg-transparent disabled:hover:shadow-none"
              >
                <i className="fas fa-minus text-xs"></i>
              </button>
              <span className="w-8 text-center font-black text-sm text-secondary">{isOutOfStock ? 0 : quantity}</span>
              <button 
                onClick={incrementQty} 
                disabled={isAdding || isOutOfStock || quantity >= product.stock} 
                className="w-10 h-10 flex items-center justify-center text-primary hover:bg-white hover:shadow-sm rounded-xl transition-all disabled:text-slate-400 disabled:hover:bg-transparent disabled:hover:shadow-none"
              >
                <i className="fas fa-plus text-xs"></i>
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={isAdding || isOutOfStock}
              className={`flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-xs uppercase tracking-widest shadow-xl ${
                isOutOfStock 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : isAdding 
                    ? 'bg-primary/90 text-white cursor-wait animate-pulse' 
                    : 'bg-primary hover:bg-primary-dark text-white hover:scale-105 active:scale-95 shadow-primary/20'
              }`}
            >
              {isAdding ? (
                <i className="fas fa-circle-notch fa-spin"></i>
              ) : isOutOfStock ? (
                'Sem Estoque'
              ) : (
                <>
                  <i className="fas fa-plus"></i> Carrinho
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
