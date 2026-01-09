import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  enableAnimation?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  delay = 0, 
  enableAnimation = true 
}) => {
  return (
    <motion.div
      initial={enableAnimation ? { opacity: 0, y: 20 } : undefined}
      whileInView={enableAnimation ? { opacity: 1, y: 0 } : undefined}
      viewport={enableAnimation ? { once: true, amount: 0.2 } : undefined}
      transition={enableAnimation ? { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] } : undefined}
      className={`relative group overflow-hidden transition-all duration-500
        bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/30 hover:bg-white/[0.05]
        shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] will-change-transform
        ${className.includes('p-') ? className : `p-8 ${className}`}`}
    >
      {/* Refractive Sheen - z-10 */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-white/[0.05] to-transparent z-10" />
      
      {children}
    </motion.div>
  );
};