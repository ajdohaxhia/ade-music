'use client';

import { useAudio } from '@/context/AudioContext';
import { TRACKS } from '@/lib/data';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Discography() {
    const { playTrack, currentTrack, isPlaying } = useAudio();

    return (
        <section id="discography" className="py-20 px-6 bg-black text-white">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-10 tracking-tighter text-center">DISCOGRAPHY</h2>

                <div className="space-y-4">
                    {TRACKS.map((track) => {
                        const isCurrent = currentTrack?.id === track.id;
                        const isTrackPlaying = isCurrent && isPlaying;

                        return (
                            <motion.div
                                key={track.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group relative flex items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/10"
                            >
                                <div className="relative w-16 h-16 rounded-md overflow-hidden mr-6 flex-shrink-0">
                                    {/* Use Next.js Image in production, standard img for now to match verified assets without extra config */}
                                    <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => playTrack(track)}
                                        className="absolute inset-0 grid place-items-center bg-black/40 group-hover:bg-black/20 transition-all"
                                    >
                                        {isTrackPlaying ? (
                                            <Pause className="w-6 h-6 text-white" fill="currentColor" />
                                        ) : (
                                            <Play className="w-6 h-6 text-white" fill="currentColor" />
                                        )}
                                    </button>
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-xl font-medium tracking-wide">{track.title}</h3>
                                    <p className="text-white/60 text-sm">{track.artist}</p>
                                </div>

                                <div className="hidden md:block text-right">
                                    <span className="text-xs text-white/40 uppercase tracking-widest">{track.genre}</span>
                                    <p className="text-sm font-mono text-white/50">{track.duration}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
