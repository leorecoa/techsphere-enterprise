
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted?: boolean;
  onAddToCart: (product: Product, quantity: number) => Promise<void> | void;
  onToggleWishlist: (productId: string) => void;
  onNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isWishlisted, 
  onAddToCart, 
  onToggleWishlist, 
  onNotification, 
  onQuickView 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock <= 0;
  const isLowStock = !isOutOfStock && product.stock <= 5;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdding || isOutOfStock) return;
    setIsAdding(true);
    try {
      await onAddToCart(product, quantity);
      setQuantity(1);
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product._id);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className={`group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden flex flex-col h-full cursor-pointer ${isOutOfStock ? 'opacity-80 grayscale-[0.5]' : ''}`}
    >
      <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
        {isOutOfStock ? (
          <span className="px-4 py-1.5 rounded-2xl text-[9px] font-black text-white uppercase tracking-widest bg-slate-500 shadow-xl">Sem Estoque</span>
        ) : product.badge && (
          <span className={`px-4 py-1.5 rounded-2xl text-[9px] font-black text-white uppercase tracking-widest ${product.badge === 'new' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30' : 'bg-amber-500 shadow-lg shadow-amber-500/30'}`}>
            {product.badge === 'new' ? 'Novo' : 'Oferta'}
          </span>
        )}
      </div>

      <button 
        onClick={handleWishlist}
        className="absolute top-6 right-6 z-20 w-11 h-11 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-90 group/heart"
      >
        <i className={`${isWishlisted ? 'fas fa-heart text-red-500' : 'far fa-heart text-slate-400'} text-lg transition-colors group-hover/heart:text-red-500`}></i>
      </button>

      <div className="h-64 overflow-hidden bg-slate-50 relative p-8">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-contain transition-transform duration-1000 ${isOutOfStock ? '' : 'group-hover:scale-110'}`} 
        />
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
           <span className="bg-white px-5 py-2.5 rounded-xl shadow-xl font-black text-[10px] text-primary uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform">
             Ver Detalhes
           </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="mb-4">
          <p className="text-primary text-[9px] uppercase font-black tracking-widest mb-1">{product.category}</p>
          <h3 className="font-bold text-lg line-clamp-2 h-12 group-hover:text-primary transition-colors leading-tight">{product.name}</h3>
        </div>
        
        <div className="flex items-center gap-1 text-amber-400 text-[10px] mb-6">
          {[...Array(5)].map((_, i) => <i key={i} className={`${i < Math.floor(product.rating) ? 'fas' : 'far'} fa-star`}></i>)}
          <span className="text-slate-400 ml-2 font-black uppercase">({product.reviews})</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-end gap-2 mb-6">
            <p className="text-2xl font-black text-secondary tracking-tighter">{formatCurrency(product.price)}</p>
            {product.oldPrice && <p className="text-slate-400 text-xs line-through font-bold mb-1">{formatCurrency(product.oldPrice)}</p>}
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={isAdding || isOutOfStock}
            className={`w-full h-14 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl ${
              isOutOfStock 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : isAdding 
                  ? 'bg-primary/90 text-white animate-pulse' 
                  : 'bg-primary hover:bg-primary-dark text-white hover:scale-[1.02] active:scale-95 shadow-primary/20'
            }`}
          >
            {isAdding ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : isOutOfStock ? (
              'Indisponível'
            ) : (
              <>
                <i className="fas fa-cart-plus"></i> Carrinho
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
