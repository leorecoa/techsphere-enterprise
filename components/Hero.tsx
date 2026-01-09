
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-secondary pt-16 pb-24 md:pt-32 md:pb-40 text-white mb-20">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full -mr-96 -mt-96 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full -ml-48 -mb-48"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-8">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              Lançamento Oficial 2024
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
              Performance <br /> sem <span className="text-primary italic">Limites.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-400 font-medium mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              O hardware mais avançado do mundo agora ao seu alcance. Experiência de compra enterprise com suporte dedicado e entrega expressa.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
              <a 
                href="#catalog"
                className="px-10 py-6 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-3xl shadow-2xl shadow-primary/40 hover:bg-primary-dark transition-all hover:scale-105 active:scale-95 text-center"
              >
                Explorar Catálogo
              </a>
              <button className="px-10 py-6 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <i className="fas fa-play-circle text-lg opacity-50"></i> Ver Tech Demo
              </button>
            </div>

            <div className="mt-16 flex items-center justify-center lg:justify-start gap-8 opacity-40 grayscale pointer-events-none">
              <i className="fab fa-apple text-3xl"></i>
              <i className="fab fa-microsoft text-3xl"></i>
              <i className="fab fa-nvidia text-3xl"></i>
              <i className="fab fa-amd text-4xl"></i>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-2xl">
            <div className="relative z-10 group">
              <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <img 
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1170&q=80" 
                alt="Tech Enterprise" 
                className="rounded-[3rem] shadow-2xl w-full border-2 border-white/10 transform transition-transform duration-700 hover:scale-[1.02]"
              />
              
              {/* Floating elements */}
              <div className="absolute -bottom-10 -right-6 md:-right-12 bg-white p-6 rounded-[2.5rem] shadow-2xl animate-bounce [animation-duration:5s] hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-xl">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Estoque Real</p>
                    <p className="text-secondary font-black">Pronta Entrega</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
