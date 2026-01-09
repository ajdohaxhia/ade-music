import React from 'react';
import { CONTENT } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 py-12 border-t border-white/5 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="font-serif text-xl tracking-wide">ADE MUSIC</span>
        
        <div className="flex gap-8">
          {CONTENT.footer.links.map((link) => (
            <a 
              key={link} 
              href="#" 
              className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest font-sans text-xs"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
      <div className="text-center mt-12 text-[10px] text-white/20 font-sans">
        © 2026 ADE MUSIC. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};