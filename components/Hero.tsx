
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary py-20 lg:py-32 text-white mb-16">
      <div className="container mx-auto px-4 relative flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 max-w-2xl text-center lg:text-left z-10">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Tecnologia de Ponta <br className="hidden lg:block" /> para o Seu Estilo
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto lg:mx-0">
            Descubra os melhores produtos tecnológicos com os preços mais competitivos do mercado. Frete grátis, garantia estendida e suporte especializado.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="px-8 py-4 bg-accent hover:bg-cyan-600 text-white font-bold rounded-xl transition-all hover:-translate-y-1 shadow-lg flex items-center gap-2">
              <i className="fas fa-shopping-bag"></i> Comprar Agora
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-primary font-bold rounded-xl transition-all">
              <i className="fas fa-play-circle mr-2"></i> Ver Demonstração
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative z-10">
          <div className="animate-[bounce_3s_ease-in-out_infinite]">
            <img 
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1170&q=80" 
              alt="Tech Hero" 
              className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto border-4 border-white/10"
            />
          </div>
          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/30 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 Q50,50 100,0 V100 H0 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
