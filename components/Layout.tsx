import React, { ReactNode } from 'react';
import { FluidBackground } from './FluidBackground';

import { AudioProvider } from '../context/AudioContext';
import GlobalPlayer from './GlobalPlayer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AudioProvider>
      <div className="relative min-h-screen bg-void text-white selection:bg-indigo-500/30 selection:text-white">
        <FluidBackground />

        {/* Noise Texture Overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px'
          }}
        />

        <main className="relative z-10">
          {children}
        </main>

        <GlobalPlayer />
      </div>
    </AudioProvider>
  );
};