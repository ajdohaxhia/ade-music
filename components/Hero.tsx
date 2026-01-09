import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../constants';
import { MagneticButton } from './MagneticButton';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20">
      <div className="max-w-7xl mx-auto w-full text-center z-10">
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-white/60 mb-8"
        >
          {CONTENT.hero.subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-12 will-change-transform"
        >
          {CONTENT.hero.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <MagneticButton>{CONTENT.hero.ctaPrimary}</MagneticButton>
          <MagneticButton secondary>{CONTENT.hero.ctaSecondary}</MagneticButton>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
};