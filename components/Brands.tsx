
import React from 'react';

const brands = [
  { name: 'Apple', logo: 'fa-apple' },
  { name: 'Microsoft', logo: 'fa-microsoft' },
  { name: 'PlayStation', logo: 'fa-playstation' },
  { name: 'Nvidia', logo: 'fa-microchip' },
  { name: 'Samsung', logo: 'fa-mobile-screen-button' }
];

const Brands: React.FC = () => {
  return (
    <section className="bg-white py-20 border-y border-slate-100 mb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-black uppercase tracking-widest text-xs mb-4">Official Partners</p>
          <h2 className="text-2xl md:text-3xl font-black text-secondary">Trabalhamos com os Melhores</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
          {brands.map((brand, i) => (
            <div key={i} className="flex items-center gap-3 text-2xl md:text-4xl font-black text-slate-800 hover:text-primary transition-colors cursor-pointer group">
              <i className={`fab ${brand.logo} group-hover:scale-110 transition-transform`}></i>
              <span className="hidden md:block tracking-tighter">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
