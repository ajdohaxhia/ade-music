import React from 'react';
import { CONTENT } from '../constants';
import { GlassCard } from './GlassCard';

export const About: React.FC = () => {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <GlassCard className="p-12 md:p-20">
          <h2 className="font-serif text-sm tracking-[0.4em] uppercase text-white/40 mb-8">
            {CONTENT.about.title}
          </h2>
          <p className="font-serif text-3xl md:text-5xl leading-tight text-white/90 mb-8">
            "{CONTENT.about.bio}"
          </p>
          <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full" />
        </GlassCard>
      </div>
    </section>
  );
};