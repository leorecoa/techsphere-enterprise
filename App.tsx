
import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES_LIST } from './constants';
import { Product, CartItem, CategoryType } from './types';
import { ProductAPI } from './services/api';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import ProductModal from './components/ProductModal';
import GeminiAssistant from './components/GeminiAssistant';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('techsphere_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('techsphere_wishlist');
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
    localStorage.setItem('techsphere_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

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

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const toast = document.createElement('div');
    const colors = {
      success: 'bg-emerald-500',
      error: 'bg-red-500',
      info: 'bg-primary'
    };
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };
    
    toast.className = `fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:top-10 md:right-10 z-[300] ${colors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in transition-all duration-300 w-[90%] md:w-auto`;
    toast.innerHTML = `<i class="fas ${icons[type]}"></i> <span class="font-bold text-sm">${message}</span>`;
    
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-[-20px]');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showNotification('Removido da lista de desejos', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showNotification('Adicionado à lista de desejos', 'success');
        return [...prev, productId];
      }
    });
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
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden scroll-smooth">
      <Header 
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        wishlistCount={wishlist.length}
        onCartToggle={() => setIsCartOpen(true)}
        onSearch={setSearchTerm}
      />

      <main className="flex-1">
        <Hero />

        {/* Categories Section */}
        <section id="catalog" className="container mx-auto px-4 mb-20 md:mb-24 scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="flex-1 overflow-hidden">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-3 block">Experiência do Usuário</span>
              <h2 className="text-3xl md:text-5xl font-black text-dark font-poppins mb-8 tracking-tight">Hardware de Elite</h2>
              
              <div className="relative group">
                <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none md:hidden" />
                
                <div className="flex gap-4 overflow-x-auto scroll-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                  <button 
                    onClick={() => setActiveCategory(CategoryType.ALL)}
                    className={`px-8 py-5 rounded-3xl flex items-center gap-3 min-w-max transition-all font-bold text-sm category-item ${activeCategory === CategoryType.ALL ? 'bg-primary text-white shadow-xl shadow-primary/25' : 'bg-white border hover:border-primary/40 text-dark shadow-sm'}`}
                  >
                    <i className="fas fa-th-large"></i> Todos
                  </button>
                  {CATEGORIES_LIST.map((cat, index) => {
                    const isThirdButton = index === 1; // Smartphones
                    return (
                      <button 
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-8 py-5 rounded-3xl flex items-center gap-3 min-w-max transition-all font-bold text-sm category-item relative ${activeCategory === cat.id ? 'bg-primary text-white shadow-xl shadow-primary/25' : 'bg-white border hover:border-primary/40 text-dark shadow-sm'}`}
                      >
                        <i className={`fas ${cat.icon}`}></i> 
                        {cat.name}
                        {isThirdButton && (
                          <div className="ml-2 flex items-center lg:hidden">
                            <i className="fas fa-chevron-right opacity-25 animate-side-bounce text-[10px]"></i>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3 rounded-[1.5rem] border border-slate-200 self-start lg:self-auto shadow-sm min-w-[200px]">
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                <i className="fas fa-sort-amount-down text-xs"></i>
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Ordenar por:</p>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-sm font-bold text-secondary outline-none w-full cursor-pointer appearance-none"
                >
                  <option value="default">Destaques</option>
                  <option value="price_asc">Menor Preço</option>
                  <option value="price_desc">Maior Preço</option>
                  <option value="rating">Melhor Avaliados</option>
                </select>
              </div>
              <i className="fas fa-chevron-down text-[10px] text-slate-300 pr-2"></i>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] h-[520px] animate-pulse p-8 border border-slate-100 shadow-sm">
                  <div className="bg-slate-100 h-64 rounded-3xl w-full mb-6"></div>
                  <div className="bg-slate-100 h-4 rounded w-1/4 mb-4"></div>
                  <div className="bg-slate-100 h-8 rounded w-3/4 mb-4"></div>
                  <div className="bg-slate-100 h-10 rounded w-full mt-auto"></div>
                </div>
              ))}
            </div>
          ) : filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 animate-slide-up">
              {filteredAndSortedProducts.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  isWishlisted={wishlist.includes(product._id)}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  onNotification={showNotification}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-[3.5rem] border-2 border-dashed border-slate-200">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <i className="fas fa-search text-4xl text-slate-300"></i>
              </div>
              <h3 className="text-3xl font-black text-dark mb-4">Ops! Nada por aqui</h3>
              <p className="text-gray mb-10 max-w-md mx-auto font-medium">Tente buscar por termos mais genéricos ou mudar a categoria selecionada.</p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveCategory(CategoryType.ALL);}} 
                className="px-12 py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Infraestrutura MongoDB Ativa • Latência: 24ms
                </p>
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                © 2024 TechSphere Enterprise. Made for the Future.
              </p>
           </div>
        </div>
      </footer>

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
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct._id) : false}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
      />

      <GeminiAssistant products={products} />
    </div>
  );
};

export default App;
