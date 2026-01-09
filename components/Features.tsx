
import React from 'react';

const features = [
  {
    icon: 'fa-truck-fast',
    title: 'Entrega Expressa',
    desc: 'Logística inteligente para todo o Brasil com rastreamento real.'
  },
  {
    icon: 'fa-shield-halved',
    title: 'Compra Segura',
    desc: 'Seus dados protegidos por criptografia de ponta a ponta.'
  },
  {
    icon: 'fa-headset',
    title: 'Suporte VIP',
    desc: 'Consultores técnicos disponíveis 24/7 para seu setup.'
  },
  {
    icon: 'fa-rotate-left',
    title: 'Garantia Elite',
    desc: 'Troca facilitada e garantia direta com a TechSphere.'
  }
];

const Features: React.FC = () => {
  return (
    <section className="container mx-auto px-4 mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
              <i className={`fas ${item.icon} text-xl text-primary group-hover:text-white`}></i>
            </div>
            <h3 className="font-bold text-lg mb-2 text-secondary">{item.title}</h3>
            <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
