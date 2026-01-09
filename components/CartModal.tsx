
import React from 'react';
import { CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal > 5000 ? 300 : 0;
  const total = subtotal - discount;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-[slideInRight_0.3s_ease-out]">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fas fa-shopping-basket text-primary"></i> Seu Carrinho
          </h2>
          <button onClick={onClose} className="text-gray hover:text-dark text-2xl">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray space-y-4">
              <i className="fas fa-shopping-cart text-6xl opacity-20"></i>
              <p className="text-xl font-medium">Seu carrinho está vazio</p>
              <button 
                onClick={onClose}
                className="text-primary font-bold hover:underline"
              >
                Começar a comprar
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 p-2 bg-slate-50 rounded-xl">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{item.name}</h4>
                  <p className="text-primary font-bold text-lg">{formatCurrency(item.price)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-primary disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <i className="fas fa-minus text-xs"></i>
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-primary"
                      >
                        <i className="fas fa-plus text-xs"></i>
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-gray">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray">
              <span>Frete</span>
              <span className="text-emerald-500 font-bold uppercase text-xs">Grátis</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-500 font-medium">
                <span>Desconto Fidelidade</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-black pt-2 border-t">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button 
              onClick={onClose}
              className="px-6 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors"
            >
              Continuar
            </button>
            <button className="px-6 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/25 transition-all">
              Finalizar
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CartModal;
