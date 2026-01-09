
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product || !isOpen) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleAdd = async () => {
    setIsAdding(true);
    await onAddToCart(product, quantity);
    setIsAdding(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-secondary/80 backdrop-blur-md animate-fadeIn" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-slideUp">
        <button onClick={onClose} className="absolute top-8 right-8 z-20 w-12 h-12 bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-500 rounded-full flex items-center justify-center transition-all">
          <i className="fas fa-times text-xl"></i>
        </button>

        {/* Galeria */}
        <div className="md:w-1/2 bg-slate-50 flex items-center justify-center p-12 relative">
          <img src={product.image} alt={product.name} className="max-h-full object-contain transform hover:scale-110 transition-transform duration-700" />
          <div className="absolute bottom-8 left-8">
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl flex items-center gap-4">
              <div className="text-center">
                <p className="text-[10px] font-black uppercase text-slate-400">Rating</p>
                <p className="font-bold text-secondary">{product.rating}/5.0</p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <p className="text-[10px] font-black uppercase text-slate-400">Estoque</p>
                <p className="font-bold text-emerald-500">{product.stock} un.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2 p-12 overflow-y-auto">
          <p className="text-primary font-black uppercase tracking-[0.3em] text-[11px] mb-4">{product.category}</p>
          <h2 className="text-4xl font-black text-secondary leading-tight mb-6">{product.name}</h2>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-secondary text-white px-8 py-4 rounded-3xl shadow-xl shadow-secondary/20">
              <p className="text-[10px] font-black uppercase opacity-50 mb-1">Preço À Vista</p>
              <p className="text-3xl font-black tracking-tighter">{formatCurrency(product.price)}</p>
            </div>
            {product.oldPrice && (
              <div>
                <p className="text-slate-400 line-through text-lg font-bold">{formatCurrency(product.oldPrice)}</p>
                <p className="text-emerald-500 font-black text-xs">Economize {formatCurrency(product.oldPrice - product.price)}</p>
              </div>
            )}
          </div>

          <div className="space-y-6 mb-12">
            <div>
              <h4 className="font-black uppercase tracking-widest text-[11px] text-slate-400 mb-3">Descrição do Produto</h4>
              <p className="text-slate-600 leading-relaxed font-medium">{product.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Status</p>
                <p className="font-bold text-secondary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Em Estoque
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Envio</p>
                <p className="font-bold text-secondary">Para todo o Brasil</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center bg-slate-100 rounded-2xl p-2 h-16 border border-transparent">
              <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-12 h-12 flex items-center justify-center text-primary hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm"><i className="fas fa-minus"></i></button>
              <span className="w-12 text-center font-black text-xl text-secondary">{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock, q+1))} className="w-12 h-12 flex items-center justify-center text-primary hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm"><i className="fas fa-plus"></i></button>
            </div>
            
            <button 
              onClick={handleAdd}
              disabled={isAdding}
              className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/30 transition-all flex items-center justify-center gap-4 hover:scale-105 active:scale-95"
            >
              {isAdding ? <i className="fas fa-circle-notch fa-spin"></i> : <><i className="fas fa-cart-plus text-xl"></i> Adicionar ao Carrinho</>}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px) scale(0.95); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default ProductModal;
