
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartToggle, onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Bloquear o scroll do corpo quando o menu lateral estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', icon: 'fa-home', href: '#' },
    { name: 'Notebooks', icon: 'fa-laptop', href: '#' },
    { name: 'Smartphones', icon: 'fa-mobile-alt', href: '#' },
    { name: 'TVs & Monitores', icon: 'fa-tv', href: '#' },
    { name: 'Gaming', icon: 'fa-gamepad', href: '#' },
    { name: 'Áudio', icon: 'fa-headphones', href: '#' },
    { name: 'Componentes', icon: 'fa-microchip', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      {/* Barra de Informações - Apenas Desktop (>= 768px) */}
      <div className="bg-secondary text-white py-2 text-[11px] font-bold uppercase tracking-wider hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <i className="fas fa-truck text-accent"></i>
              Frete Grátis acima de R$ 299
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-headset text-accent"></i>
              Suporte Técnico 24h
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-accent transition-colors">Encontrar Loja</a>
            <a href="#" className="hover:text-accent transition-colors">Central de Ajuda</a>
          </div>
        </div>
      </div>

      {/* Cabeçalho Principal */}
      <div className="py-4 md:py-6">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          
          {/* Botão Hambúrguer - Visível apenas abaixo de 768px (md) */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-secondary text-2xl p-2 -ml-2 hover:bg-slate-100 rounded-xl transition-colors active:scale-95"
            aria-label="Abrir Menu de Navegação"
          >
            <i className="fas fa-bars-staggered"></i>
          </button>

          {/* Logotipo */}
          <a href="/" className="flex items-center group shrink-0">
            <h1 className="text-2xl md:text-3xl font-black text-secondary tracking-tighter transition-transform group-hover:scale-105">
              Tech<span className="text-primary italic">Sphere</span>
            </h1>
          </a>

          {/* Barra de Pesquisa - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <input 
              type="text" 
              placeholder="O que você deseja encontrar hoje?"
              className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-transparent border focus:border-primary/30 focus:bg-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
              onChange={(e) => onSearch(e.target.value)}
            />
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          </div>

          {/* Ícones de Ação */}
          <div className="flex items-center gap-1 md:gap-4">
            <button className="p-3 text-secondary hover:bg-slate-100 rounded-xl transition-colors hidden sm:flex items-center gap-2 group">
              <i className="far fa-user text-xl group-hover:text-primary transition-colors"></i>
              <div className="hidden lg:block text-left">
                <p className="text-[10px] text-gray font-bold uppercase leading-none mb-0.5">Perfil</p>
                <p className="text-xs font-bold leading-none">Minha Conta</p>
              </div>
            </button>
            
            <button className="p-3 text-secondary hover:bg-slate-100 rounded-xl transition-colors relative group">
              <i className="far fa-heart text-xl group-hover:text-primary transition-colors"></i>
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
            </button>

            <button 
              onClick={onCartToggle}
              className="p-3 text-secondary hover:bg-slate-100 rounded-xl transition-colors relative group flex items-center gap-2"
            >
              <div className="relative">
                <i className="fas fa-shopping-cart text-xl group-hover:text-primary transition-colors"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-[10px] text-gray font-bold uppercase leading-none mb-0.5">Carrinho</p>
                <p className="text-xs font-bold leading-none">Checkout</p>
              </div>
            </button>
          </div>
        </div>

        {/* Pesquisa - Mobile Only (Abaixo de 640px) */}
        <div className="px-4 mt-4 md:hidden">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar produtos e marcas..."
              className="w-full pl-12 pr-6 py-3 bg-slate-100 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
              onChange={(e) => onSearch(e.target.value)}
            />
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-primary/60"></i>
          </div>
        </div>
      </div>

      {/* Navegação Horizontal - Visível apenas em Desktop (md) */}
      <nav className="bg-white border-t border-slate-50 hidden md:block overflow-x-auto scroll-hide">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-8 py-4 whitespace-nowrap">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a 
                  href={link.href} 
                  className="flex items-center gap-2 text-sm font-bold text-gray hover:text-primary transition-colors group"
                >
                  <i className={`fas ${link.icon} text-slate-300 group-hover:text-primary/50 transition-colors`}></i>
                  {link.name}
                </a>
              </li>
            ))}
            <li className="ml-auto">
              <a href="#" className="flex items-center gap-2 text-sm font-black text-accent hover:text-cyan-600 transition-colors group">
                <i className="fas fa-bolt text-amber-500 animate-pulse"></i>
                OFERTAS DO DIA
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Menu Drawer Mobile (Modal Lateral) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Fundo Escurecido com Desfoque */}
          <div 
            className="absolute inset-0 bg-secondary/70 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Conteúdo do Menu Lateral */}
          <div className="absolute top-0 left-0 w-[280px] sm:w-[320px] h-full bg-white shadow-2xl flex flex-col animate-[slideInLeft_0.3s_ease-out]">
            {/* Cabeçalho do Menu */}
            <div className="p-6 bg-secondary text-white">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black italic tracking-tighter">
                  Tech<span className="text-accent">Sphere</span>
                </h2>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center border border-accent/30">
                  <i className="fas fa-user-astronaut text-accent text-xl"></i>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-accent tracking-widest">Bem-vindo(a)</p>
                  <p className="font-bold">Acesse sua conta</p>
                </div>
              </div>
            </div>

            {/* Listagem de Links Mobile */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 px-4">Menu de Navegação</p>
              <div className="space-y-1">
                {navLinks.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl text-secondary font-bold hover:bg-slate-50 hover:text-primary transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      <i className={`fas ${link.icon} text-lg`}></i>
                    </div>
                    <span>{link.name}</span>
                    <i className="fas fa-chevron-right ml-auto text-slate-300 group-hover:translate-x-1 transition-transform"></i>
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 px-4">Sua TechSphere</p>
                <div className="grid grid-cols-2 gap-3 px-2">
                  <a href="#" className="flex flex-col items-center gap-3 p-5 rounded-3xl bg-slate-50 hover:bg-primary hover:text-white transition-all group">
                    <i className="fas fa-truck-fast text-xl text-primary group-hover:text-white"></i>
                    <span className="text-[11px] font-bold">Rastrear</span>
                  </a>
                  <a href="#" className="flex flex-col items-center gap-3 p-5 rounded-3xl bg-slate-50 hover:bg-primary hover:text-white transition-all group">
                    <i className="fas fa-heart text-xl text-primary group-hover:text-white"></i>
                    <span className="text-[11px] font-bold">Desejos</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Rodapé do Menu Lateral */}
            <div className="p-6 bg-slate-50 border-t mt-auto">
              <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 hover:bg-primary-dark transition-all">
                <i className="fas fa-sign-in-alt"></i>
                Entrar / Criar Conta
              </button>
              <p className="text-center text-[10px] text-gray mt-4 font-bold">TechSphere v2.5 | MongoDB Connected</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </header>
  );
};

export default Header;
