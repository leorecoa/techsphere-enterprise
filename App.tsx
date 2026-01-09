
import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES_LIST } from './constants';
import { Product, CartItem, CategoryType } from './types';
import { ProductAPI } from './services/api';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import ProductModal from './components/ProductModal';
import Features from './components/Features';
import Brands from './components/Brands';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('techsphere_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryType>(CategoryType.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc' | 'rating'>('default');

  useEffect(() => {
    localStorage.setItem('techsphere_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await ProductAPI.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesCategory = activeCategory === CategoryType.ALL || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price_asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, activeCategory, searchTerm, sortBy]);

  const showNotification = (message: string, type: 'success' | 'error') => {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-emerald-500' : 'bg-red-500';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
    
    toast.className = `fixed bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:top-10 md:right-10 z-[120] ${bgColor} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce transition-all duration-300 w-[90%] md:w-auto`;
    toast.innerHTML = `<i class="fas ${icon}"></i> <span class="font-bold">${message}</span>`;
    
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-[-20px]');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    const productId = product._id;
    const currentInCart = cartItems.find(item => item._id === productId)?.quantity || 0;
    const totalRequested = currentInCart + quantity;

    if (product.stock <= 0) {
      showNotification(`Produto esgotado.`, 'error');
      return;
    }

    if (totalRequested > product.stock) {
      showNotification(`Estoque insuficiente.`, 'error');
      return;
    }

    setCartItems(prev => {
      const existing = prev.find(item => item._id === productId);
      if (existing) {
        return prev.map(item => item._id === productId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    
    showNotification(`${quantity}x ${product.name} no carrinho!`, 'success');
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    const product = products.find(p => p._id === id);
    if (!product) return;

    setCartItems(prev => prev.map(item => {
      if (item._id === id) {
        const newQty = item.quantity + delta;
        if (newQty > product.stock) {
          showNotification(`Limite de estoque atingido.`, 'error');
          return item;
        }
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden">
      <Header 
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        onCartToggle={() => setIsCartOpen(true)}
        onSearch={setSearchTerm}
      />

      <main className="flex-1">
        <Hero />
        
        {/* Confiança & Benefícios */}
        <Features />

        {/* Categories Section */}
        <section id="products" className="container mx-auto px-4 mb-16 scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex-1">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Premium Catalog</span>
              <h2 className="text-3xl md:text-4xl font-black text-dark font-poppins mb-6">Explore o Futuro</h2>
              <div className="flex gap-4 overflow-x-auto scroll-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                <button 
                  onClick={() => setActiveCategory(CategoryType.ALL)}
                  className={`px-8 py-5 rounded-3xl flex items-center gap-3 min-w-max transition-all font-bold text-sm ${activeCategory === CategoryType.ALL ? 'bg-primary text-white shadow-xl shadow-primary/25' : 'bg-white border hover:border-primary/40 text-dark'}`}
                >
                  <i className="fas fa-th-large"></i> Todos
                </button>
                {CATEGORIES_LIST.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-8 py-5 rounded-3xl flex items-center gap-3 min-w-max transition-all font-bold text-sm ${activeCategory === cat.id ? 'bg-primary text-white shadow-xl shadow-primary/25' : 'bg-white border hover:border-primary/40 text-dark'}`}
                  >
                    <i className={`fas ${cat.icon}`}></i> {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 self-start md:self-auto">
              <span className="text-[10px] font-black text-slate-400 uppercase px-3 whitespace-nowrap">Order By:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-sm font-bold text-secondary outline-none pr-4 cursor-pointer"
              >
                <option value="default">Destaques</option>
                <option value="price_asc">Menor Preço</option>
                <option value="price_desc">Maior Preço</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] h-[520px] animate-pulse p-8 border border-slate-100">
                  <div className="bg-slate-100 h-64 rounded-3xl w-full mb-6"></div>
                  <div className="bg-slate-100 h-4 rounded w-1/4 mb-4"></div>
                  <div className="bg-slate-100 h-8 rounded w-3/4 mb-4"></div>
                  <div className="bg-slate-100 h-10 rounded w-full mt-auto"></div>
                </div>
              ))}
            </div>
          ) : filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredAndSortedProducts.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  onAddToCart={addToCart}
                  onNotification={showNotification}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-search text-3xl text-slate-300"></i>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-2">Ops! Nada encontrado</h3>
              <p className="text-gray mb-8 max-w-md mx-auto">Não encontramos nenhum produto que combine com sua busca ou categoria selecionada.</p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveCategory(CategoryType.ALL);}} 
                className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95"
              >
                Ver todos os produtos
              </button>
            </div>
          )}
        </section>

        {/* Marcas Parceiras */}
        <Brands />

        {/* Newsletter Section */}
        <Newsletter />
      </main>

      <Footer />

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default App;
