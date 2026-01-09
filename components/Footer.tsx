
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-black text-secondary tracking-tighter mb-6">
              Tech<span className="text-primary italic">Sphere</span>
            </h2>
            <p className="text-gray text-sm leading-relaxed mb-8 pr-4">
              Líder global em hardware e dispositivos de alta performance. Elevando o padrão tecnológico da sua vida pessoal e profissional.
            </p>
            <div className="flex gap-4">
              {['fa-facebook-f', 'fa-instagram', 'fa-twitter', 'fa-linkedin-in'].map((social, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                  <i className={`fab ${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-secondary mb-8">Navegação</h4>
            <ul className="space-y-4">
              {['Notebooks', 'Smartphones', 'Setup Gamer', 'Áudio & Vídeo', 'Componentes'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray text-sm font-bold hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-primary transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-secondary mb-8">Institucional</h4>
            <ul className="space-y-4">
              {['Sobre a TechSphere', 'Trabalhe Conosco', 'Política de Privacidade', 'Termos de Uso', 'Compliance'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray text-sm font-bold hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-secondary mb-8">Central de Atendimento</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                  <i className="fas fa-phone-volume"></i>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">Televendas</p>
                  <p className="font-black text-secondary">0800 555 1234</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <i className="far fa-envelope"></i>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">E-mail Corporativo</p>
                  <p className="font-black text-secondary">sac@techsphere.com.br</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-50 pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap justify-center gap-8 items-center grayscale opacity-60">
            <i className="fab fa-cc-visa text-3xl"></i>
            <i className="fab fa-cc-mastercard text-3xl"></i>
            <i className="fab fa-cc-apple-pay text-3xl"></i>
            <i className="fab fa-cc-paypal text-3xl"></i>
            <i className="fas fa-barcode text-2xl"></i>
          </div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-center md:text-right">
            © 2024 TechSphere Global. Todos os direitos reservados. CNPJ 12.345.678/0001-90
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
