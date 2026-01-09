'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/context/AudioContext';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const GlobalPlayer = () => {
    const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack, progress, isVisible, duration, seek } = useAudio();
    const progressBarRef = React.useRef<HTMLDivElement>(null);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        const newTime = percentage * duration;
        seek(newTime);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 200, x: "-50%", opacity: 0 }}
                    animate={{ y: 0, x: "-50%", opacity: 1 }}
                    exit={{ y: 200, x: "-50%", opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className="fixed bottom-6 left-1/2 z-50 w-auto max-w-[95vw]"
                >
                    {/* Glow behind (Dynamic Color) */}
                    <div
                        className="absolute inset-0 blur-3xl rounded-full -z-10 transition-colors duration-700"
                        style={{ backgroundColor: `${currentTrack.color}30` }} // 30 = ~20% opacity
                    />

                    {/* The Liquid Glass Capsule */}
                    <div className="relative flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-3 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden w-full min-w-[320px] sm:min-w-[420px]">

                        {/* Progress Bar (Top Line - Dynamic Color) - Interactive Area */}
                        <div
                            ref={progressBarRef}
                            onClick={handleSeek}
                            className="absolute top-0 left-0 right-0 h-[6px] -mt-[2px] w-full cursor-pointer group z-20 group"
                        >
                            {/* Visual Bar background */}
                            <div className="absolute top-[2px] left-0 right-0 h-[2px] bg-white/5 w-full pointer-events-none" />

                            {/* Active Bar */}
                            <motion.div
                                className="h-[2px] mt-[2px] shadow-[0_0_10px_currentColor] relative"
                                style={{
                                    width: `${progress}%`,
                                    backgroundColor: currentTrack.color,
                                    color: currentTrack.color
                                }}
                                layoutId="progress-bar"
                            >
                                {/* Scrubber Head (Visible on Hover) */}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-lg transition-opacity" />
                            </motion.div>
                        </div>

                        {/* Album Art (Spinning) */}
                        <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                            <motion.img
                                src={currentTrack.cover}
                                alt="cover"
                                className="h-full w-full rounded-full object-cover border border-white/20"
                                animate={{ rotate: isPlaying ? 360 : 0 }}
                                transition={{ repeat: Infinity, duration: 8, ease: "linear", repeatType: "loop" }}
                                style={{ rotate: 0 }} // default
                            />
                            {/* Center hole for vinyl look */}
                            <div className="absolute inset-0 m-auto h-2 w-2 bg-black rounded-full border border-neutral-700" />
                        </div>

                        {/* Track Info */}
                        <div className="flex-1 min-w-0 pr-2 flex flex-col justify-center">
                            <div className="flex items-center gap-2">
                                <h4 className="text-white text-xs sm:text-sm font-bold truncate drop-shadow-md max-w-[120px] sm:max-w-none">
                                    {currentTrack.title}
                                </h4>
                                {/* Genre Pill */}
                                <span
                                    className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/5 whitespace-nowrap"
                                >
                                    {currentTrack.genre}
                                </span>
                            </div>

                            <p className="text-white/50 text-[10px] sm:text-xs truncate font-medium tracking-wide">
                                {currentTrack.artist}
                            </p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-3 sm:gap-4 text-white">
                            <button
                                onClick={prevTrack}
                                className="hover:text-white transition-colors active:scale-95 opacity-80 hover:opacity-100"
                            >
                                <SkipBack size={18} sm:size={20} fill="currentColor" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all active:scale-90 backdrop-blur-md group"
                            >
                                {isPlaying ? (
                                    <Pause size={16} sm:size={18} fill="currentColor" className="group-hover:text-white" />
                                ) : (
                                    <Play size={16} sm:size={18} fill="currentColor" className="ml-0.5 group-hover:text-white" />
                                )}
                            </button>

                            <button
                                onClick={nextTrack}
                                className="hover:text-white transition-colors active:scale-95 opacity-80 hover:opacity-100"
                            >
                                <SkipForward size={18} sm:size={20} fill="currentColor" />
                            </button>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalPlayer;
