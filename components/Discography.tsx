'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TRACKS } from '@/lib/data';
import { useAudio } from '@/context/AudioContext';
import { Play, Pause, Music } from 'lucide-react';

const Discography = () => {
    const { playTrack, currentTrack, isPlaying, togglePlay } = useAudio();

    return (
        <section className="w-full py-20 px-4 md:px-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight text-center drop-shadow-2xl">
                paranoia - EP Preview
            </h2>

            {/* EP Cover */}
            <div className="flex justify-center mb-12">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <img
                        src="/covers/cover1.jpg"
                        alt="paranoia EP Cover"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {TRACKS.map((track, index) => {
                    const isActive = currentTrack?.id === track.id;
                    const isPlayingCurrent = isActive && isPlaying;

                    return (
                        <motion.div
                            key={track.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative overflow-hidden rounded-3xl bg-neutral-900/40 backdrop-blur-xl border transition-all duration-300 ${isActive
                                ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20'
                                : 'border-white/5 hover:border-white/10 hover:bg-neutral-900/60'
                                }`}
                        >
                            {/* Colorful Glow Background based on Track Vibe */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                                style={{ background: `radial-gradient(circle at center, ${track.color}, transparent 70%)` }}
                            />

                            <div className="p-6 flex flex-col items-center">
                                {/* Cover Art */}
                                <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                    {track.cover ? (
                                        <img
                                            src={track.cover}
                                            alt={track.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-black"
                                            style={{ background: `linear-gradient(135deg, ${track.color}20, #000)` }}
                                        >
                                            <Music size={40} className="text-white/20" />
                                        </div>
                                    )}

                                    {/* Overlay Play Button */}
                                    <button
                                        onClick={() => isActive ? togglePlay() : playTrack(index)}
                                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                            {isPlayingCurrent ? (
                                                <Pause size={32} fill="white" className="text-white" />
                                            ) : (
                                                <Play size={32} fill="white" className="text-white ml-2" />
                                            )}
                                        </div>
                                    </button>
                                </div>

                                {/* Info */}
                                <div className="text-center w-full">
                                    <h3 className={`text-xl font-bold mb-1 truncate ${isActive ? 'text-cyan-400' : 'text-white'}`}>
                                        {track.title}
                                    </h3>
                                    <p className="text-white/50 text-sm font-medium tracking-wide mb-3">
                                        {track.artist}
                                    </p>

                                    <div className="flex items-center justify-center gap-3">
                                        <span
                                            className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border bg-white/5"
                                            style={{ borderColor: track.color, color: track.color }}
                                        >
                                            {track.genre}
                                        </span>
                                        <span className="text-xs text-white/30">
                                            {track.duration}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Active Indicator Line */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-glow"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600"
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Discography;
