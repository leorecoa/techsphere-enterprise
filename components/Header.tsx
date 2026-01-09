
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onCartToggle: () => void;
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, wishlistCount, onCartToggle, onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Setup Gamer', icon: 'fa-gamepad' },
    { name: 'Produtividade', icon: 'fa-briefcase' },
    { name: 'Áudio Elite', icon: 'fa-headphones' },
    { name: 'Smart Life', icon: 'fa-house-signal' },
  ];

  return (
    <header className={`sticky top-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' : 'bg-white py-5 md:py-8'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-secondary text-2xl p-2 active:scale-95 transition-transform"
          >
            <i className="fas fa-bars-staggered"></i>
          </button>

          <a href="/" className="flex items-center group shrink-0">
            <h1 className="text-2xl md:text-3xl font-black text-secondary tracking-tighter group-hover:scale-105 transition-transform">
              Tech<span className="text-primary italic">Sphere</span>
            </h1>
          </a>

          <div className="hidden sm:flex flex-1 max-w-xl relative">
            <input 
              type="text" 
              placeholder="Encontre sua próxima inovação..."
              className="w-full pl-14 pr-6 py-4 bg-slate-100 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl focus:outline-none transition-all text-sm font-bold shadow-sm"
              onChange={(e) => onSearch(e.target.value)}
            />
            <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="hidden sm:flex p-4 hover:bg-slate-50 rounded-2xl transition-colors relative group">
              <i className="far fa-heart text-xl text-slate-400 group-hover:text-red-500 transition-colors"></i>
              {wishlistCount > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button 
              onClick={onCartToggle}
              className="p-3 md:p-4 bg-secondary text-white rounded-2xl relative shadow-xl shadow-secondary/20 hover:scale-105 active:scale-95 transition-all group"
            >
              <i className="fas fa-shopping-cart md:text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-xl border-4 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="sm:hidden mt-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="O que você procura hoje?"
              className="w-full pl-12 pr-6 py-4 bg-slate-100 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-primary/20"
              onChange={(e) => onSearch(e.target.value)}
            />
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-primary/50"></i>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-10 mt-6 pt-4 border-t border-slate-50 overflow-x-auto scroll-hide">
          {navLinks.map((link, i) => (
            <a key={i} href="#" className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors whitespace-nowrap group">
              <i className={`fas ${link.icon} opacity-30 group-hover:opacity-100 group-hover:text-primary transition-opacity`}></i>
              {link.name}
            </a>
          ))}
          <a href="#" className="ml-auto text-[11px] font-black text-accent uppercase tracking-[0.2em] flex items-center gap-2 hover:scale-105 transition-transform">
             <span className="w-2 h-2 bg-accent rounded-full animate-ping"></span>
             Nossas Lojas
          </a>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div className="absolute inset-0 bg-secondary/80 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 w-full max-w-[320px] h-full bg-white shadow-2xl flex flex-col p-8 animate-[slideIn_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-black italic tracking-tighter">Tech<span className="text-primary">Sphere</span></h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><i className="fas fa-times"></i></button>
            </div>
            
            <div className="space-y-6">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Navegação</p>
              {navLinks.map((link, i) => (
                <a key={i} href="#" className="flex items-center gap-4 text-xl font-black text-secondary hover:text-primary transition-all">
                  <i className={`fas ${link.icon} text-primary/30`}></i>
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-100" />
              <a href="#" className="flex items-center gap-4 text-xl font-black text-red-500">
                <i className="fas fa-heart opacity-30"></i> Favoritos
              </a>
            </div>

            <div className="mt-auto">
              <button className="w-full py-5 bg-secondary text-white font-black text-xs uppercase tracking-widest rounded-2xl mb-4">Minha Conta</button>
              <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">Enterprise Edition v2.8</p>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      `}</style>
    </header>
  );
};

export default Header;
