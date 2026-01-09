import React from 'react';
import { CONTENT } from '../constants';
import { GlassCard } from './GlassCard';
import { Disc, Mic2, Sliders } from 'lucide-react';

const icons = [Mic2, Disc, Sliders];

export const Services: React.FC = () => {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-white/90 mb-16 text-center">
          {CONTENT.services.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONTENT.services.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <GlassCard key={item.id} delay={index * 0.1} className="min-h-[300px] flex flex-col justify-between group">
                <div>
                  <div className="mb-6 p-3 rounded-full bg-white/5 w-fit border border-white/5 group-hover:bg-white/10 transition-colors">
                    <Icon size={24} className="text-white/80" />
                  </div>
                  <h3 className="font-serif text-2xl mb-4 text-white group-hover:text-indigo-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-sans text-white/50 leading-relaxed text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent mt-8 group-hover:from-indigo-500/50 transition-all duration-500" />
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};