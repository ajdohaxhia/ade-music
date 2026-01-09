import React from 'react';

export const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob will-change-transform" />
      <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-indigo-900/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000 will-change-transform" />
      <div className="absolute -bottom-32 left-20 w-[70vw] h-[70vw] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000 will-change-transform" />
      <div className="absolute inset-0 bg-void/60 backdrop-blur-[1px]" />
    </div>
  );
};