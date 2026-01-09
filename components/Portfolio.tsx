import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../constants';
import { GlassCard } from './GlassCard';
import { Play } from 'lucide-react';

export const Portfolio: React.FC = () => {
  return (
    <section className="py-32 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-4xl md:text-5xl text-white/90"
        >
          {CONTENT.portfolio.title}
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden md:block w-32 h-[1px] bg-white/20" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex overflow-x-auto gap-8 px-6 pb-12 snap-x snap-mandatory scrollbar-hide"
      >
        {CONTENT.portfolio.items.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 snap-center w-[300px] md:w-[400px]"
          >
            <GlassCard 
              enableAnimation={false}
              className="h-[400px] flex flex-col justify-end group cursor-pointer hover:scale-[1.02] transition-transform duration-500 relative !p-0"
            >
              
              {/* Abstract Cover Art - Z-0 */}
              <div className="absolute inset-0 z-0 bg-neutral-900 group-hover:bg-neutral-800 transition-colors duration-700">
                 <img 
                    src={`https://picsum.photos/400/400?random=${item.id}`} 
                    alt={item.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 mix-blend-overlay grayscale group-hover:grayscale-0"
                 />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-0" />

              {/* Content - Z-20 */}
              <div className="relative z-20 p-8 h-full flex flex-col justify-end">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-sans tracking-widest text-indigo-300 uppercase">{item.role}</span>
                  <span className="text-xs font-sans text-white/40">{item.year}</span>
                </div>
                <h3 className="font-serif text-3xl text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">{item.title}</h3>
                
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <Play size={12} className="text-black ml-0.5" />
                  </div>
                  <span className="text-sm font-medium">Ascolta Preview</span>
                </div>
              </div>
            </GlassCard>
          </div>
        ))}
        <div className="w-6 flex-shrink-0" />
      </motion.div>
    </section>
  );
};