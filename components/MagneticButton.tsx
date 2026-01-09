import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  secondary?: boolean;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, secondary, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: x * 0.5, y: y * 0.5 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <button
        onClick={onClick}
        className={`
          relative px-8 py-4 rounded-full text-sm tracking-widest font-sans uppercase font-medium transition-all duration-300
          ${secondary 
            ? 'border border-white/20 hover:border-white/60 text-white/80 hover:text-white' 
            : 'bg-white text-black hover:bg-gray-200'
          }
        `}
      >
        {children}
      </button>
    </motion.div>
  );
};