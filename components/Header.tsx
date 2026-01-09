
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartToggle, onSearch }) => {
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
    { name: 'Notebooks', icon: 'fa-laptop' },
    { name: 'Smartphones', icon: 'fa-mobile-alt' },
    { name: 'TVs & Monitores', icon: 'fa-tv' },
    { name: 'Gaming', icon: 'fa-gamepad' },
    { name: 'Áudio', icon: 'fa-headphones' },
  ];

  return (
    <header className={`sticky top-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' : 'bg-white py-5 md:py-8'}`}>
      {/* Top Bar - Desktop */}
      {!isScrolled && (
        <div className="hidden md:block bg-secondary text-white py-2 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <span className="animate-pulse flex items-center gap-2"><i className="fas fa-bolt text-accent"></i> Ofertas exclusivas de inverno por tempo limitado!</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-colors">Venda na TechSphere</a>
              <a href="#" className="hover:text-accent transition-colors">Ajuda</a>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          
          {/* Burger Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-secondary text-2xl p-2 active:scale-95 transition-transform"
          >
            <i className="fas fa-bars-staggered"></i>
          </button>

          {/* Logo */}
          <a href="/" className="flex items-center group shrink-0">
            <h1 className="text-2xl md:text-3xl font-black text-secondary tracking-tighter group-hover:scale-105 transition-transform">
              Tech<span className="text-primary italic">Sphere</span>
            </h1>
          </a>

          {/* Search Bar - Hidden on small mobile */}
          <div className="hidden sm:flex flex-1 max-w-2xl relative">
            <input 
              type="text" 
              placeholder="Pesquisar por hardware, setups ou marcas..."
              className="w-full pl-14 pr-6 py-4 bg-slate-100 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl focus:outline-none transition-all text-sm font-bold shadow-sm"
              onChange={(e) => onSearch(e.target.value)}
            />
            <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-6">
            <button className="hidden xl:flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-slate-50 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                <i className="far fa-user text-lg"></i>
              </div>
              <div className="text-left leading-none">
                <p className="text-[10px] text-gray font-black uppercase mb-1">Account</p>
                <p className="text-xs font-black text-secondary">Login</p>
              </div>
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

        {/* Mobile Search Only */}
        <div className="sm:hidden mt-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Pesquisar produtos..."
              className="w-full pl-12 pr-6 py-4 bg-slate-100 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-primary/20"
              onChange={(e) => onSearch(e.target.value)}
            />
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-primary/50"></i>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-10 mt-6 pt-4 border-t border-slate-50 overflow-x-auto scroll-hide">
          {navLinks.map((link, i) => (
            <a key={i} href="#" className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors whitespace-nowrap group">
              <i className={`fas ${link.icon} opacity-30 group-hover:opacity-100 group-hover:text-primary transition-opacity`}></i>
              {link.name}
            </a>
          ))}
          <a href="#" className="ml-auto text-[11px] font-black text-accent uppercase tracking-[0.2em] flex items-center gap-2 animate-pulse">
            <i className="fas fa-fire-flame-curved"></i> Clearance Sale
          </a>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div className="absolute inset-0 bg-secondary/80 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 w-full max-w-[320px] h-full bg-white shadow-2xl flex flex-col p-8 animate-[slideIn_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-black italic tracking-tighter">Tech<span className="text-primary">Sphere</span></h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><i className="fas fa-times"></i></button>
            </div>
            
            <div className="space-y-6">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Menu</p>
              {navLinks.map((link, i) => (
                <a key={i} href="#" className="flex items-center gap-4 text-xl font-black text-secondary hover:text-primary transition-all">
                  <i className={`fas ${link.icon} text-primary/30`}></i>
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-auto">
              <button className="w-full py-5 bg-secondary text-white font-black text-xs uppercase tracking-widest rounded-2xl mb-4">Minha Conta</button>
              <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">TechSphere v2.8 Standard</p>
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
