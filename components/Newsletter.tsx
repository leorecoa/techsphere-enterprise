
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="container mx-auto px-4 mb-24">
      <div className="bg-secondary rounded-[3.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
        {/* Decorativo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-primary/20">
              Exclusive Access
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Seja o primeiro a ver <br className="hidden md:block" /> o <span className="text-primary italic">Futuro.</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl">
              Cadastre-se na TechSphere e ganhe <span className="text-white font-bold">R$ 50 OFF</span> na primeira compra, além de ofertas VIP.
            </p>
          </div>

          <div className="w-full lg:w-1/3">
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail corporativo" 
                  className="w-full px-8 py-6 bg-white/5 border border-white/10 rounded-3xl text-white outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
                <i className="far fa-envelope absolute right-8 top-1/2 -translate-y-1/2 text-slate-500"></i>
              </div>
              <button className="w-full py-6 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-3xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all hover:scale-[1.02] active:scale-95">
                Garantir meu Desconto
              </button>
              <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-wider">
                Respeitamos sua privacidade. Saia quando quiser.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
